'use client';

import '@/app/globals.css';
import { useState, useEffect } from 'react';
import { calcTimelineZoom } from '@/misc/helpers';
import appSettings from '@/misc/appSettings';

const defaultTimelineZoomLevel = appSettings.timelineZoom.defaultLevel;

const GridFrame: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [timelineZoomLevel, setTimelineZoomLevel] = useState<number>(defaultTimelineZoomLevel);
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

  function handleResetClick() {
    setPosition({ x: 0, y: 0 });
    setTimelineZoomLevel(1);
  }

  return (
    <div
      className={'border-2 border-black h-[700px] overflow-hidden'}
      onMouseMove={handleMouseMove}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseUpHandler}
      onWheel={handleMouseWheel}
      // onTouchStart={mouseDownHandler}
      // onTouchEnd={mouseUpHandler}
    >
      <div>
        <p> Zoom level: <span key={timelineZoomLevel.toFixed(1)} style={{ animationDuration: '200ms', animationName: 'fast-pop' }}>x{timelineZoomLevel.toFixed(1)}</span></p>
        <button style={{ backgroundColor: scrollZoomEnabled ? 'red' : '' }} onClick={() => setScrollZoomEnabled(!scrollZoomEnabled)}> Scroll Zoom Enabled </button>
        <button className={'w-10 h-6 border-2 border-red-400'} onMouseDown={() => setTimelineZoomLevel(calcTimelineZoom('zoomOut', timelineZoomLevel))}> + </button>
        <button className={'w-10 h-6 border-2 border-red-400'} onMouseDown={() => setTimelineZoomLevel(calcTimelineZoom('zoomIn', timelineZoomLevel))}> - </button>
        <br />
        <button className={'w-30 h-6 border-2 border-orange-400'} onClick={handleResetClick}> Reset Position </button>
      </div>
    
    
      <div
        className={'border border-green-500 h-[300px] w-[300px] float-end'}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <div
          className={'border border-blue-500 transition-transform duration-200'}
          style={{ transform: `scale(${timelineZoomLevel})` }}
        >
          <p> Hello World! </p>
          <p> Hello World! </p>
          <p> Hello World! </p>
          <p> Hello World! </p>
        </div>
      </div>
    </div>
  )
}

export default GridFrame;
