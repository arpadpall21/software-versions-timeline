'use client';

import { useState, useEffect } from 'react';
import { calcTimelineZoom } from '@/misc/helpers';

const GridFrame: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [timelineZoomLevel, setTimelineZoomLevel] = useState<number>(1);
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (scrollZoomEnabled) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';
  }, [scrollZoomEnabled]);

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

  function handleMouseWheel(e: React.WheelEvent) {
    if (scrollZoomEnabled && e.deltaY > 0) {
      setTimelineZoomLevel(calcTimelineZoom('zoomIn', timelineZoomLevel));
      return;
    } else if (scrollZoomEnabled && e.deltaY < 0) {
      setTimelineZoomLevel(calcTimelineZoom('zoomOut', timelineZoomLevel));
    }
  }

  return (
    <div
      className={'border-2 border-black h-[700px]'}
      onMouseMove={handleMouseMove}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseUpHandler}
      onWheel={handleMouseWheel}
      // onTouchStart={mouseDownHandler}
      // onTouchEnd={mouseUpHandler}
    >
      <div>
        <p>{timelineZoomLevel.toPrecision(2)}</p>
        <button style={{ backgroundColor: scrollZoomEnabled ? 'red' : '' }} onClick={() => setScrollZoomEnabled(!scrollZoomEnabled)}> Scroll Zoom Enabled </button>
        <button className={'w-10 h-6 border-2 border-red-400'} onClick={() => setTimelineZoomLevel(calcTimelineZoom('zoomOut', timelineZoomLevel))}> + </button>
        <button className={'w-10 h-6 border-2 border-red-400'} onClick={() => setTimelineZoomLevel(calcTimelineZoom('zoomIn', timelineZoomLevel))}> - </button>
      </div>
    
    
      <div
        className={'border border-green-500 h-[300px] w-[300px]'}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${timelineZoomLevel})`,
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
