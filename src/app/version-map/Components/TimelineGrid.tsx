'use client';

import { type VersionHistoryData } from '@/misc/types';
import { calcPercentOf } from '@/misc/helpers';

interface Props {
  versionHistoryData?: VersionHistoryData;
}

const TimelineGrid: React.FC<Props> = ({ versionHistoryData }) => {
  const timelineColor = 'lightgreen';

  return (
    <div className={'h-[75px] flex bg-blue-50'}>
      {versionHistoryData &&
        versionHistoryData.map((days) => (
          <div
            className={'relative border-l border-b border-borPri h-full w-[150px]'}
            key={days[0].date.substring(0, 7)}
          >
            <div
              className={`absolute h-2 bottom-[15px] left-[-1px] w-[101%]`}
              style={{ backgroundColor: timelineColor }}
            ></div>
            {days.map((day) => (
              <span
                className={'absolute bottom-[15px]'}
                style={{ backgroundColor: timelineColor, left: `${calcPercentOf(16 - 4, 31)}%` }}
                key={day.version}
              >
                {day.version}
              </span>
            ))}
          </div>
        ))}
    </div>
  );
};

export default TimelineGrid;
