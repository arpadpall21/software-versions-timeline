'use client';

import '@/app/globals.css';
import { useState, useEffect } from 'react';
import { calcTimelineZoom } from '@/misc/helpers';
import appSettings from '@/misc/appSettings';
import ZoomPanel from '@/app/version-map/Components/ZoomPanel';
import ScrollZoomButton from '@/app/version-map/Components/ScrollZoomButton';
import TopSlider from '@/app/version-map/Components/TopSlider';
import SideSlider from '@/app/version-map/Components/SideSlider';
import TimelineGrid from '@/app/version-map/Components/TimelineGrid';

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

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
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
      className={`relative select-none my-7 shadow-[0_0_4px_1px] shadow-borPri dark:shadow-borPriD
      bg-bgSec dark:bg-bgSecD`}
      onWheel={handleMouseWheel}
      onMouseLeave={mouseUpHandler}
      onMouseMove={handleMouseMove}
      onMouseUp={mouseUpHandler}
    >
      <ZoomPanel
        timelineZoomLevel={timelineZoomLevel}
        setTimelineZoomLevel={setTimelineZoomLevel}
        setPosition={setPosition}
      />
      <div
        className={'grid grid-cols-[60px_auto] grid-rows-[100px_auto]'}
        // onTouchStart={mouseDownHandler}
        // onTouchEnd={mouseUpHandler}
      >
        <div className={'col-span-2 border-b border-borPri dark:border-borPriD overflow-hidden'}>
          <TopSlider timelineZoomLevel={timelineZoomLevel} position={position}>
            <TimelineGrid />
          </TopSlider>
        </div>
        <div className={'overflow-hidden duration-200 border-r border-black'}>
          <SideSlider timelineZoomLevel={timelineZoomLevel} position={position}>
            <p> Side slider </p>
          </SideSlider>
        </div>
        <div
          className={'relative overflow-hidden duration-200 min-h-[300px]'}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
        >
          <ScrollZoomButton scrollZoomEnabled={scrollZoomEnabled} setScrollZoomEnabled={setScrollZoomEnabled} />
          <div className={'float-right'} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
            <div className={'transition-transform duration-200'} style={{ transform: `scale(${timelineZoomLevel})` }}>
              <TimelineGrid />
              <TimelineGrid />
              <TimelineGrid />
              <TimelineGrid />
              <TimelineGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridFrame;
