'use client';

import { useState, useEffect } from 'react';
import { type VersionHistoryData } from '@/misc/types';
import { calcPercentOf, calcMonthsUpToCurrent } from '@/misc/helpers';

interface Props {
  startYear: number;
  startMonth?: number;
  versionHistoryData?: VersionHistoryData;
}

const TimelineGrid: React.FC<Props> = ({ startYear, startMonth = 1, versionHistoryData }) => {
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    console.log( calcMonthsUpToCurrent(startYear, startMonth) );
  },[]);


  const timelineColor = 'lightgreen';

  return (
    <div className={'flex bg-blue-50'} style={{ height: 50 }}>
      
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