'use client';

import { useMemo } from 'react';
import { type VersionHistoryData, type Month } from '@/misc/types';
import { calcPercentOf, calcMonthTimeline } from '@/misc/helpers';
import TextBallon from './TextBalloon';

interface Props {
  months: Month[];
  versionHistoryData?: VersionHistoryData;
}

const TimelineGrid: React.FC<Props> = ({ months, versionHistoryData }) => {
  const timelineColor = 'lightgreen';

  const monthsWithTimeline = useMemo(() => {
    if (versionHistoryData) {
      return calcMonthTimeline(months, versionHistoryData);
    }

    return months;
  }, [months, versionHistoryData]);

  return (
    <div className={'flex h-[100px] bg-gridBg dark:bg-gridBgD'}>
      {monthsWithTimeline.map((month) => {
        return (
          <div className={'relative border-l border-borPri h-full w-gridCellW'} key={month.yearMonth}>
            {Array.isArray(versionHistoryData?.[month.yearMonth]) &&
              versionHistoryData[month.yearMonth].map((month) => (
                <TextBallon text={month.version} backgroundColor={timelineColor} key={month.version} />
              ))}
            {month.timeline && (
              <div
                className={'absolute bottom-6 h-2'}
                style={{
                  backgroundColor: timelineColor,
                  width: month.timeline.percent,
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




/*
      {versionHistoryData &&
        versionHistoryData.map((month, i) => (
          <div
            className={'relative border-l border-b border-borPri h-full w-[150px]'}
            key={month[0].date.substring(0, 7)}
          >
            <div
              className={'absolute h-2 bottom-[15px] l-[-1px]'}
              style={{
                backgroundColor: timelineColor,
                width: versionHistoryData.length === i + 1 ? `${calcPercentOf(10, 31)}%` : '101%',
              }}
            ></div>
            {month.map((day) => (
              <span
                className={'absolute bottom-[25px]'}
                style={{ backgroundColor: timelineColor, left: `${calcPercentOf(10 - 4, 31)}%` }}
                key={day.version}
              >
                {day.version}
              </span>
            ))}
          </div>
        ))}
*/