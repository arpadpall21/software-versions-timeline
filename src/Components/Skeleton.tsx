'use client';

const Skeleton: React.FC = () => {
  return (
    <div className={'h-full w-full'}>
      <div
        className={
          'h-full w-[200%] bg-gradient-to-r from-skel via-white to-skel dark:from-skelD dark:via-black dark:to-skelD'
        }
      />
    </div>
  );
};

export default Skeleton;
