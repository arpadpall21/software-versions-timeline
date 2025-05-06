'use client';

import { useState, useEffect, useMemo, useContext } from 'react';
import { cloneDeep } from 'lodash';
import { type VersionHistoryData, type Month, Software } from '@/misc/types';
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
  const [versionHistory, setVersionHistory] = useState<VersionHistoryData>();
  const [versionHistoryError, setVersionHistoryError] = useState<boolean>(false);
  const [monthsWithTimeline, setMonthsWithTimeline] = useState<Month[]>([]);
  const { feCache, setFeCache } = useContext(FeCacheContext);

  const t = useTranslations('components.monthsGrid.months');

  useEffect(() => {
    if (feCache[software]) {
      setVersionHistory(feCache[software]);
      setMonthsWithTimeline(calcMonthTimeline(cloneDeep(displayedMonths), feCache[software]));
    } else {
      setVersionHistory(undefined);
      setMonthsWithTimeline([]);

      getVersionHistory(software)
        .then((historyData) => {
          console.log(historyData);
        
          feCache[software] = historyData;
          setFeCache(feCache);
          setVersionHistory(historyData);
          setMonthsWithTimeline(calcMonthTimeline(cloneDeep(displayedMonths), historyData));
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
  if (!versionHistory || monthsWithTimeline.length === 0) {
    return (
      <div className={'h-[100px]'}>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className={'flex h-[100px] bg-gridBg dark:bg-gridBgD'}>
      {monthsWithTimeline.map((month) => {
        return (
          <div
            className={'relative h-full w-gridCellW border-gridBor dark:border-gridBorD'}
            style={{ borderLeftWidth: month.monthName === 'jan' ? 3 : 1 }}
            key={month.yearMonth}
          >
            {Array.isArray(versionHistory?.[month.yearMonth]) &&
              versionHistory[month.yearMonth].map((monthData) => (
                <div
                  className={'absolute bottom-[32px] z-10 hover:z-50'}
                  style={{ left: calcPercentOf(monthData.day, 31) - 1 }}
                  key={monthData.version}
                >
                  <div className={'smoothTransform'} style={{ transform: `scale(${scaleTextBallon})` }}>
                    <TextBallon
                      text={monthData.version}
                      textsSecondary={[`(${month.yearMonth.slice(0, 4)}.${t(month.monthName)}.${monthData.day})`]}
                      twStyle={twTimelineStyle}
                      link={appConfig.supportedSoftwares[software].source}
                    />
                  </div>
                </div>
              ))}
            {month.timeline && (
              <div
                className={`absolute top-[68px] ${twTimelineStyle}`}
                style={{
                  width: month.timeline.percent,
                  height: timelineHeight,
                  left: month.timeline.from === 'left' ? '-1px' : undefined,
                  right: month.timeline.from === 'right' ? '-1px' : undefined,
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
