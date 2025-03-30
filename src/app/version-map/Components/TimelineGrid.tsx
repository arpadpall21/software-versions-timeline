'use client';

import { type VersionHistoryData } from '@/misc/types';

interface Props {
  versionHistoryData?: VersionHistoryData;
}

const TimelineGrid: React.FC<Props> = ({ versionHistoryData }) => {
  return (
    <div className={'relative h-[75px] flex bg-blue-50'}>
      <div className={'absolute bg-green-700 w-full h-2 bottom-[15px]'}> </div>
      {versionHistoryData &&
        versionHistoryData.map((days) => (
          <div className={'border-l border-b border-borPri h-full w-[150px]'} key={days[0].date.substring(0, 7)}>
            {/* {days.map((day) => (
              <span key={day.version}>{day.version}</span>
            ))} */}
          </div>
        ))}
    </div>
  );
};

export default TimelineGrid;
