'use client';

import '@/app/globals.css';
import { useState, useContext, useEffect, useRef, type RefObject } from 'react';
import { getDisplayedLastMonth, calcMonthRange, compareDates } from '@/misc/helpers';
import appConfig from '../../../../config/appConfig';
import ZoomPanel from '@/app/version-map/Components/ZoomPanel';
import Timeline from '@/app/version-map/Components/Timeline';
import MonthsTimeline from '@/app/version-map/Components/MonthsTimeline';
import SideLogo from './SideLogo';
import AddNewTimelineButton from './AddNewTimelineButton';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import { Software } from '../../../../config/supportedSoftwares';

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
  [Software.INTERNET_EXPLORER]: 'bg-[#a6eaff] dark:bg-[#3e8196] text-[#2e2e2e] dark:text-[#1c1c1c]',
  [Software.REACT]: 'bg-[#039ab0] dark:bg-[#01505C] text-[#f7f7f7] dark:text-[#bdbdbd]',
  [Software.NODE]: 'bg-[#529e43] dark:bg-[#2c5424] text-white dark:text-[#bdbdbd]',
  [Software.PYTHON]: 'bg-[#e3ab1e] dark:bg-[#856411] text-[#2e2e2e] dark:text-[#1c1c1c]',
  [Software.FASTAPI]: 'bg-[#00d9ca] dark:bg-[#00524c] text-[#2e2e2e] dark:text-[#ededed]',
  [Software.MYSQL]: 'bg-[#169ac9] dark:bg-[#1e4857] text-white dark:text-[#bdbdbd]',
  [Software.POSTGRESQL]: 'bg-[#169ac9] dark:bg-[#1e4857] text-white dark:text-[#bdbdbd]',
};
const addNewTimelineButtonHeight: number = 30;

