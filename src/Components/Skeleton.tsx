'use client';

const Skeleton: React.FC = () => {
  return (
    <div className={'relative h-full w-full border border-red-400'}>
      <div
        className={`absolute h-full w-[200%] animate-skeletonSwipe
          bg-gradient-to-r from-skel via-white to-skel dark:from-skelD dark:via-black dark:to-skelD`}
      />
    </div>
  );
};

export default Skeleton;
