'use client';

import { useState, useEffect, useMemo } from 'react';
import { cloneDeep } from 'lodash';
import { type VersionHistoryData, type Month, type LocalCache, Software } from '@/misc/types';
import { calcPercentOf, calcMonthTimeline } from '@/misc/helpers';
import TextBallon from './TextBalloon';
import { useTranslations } from 'next-intl';
import appConfig from '../../../../config/appConfig';
import { getVersionHistory } from '@/app/version-map/action';
import Skeleton from '@/Components/Skeleton';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  months: Month[];
  software: Software;
  cache: LocalCache;
  twTimelineStyle: string;
}

const TimelineGrid: React.FC<Props> = ({ zoomLevel, months, software, cache, twTimelineStyle }) => {
  const [versionHistory, setVersionHistory] = useState<VersionHistoryData>();
  const [versionHistoryError, setVersionHistoryError] = useState<boolean>(false);
  const [monthsWithTimeline, setMonthsWithTimeline] = useState<Month[]>([]);

  const t = useTranslations('components.monthsGrid.months');

  useEffect(() => {
    if (cache[software]) {
      setVersionHistory(cache[software]);
      setMonthsWithTimeline(calcMonthTimeline(cloneDeep(months), cache[software]));
    } else {
      getVersionHistory(software)
        .then((historyData) => {
          cache[software] = historyData;
          setVersionHistory(historyData);
          setMonthsWithTimeline(calcMonthTimeline(cloneDeep(months), historyData));
        })
        .catch((err) => {
          console.error(err);
          setVersionHistoryError(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months, software]);

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

export default TimelineGrid;
