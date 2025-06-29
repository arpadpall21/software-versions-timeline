'use client';

import { useRef, useMemo, RefObject } from 'react';

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
  const sliderRef: RefObject<null | HTMLDivElement> = useRef(null);

  const renderedMembers: React.ReactNode[] = useMemo(() => {
    return start === 'left' ? members : [...members].reverse();
  }, [members, start]);

  function handleScroll(direction: 'left' | 'right') {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollSensitivity : scrollSensitivity,
        behavior: 'smooth',
      });
    }
  }

  return (
    <>
      <div className={`relative w-full overflow-hidden`} style={{ height }}>
        <div className={'absolute left-0'} onMouseDown={() => handleScroll('left')}>
          {scrollLeftButton}
        </div>
        <div className={'absolute right-0'} onMouseDown={() => handleScroll('right')}>
          {scrollRightButton}
        </div>
        <div>
          <div
            className={'overflow-x-scroll overflow-y-hidden whitespace-nowrap h-full'}
            style={{ paddingBottom: height + 50, direction: start === 'left' ? 'ltr' : 'rtl' }}
            ref={sliderRef}
          >
            {renderedMembers}
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalScroll;
