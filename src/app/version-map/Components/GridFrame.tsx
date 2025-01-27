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
      className={'relative select-none my-7 shadow-[0_0_4px_1px] shadow-borPri dark:shadow-borPriD h-[600px]'}
      onWheel={handleMouseWheel}
      onMouseLeave={mouseUpHandler}
      onMouseMove={handleMouseMove}
      onMouseUp={mouseUpHandler}
    >
      <div
        className={'absolute z-10 bottom-0 right-0 bg-red-100'}
      >
        <div className={'flex flex-col'}>
          <button className={'border-2 border-red-400'} onMouseDown={() => setTimelineZoomLevel(calcTimelineZoom('zoomOut', timelineZoomLevel))}> + </button>
        <button className={'border-2 border-orange-400'} onClick={handleResetClick}> Reset Position </button>
          <button className={'border-2 border-red-400'} onMouseDown={() => setTimelineZoomLevel(calcTimelineZoom('zoomIn', timelineZoomLevel))}> - </button>
        
        </div>
        <br />
        <br />
        <br />
        <br />
        <p> Zoom level: <span className={'animate-fast-pop'} key={timelineZoomLevel.toFixed(1)}>x{timelineZoomLevel.toFixed(1)}</span></p>
        <br />
      </div>
      <div
        className={'grid grid-cols-[60px_auto] grid-rows-[60px_auto]'}
        // onTouchStart={mouseDownHandler}
        // onTouchEnd={mouseUpHandler}
      >
        <div className={'col-span-2 overflow-hidden'}>
          <div className={'float-right'} style={{ transform: `translateX(${position.x}px) scaleX(${timelineZoomLevel})` }}>
            
          </div>
        </div>
        <div className={'overflow-hidden duration-200'}>
          <div className={''} style={{ transform: `translateY(${position.y}px) scaleY(${timelineZoomLevel})` }}>
            
          </div>
        </div>
        <div
          className={'overflow-hidden duration-200'}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={mouseDownHandler}
        >
          <button
            className={'absolute z-10'}
            style={{ backgroundColor: scrollZoomEnabled ? 'red' : '' }}
            onClick={() => setScrollZoomEnabled(!scrollZoomEnabled)}
          >
            Scroll Zoom Enabled
          </button>
          <div
            className={'float-right'}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          >
            <div
              className={'transition-transform duration-200'}
              style={{ transform: `scale(${timelineZoomLevel})` }}
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridFrame;
