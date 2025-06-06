'use client';

import { useContext, useImperativeHandle, RefObject } from 'react';
import { calcTimelineZoom, calcNrOfGridCellsToRender, getDisplayedLastMonth, calcMonthRange } from '@/misc/helpers';
import { useTranslations } from 'next-intl';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import tailwindConfig from '../../../../tailwind.config';

interface Props {
  ref: RefObject<{ handleZoomChange: (zoom: 'zoomIn' | 'zoomOut' | 'reset') => void }>;
}

const originalGridCellWidth: number = Number.parseInt(tailwindConfig.theme.extend.spacing.gridCellW);

const ZoomPanel: React.FC<Props> = ({ ref }) => {
  const {
    zoomLevel,
    setZoomLevel,
    setGridCellWidth,
    displayedMonths,
    setDisplayedMonths,
    displayableDateLimit,
    setPosition,
    setGridOffset,
  } = useContext(GridContainerContext);

  const t = useTranslations('components.zoomPanel');

  useImperativeHandle(ref, () => ({ handleZoomChange }));

  function handleZoomChange(zoom: 'zoomIn' | 'zoomOut' | 'reset') {
    if (zoom === 'reset') {
      const lastDisplayedMonth: Date = getDisplayedLastMonth(displayedMonths, 0);
      const nrOfMonthsToRender: number = calcNrOfGridCellsToRender(originalGridCellWidth);

      setDisplayedMonths(calcMonthRange(lastDisplayedMonth, nrOfMonthsToRender, displayableDateLimit));
      setPosition({ x: 0, y: 0 });
      setGridOffset(0);
      setZoomLevel(1);
      setGridCellWidth(originalGridCellWidth);
    } else {
      const newZoomLevel: number = calcTimelineZoom(zoom, zoomLevel);
      const newGridCellWidth: number = originalGridCellWidth * newZoomLevel;
      const lastDisplayedMonth: Date = getDisplayedLastMonth(displayedMonths, 0);
      const nrOfMonthsToRender: number = calcNrOfGridCellsToRender(newGridCellWidth);

      setDisplayedMonths(calcMonthRange(lastDisplayedMonth, nrOfMonthsToRender, displayableDateLimit));
      setZoomLevel(newZoomLevel);
      setGridCellWidth(newGridCellWidth);
    }
  }

  return (
    <div className={'absolute z-10 bottom-4 right-4 w-9'}>
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
          className={'hover:bg-btnBgHov dark:hover:bg-btnBgHovD'}
          onClick={() => handleZoomChange('reset')}
          title={t('reset')}
        >
          ↺
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
        title={'Zoom Level'}
      >
        {zoomLevel.toFixed(1)}
      </div>
    </div>
  );
};

export default ZoomPanel;
