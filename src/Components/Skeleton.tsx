'use client';

const Skeleton: React.FC = () => {
  return (
    <div className={'relative h-full w-full border border-red-400'}>
      <div
        className={`absolute h-full w-[200%] animate-skeletonSwipe
          bg-gradient-to-r from-skelPri via-skelSec to-skelPri dark:from-skelPriD dark:via-skelSecD dark:to-skelPriD`}
      />
    </div>
  );
};

export default Skeleton;
