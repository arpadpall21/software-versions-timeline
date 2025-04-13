'use client';

import '@/app/globals.css';
import { useState, useEffect } from 'react';
import { calcTimelineZoom, calcMonthsUpToCurrent } from '@/misc/helpers';
import appConfig from '../../../../config/appConfig';
import ZoomPanel from '@/app/version-map/Components/ZoomPanel';
import ScrollZoomButton from '@/app/version-map/Components/ScrollZoomButton';
import TimelineGrid from '@/app/version-map/Components/TimelineGrid';
import MonthsGrid from '@/app/version-map/Components/MonthsGrid';
import SideLogo from './SideLogo';
import { type Month, Software } from '@/misc/types';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

const GridFrame: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoomLevel);
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState<boolean>(false);
  const [months, setMonths] = useState<Month[]>([]);

  useEffect(() => {
    setMonths(calcMonthsUpToCurrent(2023, 10));   // TODO (default start month handle)
  }, []);

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
      setZoomLevel(calcTimelineZoom('zoomIn', zoomLevel));
      return;
    } else if (scrollZoomEnabled && e.deltaY < 0) {
      setZoomLevel(calcTimelineZoom('zoomOut', zoomLevel));
    }
  }

  return (
    <div
      className={`
        relative overflow-hidden select-none my-7
        shadow-[0_0_4px_1px] shadow-borPri dark:shadow-borPriD bg-bgSec dark:bg-bgSecD`}
      onWheel={handleMouseWheel}
      onMouseLeave={mouseUpHandler}
      onMouseMove={handleMouseMove}
      onMouseUp={mouseUpHandler}
    >
      <ZoomPanel zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} setPosition={setPosition} />
      <div
        className={'grid grid-cols-[70px_auto] grid-rows-[60px_auto]'}
        // onTouchStart={mouseDownHandler}
        // onTouchEnd={mouseUpHandler}
      >
        <div className={'col-span-2 border-b border-black dark:border-white overflow-hidden'}>
          <div className={'float-right'} style={{ transform: `translateX(${position.x}px)` }}>
            <div className={'smoothTransform'} style={{ transform: `scaleX(${zoomLevel})` }}>
              <MonthsGrid zoomLevel={zoomLevel} months={months} />
            </div>
          </div>
        </div>
        <div className={'overflow-hidden border-r border-black dark:border-white'}>
          <div style={{ transform: `translateY(${position.y}px)` }}>
            <div className={'smoothTransform'} style={{ transform: `scaleY(${zoomLevel})` }}>
              <SideLogo zoomLevel={zoomLevel} software={Software.CHROME} />
              <SideLogo zoomLevel={zoomLevel} software={Software.CHROME} />
              <SideLogo zoomLevel={zoomLevel} software={Software.CHROME} />
              <SideLogo zoomLevel={zoomLevel} software={Software.CHROME} />
              <SideLogo zoomLevel={zoomLevel} software={Software.CHROME} />
            </div>
          </div>
        </div>
        <div
          className={'relative overflow-hidden min-h-[500px]'}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
        >
          <ScrollZoomButton scrollZoomEnabled={scrollZoomEnabled} setScrollZoomEnabled={setScrollZoomEnabled} />
          <div className={'float-right'} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
            <div className={'smoothTransform'} style={{ transform: `scale(${zoomLevel})` }}>
              <TimelineGrid zoomLevel={zoomLevel} months={months} software={Software.CHROME} />
              <TimelineGrid zoomLevel={zoomLevel} months={months} software={Software.CHROME} />
              <TimelineGrid zoomLevel={zoomLevel} months={months} software={Software.CHROME} />
              <TimelineGrid zoomLevel={zoomLevel} months={months} software={Software.CHROME} />
              <TimelineGrid zoomLevel={zoomLevel} months={months} software={Software.CHROME} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridFrame;
