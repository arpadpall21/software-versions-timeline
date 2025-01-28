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
      className={'relative select-none my-7 shadow-[0_0_4px_1px] shadow-borPri dark:shadow-borPriD'}
      onWheel={handleMouseWheel}
      onMouseLeave={mouseUpHandler}
      onMouseMove={handleMouseMove}
      onMouseUp={mouseUpHandler}
    >
      <div className={'absolute z-10 bottom-4 right-4 w-9'}>
        <div
          className={`flex flex-col text-fgPop dark:text-fgPopD font-semibold text-xl shadow-md
            border-2 border-borPri dark:border-borPriD rounded-md bg-bgPri dark:bg-bgPriD`}
        >
          <button
            className={'hover:bg-bgSec dark:hover:bg-bgSecD'}
            onMouseDown={() => setTimelineZoomLevel(calcTimelineZoom('zoomOut', timelineZoomLevel))}
            title={'Zoom In'}
          >
            +
          </button>
          <button className={'hover:bg-bgSec dark:hover:bg-bgSecD'} onClick={handleResetClick} title={'Zoom Reset'}>
            ↺
          </button>
          <button
            className={'hover:bg-bgSec dark:hover:bg-bgSecD'}
            onMouseDown={() => setTimelineZoomLevel(calcTimelineZoom('zoomIn', timelineZoomLevel))}
            title={'Reset Grid'}
          >
            -
          </button>
        </div>
        <div
          className={`mt-3 text-fgPri dark:text-fgPriD animate-fast-pop text-center
            border-2 border-borPri dark:border-borPriD rounded-md bg-bgSec dark:bg-bgSecD shadow-md `}
          key={timelineZoomLevel.toFixed(1)}
          title={'Zoom Level'}
        >
          x{timelineZoomLevel.toFixed(1)}
        </div>
      </div>
      <div
        className={'grid grid-cols-[60px_auto] grid-rows-[60px_auto]'}
        // onTouchStart={mouseDownHandler}
        // onTouchEnd={mouseUpHandler}
      >
        <div className={'col-span-2 border-b border-borPri dark:border-borPriD overflow-hidden'}>
          <div
            className={'float-right'}
            style={{ transform: `translateX(${position.x}px) scaleX(${timelineZoomLevel})` }}
          >
            <p> top slider</p>
          </div>
        </div>
        <div className={'overflow-hidden duration-200 border-r border-black'}>
          <div className={''} style={{ transform: `translateY(${position.y}px) scaleY(${timelineZoomLevel})` }}>
            <p>side slider</p>
          </div>
        </div>
        <div
          className={'relative overflow-hidden duration-200 min-h-[300px]'}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={mouseDownHandler}
        >
          <button
            className={`absolute z-10 left-[50%] text-fgPop dark:text-fgPopD shadow-md px-2 font-semibold
               w-[180px] border-b-2 border-x-2 border-borPri dark:border-borPriD rounded-b-md
               ${scrollZoomEnabled ? 'bg-bgWarn dark:bg-bgWarnD' : 'bg-bgPri dark:bg-bgPriD'}
              hover:bg-bgWarnHover hover:dark:bg-bgWarnHoverD`}
            style={{ transform: 'translateX(-50%)' }}
            onClick={() => setScrollZoomEnabled(!scrollZoomEnabled)}
          >
            Scroll Zoom {scrollZoomEnabled ? 'Enabled' : 'Disabled'}
          </button>
          <div
            className={'float-right border border-green-400'}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          >
            <div
              className={'transition-transform duration-200 border border-red-400'}
              style={{ transform: `scale(${timelineZoomLevel})` }}
            >
              <div className={'bg-green-200'}>
                <p> Hello World! </p>
                <p> Hello World! </p>
                <p> Hello World! </p>
                <p> Hello World! </p>
                <p> Hello World! </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridFrame;
