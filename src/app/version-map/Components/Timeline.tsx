'use client';

import { useMemo, useContext } from 'react';
import { calcPercentOf } from '@/misc/helpers';
import TextBallon from '@/Components/TextBalloon';
import { useTranslations } from 'next-intl';
import appConfig from '../../../../config/appConfig';
import Skeleton from '@/Components/Skeleton';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import { Software } from '../../../../config/supportedSoftwares';
import tailwindConfig from '../../../../tailwind.config';

const defaultZoomLevel: number = appConfig.zoom.defaultLevel;
const height: number = 100;
const originalGridCellWidth: number = Number.parseInt(tailwindConfig.theme.extend.spacing.gridCellW);

interface Props {
  zoomLevel: number;
  software: Software;
  twTimelineStyle: string;
}

const Timeline: React.FC<Props> = ({ zoomLevel, software, twTimelineStyle }) => {
  const { feCache, fetchLoading, displayedMonths } = useContext(GridContainerContext);
  const t = useTranslations('components.monthsGrid.months');

  const scaleTextBallon: number = useMemo(() => calcPercentOf(defaultZoomLevel, zoomLevel) / 100, [zoomLevel]);
  const timelineHeight: number = useMemo(() => Math.round(Math.max(1, Math.min(8, 8 / zoomLevel))), [zoomLevel]);

  if (fetchLoading) {
    return (
      <div className={'flex w-screen'} style={{ height }}>
        <Skeleton />
      </div>
    );
  }
  if (feCache[software] === null) {
    console.error(`Failed to get version history data for software: ${software}`);
    return <div className={'bg-bgLoadErr dark:bg-bgLoadErrD'} style={{ height }} />;
  }

  return (
    <div className={'flex bg-gridBg dark:bg-gridBgD'} style={{ height }}>
      {displayedMonths.map((month) => {
        return (
          <div
            className={'relative h-full w-gridCellW border-gridBor dark:border-gridBorD'}
            style={{ borderLeftWidth: month.monthName === 'jan' ? 3 : 1 }}
            key={month.yearMonth}
          >
            {Array.isArray(feCache[software]?.data?.[month.yearMonth]?.versions) &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              feCache[software].data[month.yearMonth].versions.map(({ day, version }) => (
                <div
                  className={'absolute z-10 hover:z-50'}
                  style={{
                    left: originalGridCellWidth * (calcPercentOf(day, 31) / 100) - 1,
                    bottom: 32 - (100 - height),
                  }}
                  key={day}
                >
                  <div className={'smoothTransform'} style={{ transform: `scale(${scaleTextBallon})` }}>
                    <TextBallon
                      text={version}
                      textsSecondary={[`(${month.yearMonth.slice(0, 4)}.${t(month.monthName)}.${day})`]}
                      twStyle={twTimelineStyle}
                    />
                  </div>
                </div>
              ))}
            {feCache[software]?.data[month.yearMonth]?.timeline && (
              <div
                className={`absolute top-[68px] ${twTimelineStyle}`}
                style={{
                  width: originalGridCellWidth * (feCache[software].data[month.yearMonth].timeline.percent / 100),
                  height: timelineHeight,
                  left: feCache[software].data[month.yearMonth].timeline.from === 'left' ? '-1px' : undefined,
                  right: feCache[software].data[month.yearMonth].timeline.from === 'right' ? '-1px' : undefined,
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
