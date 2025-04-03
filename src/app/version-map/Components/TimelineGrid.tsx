'use client';

import { type VersionHistoryData, type Months } from '@/misc/types';
import { calcPercentOf } from '@/misc/helpers';

interface Props {
  months: Months;
  versionHistoryData?: VersionHistoryData;
}

const TimelineGrid: React.FC<Props> = ({ months, versionHistoryData }) => {
  const timelineColor = 'lightgreen';

  return (
    <div className={'flex bg-blue-50'} style={{ height: 50 }}>
      {months.map((month) => {
        return (
          <div className={'border-l border-b border-borPri h-full w-gridW'} key={month.yearMonth}>
            {versionHistoryData?.[month.yearMonth] && versionHistoryData[month.yearMonth].map((month) => <p>{month.version}</p>)}
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