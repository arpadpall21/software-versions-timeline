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
          className={`${scrollZoomEnabled ? 'fill-btnFgWarn dark:fill-btnFgWarnD' : 'fill-btnFg dark:fill-btnFgD'}
            p-[5px]`}
          onMouseDown={() => setScrollZoomEnabled(!scrollZoomEnabled)}
          title={scrollZoomEnabled ? t('scrollZoomEnabled') : t('scrollZoomDisabled')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" width="22px" viewBox="0 -960 960 960">
            <path
              d={`M480-240q-97 0-166-66t-74-162l84 25q13 54 56 88.5T480-320q66 0 113-47t47-113q0-57-34.5-100T517-636l
                -25-84q96 5 162 74t66 166q0 100-70 170t-170 70Zm0 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480v
                -18q0-9 2-18l78 24v12q0 134 93 227t227 93q134 0 227-93t93-227q0-134-93-227t-227-93h-12l-24-78q9-2 18
                -2h18q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-59
                -380L250-631l-50 151L80-880l400 120-151 50 171 171-79 79Z`}
            />
          </svg>
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
          className={'fill-btnFg dark:fill-btnFgD hover:bg-btnBgHov dark:hover:bg-btnBgHovD p-[6px]'}
          onClick={() => handleZoomChange('reset')}
          title={t('reset')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 -960 960 960">
            <path
              d={`M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q
                -32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t
                -196 67Z`}
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
