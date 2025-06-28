'use client';

import { RefObject, useRef } from 'react';

interface Props {
  height: number;
  members: React.ReactNode[];
  scrollLeftButton: React.ReactNode;
  scrollRightButton: React.ReactNode;
  scrollSensitivity?: number;
  direction?: 'ltr' | 'rtl';
}

const HorizontalScroll: React.FC<Props> = ({
  height,
  members,
  scrollLeftButton,
  scrollRightButton,
  scrollSensitivity = 100,
  direction = 'ltr',    // TODO: this prop sets the left/right start thingy
}) => {
  const sliderRef: RefObject<null | HTMLDivElement> = useRef(null);

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
      <div onClick={handleScrollLeft}>{scrollLeftButton}</div>
      <div onClick={handleScrollRight}>{scrollRightButton}</div>

      <div className={`w-full overflow-hidden`} style={{ height }}>
        <div
          className={'overflow-x-scroll overflow-y-hidden whitespace-nowrap h-full'}
          style={{ paddingBottom: height + 50 }}
          ref={sliderRef}
        >
          {members}
        </div>
      </div>
    </>
  );
};

export default HorizontalScroll;


//  const parent = child.parentElement;
//     const minX = 0; // Minimum X position (left edge of parent)
//     const maxX = parent.clientWidth - child.clientWidth; 


    // <div className={`relative whitespace-nowrap overflow-hidden ${twStyle}`}>
    //   <div className={'absolute left-0 z-10'}>{scrollLeftButton}</div>
    //   <div className={'absolute right-0 z-10'}>{scrollRightButton}</div>
    //   <div className={`absolute ${sliderParentStart}`} style={{ direction }}>
    //     <div className={'border-2'}>{direction === 'rtl' ? [...members].reverse() : members}</div>
    //   </div>
    // </div>
