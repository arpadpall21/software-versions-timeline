'use client';

import { useMemo, useContext } from 'react';
import { type Month, Software } from '@/misc/types';
import { calcPercentOf } from '@/misc/helpers';
import TextBallon from '@/Components/TextBalloon';
import { useTranslations } from 'next-intl';
import appConfig from '../../../../config/appConfig';
import Skeleton from '@/Components/Skeleton';
import { FeCacheContext } from '@/app/version-map/Components/GridContainer';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  displayedMonths: Month[];
  software: Software;
  twTimelineStyle: string;
}

const Timeline: React.FC<Props> = ({ zoomLevel, displayedMonths, software, twTimelineStyle }) => {
  const { feCache, fetchLoading } = useContext(FeCacheContext);

  const t = useTranslations('components.monthsGrid.months');

  const scaleTextBallon: number = useMemo(() => calcPercentOf(defaultZoomLevel, zoomLevel) / 100, [zoomLevel]);
  const timelineHeight: number = useMemo(() => Math.round(Math.max(1, Math.min(8, 8 / zoomLevel))), [zoomLevel]);

  if (fetchLoading) {
    return (
      <div className={'flex flex-row-reverse h-[100px] w-screen'}>
        <Skeleton />
      </div>
    );
  }
  if (feCache[software] === null) {
    console.error(`Failed to get version history data for software: ${software}`);
    return <div className={'h-[100px] bg-bgLoadErr dark:bg-bgLoadErrD'} />;
  }

  return (
    <div className={'flex h-[100px] bg-gridBg dark:bg-gridBgD'}>
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
                  className={'absolute bottom-[32px] z-10 hover:z-50'}
                  style={{ left: calcPercentOf(day, 31) - 1 }}
                  key={day}
                >
                  <div className={'smoothTransform'} style={{ transform: `scale(${scaleTextBallon})` }}>
                    <TextBallon
                      text={version}
                      textsSecondary={[`(${month.yearMonth.slice(0, 4)}.${t(month.monthName)}.${day})`]}
                      twStyle={twTimelineStyle}
                      link={appConfig.supportedSoftwares[software].source}
                    />
                  </div>
                </div>
              ))}
            {feCache[software]?.data[month.yearMonth]?.timeline && (
              <div
                className={`absolute top-[68px] ${twTimelineStyle}`}
                style={{
                  width: feCache[software].data[month.yearMonth].timeline.percent,
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
