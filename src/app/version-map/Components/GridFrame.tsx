'use client';

import { useState } from 'react';
import ControlPanel from '@/app/version-map/Components/ControlPanel';

const GridFrame: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  console.log(zoomLevel)

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  }

  function mouseDownHandler(e: React.MouseEvent) {
    e.preventDefault()
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  function mouseUpHandler() {
    setIsDragging(false);
  }

  function wheelHandler(e: React.WheelEvent) {
    // window.onscroll = function () { window.scrollTo(0, 0); };
    if (e.deltaY > 0 && zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.02);
      return;
    } else if (zoomLevel < 3) {
      setZoomLevel(zoomLevel + 0.02);
    }
  }

  return (
    <div
      className={'border-2 border-black h-[700px]'}
      onMouseMove={handleMouseMove}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseUpHandler}
      onWheel={wheelHandler}
      // onTouchStart={mouseDownHandler}
      // onTouchEnd={mouseUpHandler}
    >
      <ControlPanel zoomLevel={zoomLevel} />
      <div
        className={'border border-green-500 h-[300px] w-[300px]'}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <p> Hello World! </p>
        <p> Hello World! </p>
        <p> Hello World! </p>
        <p> Hello World! </p>
      </div>
    </div>
  )
}

export default GridFrame;
