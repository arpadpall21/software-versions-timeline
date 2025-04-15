'use client';

import { useState, useEffect, useMemo } from 'react';
import { type VersionHistoryData, type Month, Software } from '@/misc/types';
import { calcPercentOf, calcMonthTimeline } from '@/misc/helpers';
import TextBallon from './TextBalloon';
import { useTranslations } from 'next-intl';
import appConfig from '../../../../config/appConfig';
import { getVersionHistory } from '@/app/version-map/action';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  months: Month[];
  software: Software;
  twTimelineStyle: string;
}

const TimelineGrid: React.FC<Props> = ({ zoomLevel, months, software, twTimelineStyle }) => {
  const [versionHistoryData, setVersionHistoryData] = useState<VersionHistoryData>();

  const t = useTranslations('components.monthsGrid.months');

  useEffect(() => {
    getVersionHistory(software).then((data) => setVersionHistoryData(data));
  }, [software]);

  const monthsWithTimeline: Month[] = useMemo(() => {
    if (versionHistoryData) {
      return calcMonthTimeline(months, versionHistoryData);
    }

    return months;
  }, [months, versionHistoryData]);

  const scaleTextBallon: number = useMemo(() => calcPercentOf(defaultZoomLevel, zoomLevel) / 100, [zoomLevel]);
  const timelineHeight: number = useMemo(() => Math.round(Math.max(1, Math.min(8, 8 / zoomLevel))), [zoomLevel]);

  return (
    <div className={'flex h-[100px] bg-gridBg dark:bg-gridBgD'}>
      {monthsWithTimeline.map((month) => {
        return (
          <div
            className={'relative h-full w-gridCellW border-gridBor dark:border-gridBorD'}
            style={{ borderLeftWidth: month.monthName === 'jan' ? 3 : 1 }}
            key={month.yearMonth}
          >
            {Array.isArray(versionHistoryData?.[month.yearMonth]) &&
              versionHistoryData[month.yearMonth].map((monthData) => (
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
