'use client';

import { RefObject, useRef } from 'react';

interface Props {
  twStyle?: string;
  members: React.ReactNode[];
  scrollLeftButton: React.ReactNode;
  scrollRightButton: React.ReactNode;
  direction?: 'ltr' | 'rtl';
}

const height: number = 200;

const HorizontalScroll: React.FC<Props> = ({
  twStyle,
  members,
  scrollLeftButton,
  scrollRightButton,
  direction = 'ltr',    // TODO: this prop sets the left/right start thingy
}) => {
  const parentRef: RefObject<null | HTMLDivElement> = useRef(null);
  const sliderRef: RefObject<null | HTMLDivElement> = useRef(null);

  function handleScrollRight() {
    if (parentRef.current) {
      console.log('<<>>')
      // parentRef.current.scrollBy(10, 10)
      parentRef.current.scrollBy({ left: 100, behavior: 'smooth' });
      
      // console.log(sliderRef.current.scrollWidth)
      
    }
    // console.log(sliderRef.current)
    
  }

  return (
    <>
      {/* <div onClick={handleScrollRight}>{scrollLeftButton}</div> */}
      <div onClick={handleScrollRight}>{scrollRightButton}</div>

      <div className={`w-full overflow-hidden border-2 border-blue-500`} style={{ height }}>
        <div className={`border-2 border-red-500 overflow-x-scroll overflow-y-hidden whitespace-nowrap h-full ${twStyle}`} style={{ paddingBottom: height + 50 }} ref={parentRef}>
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
