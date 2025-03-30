'use client';

import { type VersionHistoryData } from '@/misc/types';

interface Props {
  versionHistoryData?: VersionHistoryData;
}

const TimelineGrid: React.FC<Props> = ({ versionHistoryData }) => {
  return (
    <div className={'h-[75px] flex bg-blue-50'}>
      {versionHistoryData &&
        versionHistoryData.map((days) => (
          <div key={days[0].date.substring(0, 7)} className={'border-l border-b border-borPri h-full w-[150px]'}>
            {days.map((day) => (
              <span key={day.version}>{day.version}</span>
            ))}
          </div>
        ))}
    </div>
  );
};

export default TimelineGrid;
