'use client';

import '@/app/globals.css';
import { useState, useEffect } from 'react';
import { calcTimelineZoom, calcMonthsUpToCurrent, defaultDisplayedSoftwares } from '@/misc/helpers';
import appConfig from '../../../../config/appConfig';
import ZoomPanel from '@/app/version-map/Components/ZoomPanel';
import ScrollZoomButton from '@/app/version-map/Components/ScrollZoomButton';
import Timeline from '@/app/version-map/Components/Timeline';
import MonthsTimeline from '@/app/version-map/Components/MonthsTimeline';
import SideLogo from './SideLogo';
import { type Month, type LocalCache, type DisplayedSoftwares, Software } from '@/misc/types';

const defaultZoomLevel = appConfig.zoom.defaultLevel;
const localCache: LocalCache = {};

/**
 * Tailwind utilities are parsed at build time so they cannot be iterpolated with values,
 *   this also means including tailwind utilities in appConfig doesn't work either.
 * So I'm kind of forced to implement this crappy solution in order to map tailwind utilities to software timelines :/
 *
 * https://tailwindcss.com/docs/detecting-classes-in-source-files#class-detection-in-depth
 */
const twTimelineStyle: { [software in Software]: string } = {
  [Software.CHROME]: 'bg-[#fbd447] dark:bg-[#9e862d] text-[#2e2e2e] dark:text-[#1c1c1c]',
  [Software.MOZILLA]: 'bg-[#437aa8] dark:bg-[#356085] text-white dark:text-[#ededed]',
  [Software.OPERA]: 'bg-[#ff7e7e] dark:bg-[#b06f6f] text-[#2e2e2e] dark:text-[#1c1c1c]',
  [Software.EDGE]: 'bg-[#0782d7] dark:bg-[#044a7a] text-white dark:text-[#bdbdbd]',
  [Software.SAFARI]: 'bg-[#bcbec2] dark:bg-[#4A4B4D] text-[#2e2e2e] dark:text-[#bdbdbd]',
  [Software.NODE]: 'bg-[#529e43] dark:bg-[#2c5424] text-white dark:text-[#bdbdbd]',
  [Software.REACT]: 'bg-[#039ab0] dark:bg-[#01505C] text-[#f7f7f7] dark:text-[#bdbdbd]',
  [Software.PYTHON]: 'bg-[#e3ab1e] dark:bg-[#856411] text-[#2e2e2e] dark:text-[#1c1c1c]',
};

const GridFrame: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoomLevel);
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState<boolean>(false);
  const [months, setMonths] = useState<Month[]>(calcMonthsUpToCurrent(2023, 1));
  const [displayedSoftwares, setDisplayedSoftwares] = useState<DisplayedSoftwares>(defaultDisplayedSoftwares);

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
      setZoomLevel(calcTimelineZoom('zoomOut', zoomLevel));
      return;
    } else if (scrollZoomEnabled && e.deltaY < 0) {
      setZoomLevel(calcTimelineZoom('zoomIn', zoomLevel));
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
              <MonthsTimeline zoomLevel={zoomLevel} months={months} />
            </div>
          </div>
        </div>
        <div className={'overflow-hidden border-r border-black dark:border-white'}>
          <div style={{ transform: `translateY(${position.y}px)` }}>
            <div className={'smoothTransform'} style={{ transform: `scaleY(${zoomLevel})` }}>
              {displayedSoftwares.map((software, i) => (
                <SideLogo
                  zoomLevel={zoomLevel}
                  twStyle={twTimelineStyle[software]}
                  software={software}
                  idx={i}
                  displayedSoftwares={displayedSoftwares}
                  setDisplayedSoftwares={setDisplayedSoftwares}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className={'relative overflow-hidden min-h-[500px]'}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
        >
          <ScrollZoomButton scrollZoomEnabled={scrollZoomEnabled} setScrollZoomEnabled={setScrollZoomEnabled} />
          <div
            className={'min-w-full float-right'}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          >
            <div className={'min-w-full smoothTransform'} style={{ transform: `scale(${zoomLevel})` }}>
              {displayedSoftwares.map((software, i) => (
                <Timeline
                  zoomLevel={zoomLevel}
                  months={months}
                  software={software}
                  cache={localCache}
                  twTimelineStyle={twTimelineStyle[software]}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridFrame;
