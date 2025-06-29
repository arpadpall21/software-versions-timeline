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

  function handleScrollLeft() {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollSensitivity, behavior: 'smooth' });
    }
  }

  function handleScrollRight() {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollSensitivity, behavior: 'smooth' });
    }
  }

  return (
    <>
      <div onMouseDown={handleScrollLeft}>{scrollLeftButton}</div>
      <div onMouseDown={handleScrollRight}>{scrollRightButton}</div>

      <div className={`w-full overflow-hidden`} style={{ height, direction: start === 'left' ? 'ltr' : 'rtl' }}>
        <div
          className={'overflow-x-scroll overflow-y-hidden whitespace-nowrap h-full'}
          style={{ paddingBottom: height + 50 }}
          ref={sliderRef}
        >
          {renderedMembers}
        </div>
      </div>
    </>
  );
};

export default HorizontalScroll;
