'use client';

import { useState, useEffect, useMemo, useContext } from 'react';
import { cloneDeep } from 'lodash';
import { type VersionHistoryResponse, type Month, Software } from '@/misc/types';
import { calcPercentOf, calcMonthTimeline } from '@/misc/helpers';
import TextBallon from '@/Components/TextBalloon';
import { useTranslations } from 'next-intl';
import appConfig from '../../../../config/appConfig';
import { getVersionHistory } from '@/app/version-map/action';
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
  const [versionHistory, setVersionHistory] = useState<VersionHistoryResponse>();
  const [versionHistoryError, setVersionHistoryError] = useState<boolean>(false);
  const { feCache, setFeCache } = useContext(FeCacheContext);

  const t = useTranslations('components.monthsGrid.months');

  useEffect(() => {
    if (feCache[software]) {
      // setVersionHistory(feCache[software]);
    } else {
      // setVersionHistory(undefined);

      getVersionHistory(software)
        .then((historyData) => {
          // feCache[software] = historyData;
          // setFeCache(feCache);
          setVersionHistory(historyData);
        })
        .catch((err) => {
          console.error(err);
          setVersionHistoryError(true);
        });
    }
  }, [displayedMonths, software, feCache, setFeCache]);

  useEffect(() => setVersionHistoryError(false), [software]);

  const scaleTextBallon: number = useMemo(() => calcPercentOf(defaultZoomLevel, zoomLevel) / 100, [zoomLevel]);
  const timelineHeight: number = useMemo(() => Math.round(Math.max(1, Math.min(8, 8 / zoomLevel))), [zoomLevel]);

  if (versionHistoryError) {
    return <div className={'flex h-[100px] bg-red-100 dark:bg-red-950'} />;
  }
  if (!versionHistory) {
    return (
      <div className={'h-[100px]'}>
        <Skeleton />
      </div>
    );
  }

  if (software === 'NODE') {
    console.log(versionHistory)
    console.log(displayedMonths);
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
            {Array.isArray(versionHistory.data[month.yearMonth]?.versions) &&
              versionHistory.data[month.yearMonth].versions.map(({ day, version }) => (
                <div
                  className={'absolute bottom-[32px] z-10 hover:z-50'}
                  style={{ left: calcPercentOf(day, 31) - 1 }}
                  key={version}
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
            {versionHistory.data[month.yearMonth]?.timeline && (
              <div
                className={`absolute top-[68px] ${twTimelineStyle}`}
                style={{
                  width: versionHistory.data[month.yearMonth].timeline.percent,
                  height: timelineHeight,
                  left: versionHistory.data[month.yearMonth].timeline.from === 'left' ? '-1px' : undefined,
                  right: versionHistory.data[month.yearMonth].timeline.from === 'right' ? '-1px' : undefined,
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