const GridFrame = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState<boolean>(false);
  const {
    position,
    setPosition,
    verticalScrollLock,
    zoomLevel,
    gridCellWidth,
    displayedSoftwares,
    displayedMonths,
    setDisplayedMonths,
    displayableDateLimit,
    gridOffset,
    setGridOffset,
    setSelectedYear,
    nrOfMonthsToRender,
  } = useContext(GridContainerContext);

  const zoomPanelRef: RefObject<{ handleZoomChange: (zoom: 'zoomIn' | 'zoomOut' | 'reset') => void }> = useRef({
    handleZoomChange: () => {},
  });

  useEffect(() => {
    if (scrollZoomEnabled) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';
  }, [scrollZoomEnabled]);

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x, y: verticalScrollLock ? 0 : e.clientY - offset.y });

      if (
        displayableDateLimit?.oldestDate &&
        compareDates(displayedMonths[0].date, '>', displayableDateLimit.oldestDate) &&
        position.x - gridCellWidth - gridCellWidth * appConfig.standByMonths.right > gridOffset
      ) {
        const nrOfMonthsToShift: number = Math.ceil(
          (position.x - gridCellWidth - gridCellWidth * appConfig.standByMonths.right - gridOffset) / gridCellWidth,
        );
        const shiftedLastMonth: Date = getDisplayedLastMonth(displayedMonths, -nrOfMonthsToShift);
        const visibleLatestMonth: Date = new Date(shiftedLastMonth);
        visibleLatestMonth.setMonth(visibleLatestMonth.getMonth() - appConfig.standByMonths.right);

        setDisplayedMonths(calcMonthRange(shiftedLastMonth, nrOfMonthsToRender, displayableDateLimit));
        setGridOffset(gridOffset + gridCellWidth * nrOfMonthsToShift);
        setSelectedYear(visibleLatestMonth.getFullYear());
      } else if (
        displayableDateLimit?.newestDate &&
        compareDates(displayedMonths[displayedMonths.length - 1].date, '<', displayableDateLimit.newestDate) &&
        position.x - gridCellWidth * appConfig.standByMonths.right < gridOffset
      ) {
        const nrOfMonthsToShift: number = -Math.floor(
          (position.x - gridCellWidth * appConfig.standByMonths.right - gridOffset) / gridCellWidth,
        );
        const shiftedLastMonth: Date = getDisplayedLastMonth(displayedMonths, nrOfMonthsToShift);
        const visibleLatestMonth: Date = new Date(shiftedLastMonth);
        visibleLatestMonth.setMonth(visibleLatestMonth.getMonth() - appConfig.standByMonths.right);

        setDisplayedMonths(calcMonthRange(shiftedLastMonth, nrOfMonthsToRender, displayableDateLimit));
        setGridOffset(gridOffset - gridCellWidth * nrOfMonthsToShift);
        setSelectedYear(visibleLatestMonth.getFullYear());
      }
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleMouseWheel(e: React.WheelEvent) {
    if (scrollZoomEnabled && e.deltaY > 0) {
      zoomPanelRef.current.handleZoomChange('zoomOut');
    } else if (scrollZoomEnabled && e.deltaY < 0) {
      zoomPanelRef.current.handleZoomChange('zoomIn');
    }
  }

  return (
    <div
      className={`
        relative overflow-hidden select-none mb-7 mt-1
        shadow-[0_0_4px_1px] shadow-borPri dark:shadow-borPriD bg-gridBg dark:bg-gridBgD`}
      onWheel={handleMouseWheel}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <ZoomPanel ref={zoomPanelRef} scrollZoomEnabled={scrollZoomEnabled} setScrollZoomEnabled={setScrollZoomEnabled} />
      <div className={'relative grid grid-cols-[55px_auto] md:grid-cols-[70px_auto] grid-rows-[60px_auto]'}>
        <div className={'col-span-2 col-start-1 row-start-1 border-b border-black dark:border-white overflow-hidden'}>
          <div className={'relative float-right'} style={{ transform: `translateX(${position.x}px)` }}>
            <div
              className={'absolute smoothTransform origin-right'}
              style={{ transform: `scaleX(${zoomLevel})`, right: gridOffset }}
            >
              <MonthsTimeline zoomLevel={zoomLevel} />
            </div>
          </div>
        </div>
        <div className={'col-start-1 row-start-2 z-10 overflow-hidden bg-opacity-0'}>
          <div style={{ transform: `translateY(${position.y}px)` }}>
            <div className={'smoothTransform'} style={{ transform: `scaleY(${zoomLevel})` }}>
              {displayedSoftwares &&
                displayedSoftwares.map((software, i) => (
                  <SideLogo twStyle={twTimelineStyle[software]} software={software} idx={i} key={i} />
                ))}
              {zoomLevel === appConfig.zoom.defaultLevel ? (
                <AddNewTimelineButton height={addNewTimelineButtonHeight} />
              ) : (
                <div style={{ height: addNewTimelineButtonHeight }} />
              )}
            </div>
          </div>
        </div>
        <div className={'absolute col-start-1 row-start-2 z-0 w-full'}>
          <div
            className={'relative overflow-hidden '}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              height: displayedSoftwares.length * 100 + addNewTimelineButtonHeight,
            }}
            onMouseDown={handleMouseDown}
          >
            <div className={'relative'} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
              <div
                className={'absolute smoothTransform origin-right'}
                style={{ transform: `scale(${zoomLevel})`, right: gridOffset }}
              >
                <div className={'relative'}>
                  <div className={'absolute bottom-0'}>
                    <MonthsTimeline zoomLevel={zoomLevel} height={1000} gridOnly={true} />
                  </div>
                </div>
                {displayedSoftwares.map((software, i) => (
                  <Timeline
                    zoomLevel={zoomLevel}
                    software={software}
                    twTimelineStyle={twTimelineStyle[software]}
                    key={i}
                  />
                ))}
                <div className={'relative'}>
                  <div className={'absolute top-0'}>
                    <MonthsTimeline zoomLevel={zoomLevel} height={1000} gridOnly={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridFrame;
