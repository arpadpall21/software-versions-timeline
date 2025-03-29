import { type VersionHistoryData } from '@/misc/types';
const nrOfMonths = 150;

interface Props {
  versionHistoryData?: VersionHistoryData;
}

const TimelineGrid: React.FC<Props> = () => {
  return (
    <div className={'h-[75px] flex bg-blue-50'}>
      {Array.from({ length: nrOfMonths }, (_, i) => (
        <div key={i} className={'border-l border-b border-borPri h-full w-[30px]'}></div>
      ))}
    </div>
  );
};

export default TimelineGrid;
