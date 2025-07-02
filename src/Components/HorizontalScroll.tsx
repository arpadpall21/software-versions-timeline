'use client';

import { useState, useRef, useMemo, useLayoutEffect, type RefObject } from 'react';

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
  const [leftScrollButtonVisible, setLeftScrollButtonVisible] = useState<boolean>(false);
  const [rightScrollButtonVisible, setRightScrollButtonVisible] = useState<boolean>(false);

  const sliderRef: RefObject<null | HTMLDivElement> = useRef(null);
  const sliderChildRef: RefObject<null | HTMLDivElement> = useRef(null);

  useLayoutEffect(() => {
    if (sliderRef.current && sliderChildRef.current) {
      if (sliderChildRef.current.offsetWidth - sliderRef.current.offsetWidth > 0) {
        if (start === 'left') {
          setRightScrollButtonVisible(true);
          return;
        }
        setLeftScrollButtonVisible(true);
      }
    }
  }, [members.length, start]);

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

        if (scrollBy <= 0) {
          setTimeout(() => setLeftScrollButtonVisible(false), 500);
        } else {
          setLeftScrollButtonVisible(true);
        }

        if (scrollBy >= maxScrollableDistance) {
          setTimeout(() => setRightScrollButtonVisible(false), 500);
        } else {
          setRightScrollButtonVisible(true);
        }
      } else {
        scrollBy =
          direction === 'left'
            ? Math.max(-maxScrollableDistance, sliderPosition - scrollSensitivity)
            : Math.min(0, sliderPosition + scrollSensitivity);

        if (scrollBy >= 0) {
          setTimeout(() => setRightScrollButtonVisible(false), 500);
        } else {
          setRightScrollButtonVisible(true);
        }

        if (scrollBy <= -maxScrollableDistance) {
          setTimeout(() => setLeftScrollButtonVisible(false), 500);
        } else {
          setLeftScrollButtonVisible(true);
        }
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
      <div className={`relative w-full overflow-hidden`} style={{ height }}>
        <div
          className={'absolute left-0 h-full'}
          style={{ visibility: leftScrollButtonVisible ? 'visible' : 'hidden' }}
        >
          <div className={'float-left h-full bg-bgPri dark:bg-bgPriD'} onMouseDown={() => handleScroll('left')}>
            {scrollLeftButton}
          </div>
          <div className={'float-left w-[20px] h-full bg-grl dark:bg-grlD'} />
        </div>
        <div
          className={'absolute right-0 h-full'}
          style={{ visibility: rightScrollButtonVisible ? 'visible' : 'hidden' }}
        >
          <div className={'float-right h-full bg-bgPri dark:bg-bgPriD'} onMouseDown={() => handleScroll('right')}>
            {scrollRightButton}
          </div>
          <div className={'float-right w-[20px] h-full bg-grr dark:bg-grrD'} />
        </div>
        <div>
          <div
            className={'overflow-x-scroll whitespace-nowrap h-full'}
            style={{ paddingBottom: height + 50, direction: start === 'left' ? 'ltr' : 'rtl' }}
            ref={sliderRef}
          >
            <div className={'inline-block'} ref={sliderChildRef}>
              {renderedMembers}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalScroll;
