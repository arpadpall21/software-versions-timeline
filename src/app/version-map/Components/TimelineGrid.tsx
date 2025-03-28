const nrOfMonths = 150;

const TimelineGrid: React.FC = () => {
  return (
    <div className={'h-[75px] flex bg-blue-50'}>
      {Array.from({ length: nrOfMonths }, (_, i) => (
        <div key={i} className={'border-l border-b border-borPri h-full w-[30px]'}></div>
      ))}
    </div>
  );
};

export default TimelineGrid;
