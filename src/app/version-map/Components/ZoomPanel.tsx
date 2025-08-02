'use client';

import { useContext, useImperativeHandle, RefObject } from 'react';
import {
  calcTimelineZoom,
  calcNrOfGridCellsToRender,
  getDisplayedLastMonth,
  calcMonthRange,
  getMonthDifference,
} from '@/misc/helpers';
import { useTranslations } from 'next-intl';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import tailwindConfig from '../../../../tailwind.config';
import appConfig from '../../../../config/appConfig';

interface Props {
  ref: RefObject<{ handleZoomChange: (zoom: 'zoomIn' | 'zoomOut' | 'reset') => void }>;
  scrollZoomEnabled: boolean;
  setScrollZoomEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const originalGridCellWidth: number = Number.parseInt(tailwindConfig.theme.extend.spacing.gridCellW);

const ZoomPanel: React.FC<Props> = ({ ref, scrollZoomEnabled, setScrollZoomEnabled }) => {
  const {
    position,
    setPosition,
    setVerticalScrollLock,
    zoomLevel,
    setZoomLevel,
    gridCellWidth,
    setGridCellWidth,
    displayedMonths,
    setDisplayedMonths,
    displayableDateLimit,
    gridOffset,
    setGridOffset,
    setNrOfMonthToRender,
  } = useContext(GridContainerContext);

  const t = useTranslations('components.zoomPanel');

  useImperativeHandle(ref, () => ({ handleZoomChange }));

  function handleZoomChange(zoom: 'zoomIn' | 'zoomOut' | 'reset') {
    if (zoom === 'reset') {
      if (zoomLevel === appConfig.zoom.defaultLevel) {
        return;
      }

      const nrOfMonthsToRender: number = calcNrOfGridCellsToRender(originalGridCellWidth);
      const lastDisplayedMonth: Date = getDisplayedLastMonth(displayedMonths);
      const gridCellOffset: number =
        getMonthDifference(displayableDateLimit?.newestDate, lastDisplayedMonth) === 0
          ? 0
          : appConfig.standByMonths.right;

      setPosition({ x: 0, y: 0 });
      setGridOffset(-(originalGridCellWidth * gridCellOffset));
      setDisplayedMonths(calcMonthRange(lastDisplayedMonth, nrOfMonthsToRender, displayableDateLimit));
      setNrOfMonthToRender(nrOfMonthsToRender);
      setGridCellWidth(originalGridCellWidth);
      setZoomLevel(appConfig.zoom.defaultLevel);
      setVerticalScrollLock(true);
    } else {
      const newZoomLevel: number = calcTimelineZoom(zoom, zoomLevel);

      if (newZoomLevel > appConfig.zoom.defaultLevel) {
        setVerticalScrollLock(false);
      }
      if (zoomLevel === newZoomLevel) {
        return;
      }

      const newGridCellWidth: number = originalGridCellWidth * newZoomLevel;
      const nrOfMonthsToRender: number = calcNrOfGridCellsToRender(newGridCellWidth);
      let lastDisplayedMonth: Date = getDisplayedLastMonth(displayedMonths, 0);

      // correction when zooming out
      if (zoom === 'zoomOut') {
        const nrOfMonthsToShift: number = Math.max(
          0,
          Math.round((position.x - gridCellWidth * appConfig.standByMonths.right - gridOffset) / gridCellWidth),
        );
        lastDisplayedMonth = getDisplayedLastMonth(displayedMonths, -nrOfMonthsToShift);
        setGridOffset(gridOffset + gridCellWidth * nrOfMonthsToShift);
      }

      setZoomLevel(newZoomLevel);
      setGridCellWidth(newGridCellWidth);
      setNrOfMonthToRender(nrOfMonthsToRender);
      setDisplayedMonths(calcMonthRange(lastDisplayedMonth, nrOfMonthsToRender, displayableDateLimit));
    }
  }

  return (
    <div className={'invisible md:visible absolute z-10 bottom-4 right-4 w-9'}>
      <div
        className={`${scrollZoomEnabled ? 'btnWarn dark:btnWarnD' : 'btn dark:btnD'}
          flex flex-col mb-3 font-semibold text-xl`}
      >
        <button
          onMouseDown={() => setScrollZoomEnabled(!scrollZoomEnabled)}
          title={scrollZoomEnabled ? t('scrollZoomEnabled') : t('scrollZoomDisabled')}
        >
          ⎋
        </button>
      </div>
      <div
        className={`flex flex-col font-semibold text-xl text-btnFg dark:text-btnFgD bg-btnBg dark:bg-btnBgD
          shadow-md rounded-md border-2 border-borPri dark:border-borPriD`}
      >
        <button
          className={'rounded-t-[0.25rem] hover:bg-btnBgHov dark:hover:bg-btnBgHovD'}
          onMouseDown={() => handleZoomChange('zoomIn')}
          title={t('zoomIn')}
        >
          +
        </button>
        <button
          className={'fill-btnFg dark:fill-btnFgD hover:bg-btnBgHov dark:hover:bg-btnBgHovD p-[7px]'}
          onClick={() => handleZoomChange('reset')}
          title={t('reset')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            width="18px"
            viewBox="0 -960 960 960"
            stroke={'#4444bc'}
            strokeWidth="10"
          >
            <path
              d={`M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480
                -160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58
                -62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5
                -114 77T480-80Z`}
            />
          </svg>
        </button>
        <button
          className={'rounded-b-[0.25rem] hover:bg-btnBgHov dark:hover:bg-btnBgHovD'}
          onMouseDown={() => handleZoomChange('zoomOut')}
          title={t('zoomOut')}
        >
          -
        </button>
      </div>
      <div
        className={`mt-3 text-fgPri dark:text-fgPriD animate-fast-pop text-center
          border-2 border-borPri dark:border-borPriD rounded-md bg-bgSec dark:bg-bgSecD shadow-md`}
        key={zoomLevel.toFixed(1)}
        title={t('zoomLevel')}
      >
        {zoomLevel.toFixed(1)}
      </div>
    </div>
  );
};

export default ZoomPanel;
