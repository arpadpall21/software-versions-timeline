'use client';

import { useState, useRef, useMemo, type RefObject } from 'react';

interface Props {
  height: number;
  members: React.ReactNode[];
  scrollLeftButton: React.ReactNode;
  scrollRightButton: React.ReactNode;
  scrollSensitivity?: number;
  start?: 'left' | 'right';
}

const HorizontalScroll: React.FC<Props> = ({
  height,
  members,
  scrollLeftButton,
  scrollRightButton,
  scrollSensitivity = 100,
  start = 'left',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(0);

  const sliderRef: RefObject<null | HTMLDivElement> = useRef(null);
  const sliderChildRef: RefObject<null | HTMLDivElement> = useRef(null);

  const renderedMembers: React.ReactNode[] = useMemo(() => {
    return start === 'left' ? members : [...members].reverse();
  }, [members, start]);

  function handleScroll(direction: 'left' | 'right') {
    if (sliderRef.current && sliderChildRef.current) {
      const maxScrollableDistance: number = sliderChildRef.current.offsetWidth - sliderRef.current.offsetWidth;
      let scrollBy: number = 0;

      if (start === 'left') {
        scrollBy =
          direction === 'left'
            ? Math.max(0, sliderPosition - scrollSensitivity)
            : Math.min(maxScrollableDistance, sliderPosition + scrollSensitivity);
      } else {
        scrollBy =
          direction === 'left'
            ? Math.max(-maxScrollableDistance, sliderPosition - scrollSensitivity)
            : Math.min(0, sliderPosition + scrollSensitivity);
      }

      sliderRef.current.scrollTo({
        left: scrollBy,
        behavior: 'smooth',
      });
      setSliderPosition(scrollBy);
    }
  }

  return (
    <>
      <div className={`flex w-full`} style={{ height }}>
        <div className={'flex h-full z-10'}>
          <div className={'h-full bg-bgPri dark:bg-bgPriD'} onMouseDown={() => handleScroll('left')}>
            {scrollLeftButton}
          </div>
          <div className={'w-[10px] h-full bg-grl dark:bg-grlD'} />
        </div>
        <div className={'w-full overflow-hidden mx-[-10px]'}>
          <div
            className={'overflow-hidden whitespace-nowrap h-full'}
            style={{ paddingBottom: height + 50, direction: start === 'left' ? 'ltr' : 'rtl' }}
            ref={sliderRef}
          >
            <div className={'inline-block'} ref={sliderChildRef}>
              <div className={'inline-block w-[5px]'} />
              {renderedMembers}
              <div className={'inline-block w-[5px]'} />
            </div>
          </div>
        </div>
        <div className={'flex h-full z-10'}>
          <div className={'w-[10px] h-full bg-grr dark:bg-grrD'} />
          <div className={'h-full bg-bgPri dark:bg-bgPriD'} onMouseDown={() => handleScroll('right')}>
            {scrollRightButton}
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalScroll;
