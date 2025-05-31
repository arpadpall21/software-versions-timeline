'use client';

import { useContext } from 'react';
import { calcTimelineZoom } from '@/misc/helpers';
import { useTranslations } from 'next-intl';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';

const ZoomPanel: React.FC = () => {
  const { zoomLevel, setZoomLevel, setPosition, setGridOffset } = useContext(GridContainerContext);

  const t = useTranslations('components.zoomPanel');

  function handleResetClick() {
    setPosition({ x: 0, y: 0 });
    setGridOffset(0);
    setZoomLevel(1);
  }

  return (
    <div className={'absolute z-10 bottom-4 right-4 w-9'}>
      <div
        className={`flex flex-col font-semibold text-xl text-btnFg dark:text-btnFgD bg-btnBg dark:bg-btnBgD
          shadow-md rounded-md border-2 border-borPri dark:border-borPriD`}
      >
        <button
          className={'rounded-t-[0.25rem] hover:bg-btnBgHov dark:hover:bg-btnBgHovD'}
          onMouseDown={() => setZoomLevel(calcTimelineZoom('zoomIn', zoomLevel))}
          title={t('zoomIn')}
        >
          +
        </button>
        <button className={'hover:bg-btnBgHov dark:hover:bg-btnBgHovD'} onClick={handleResetClick} title={t('reset')}>
          ↺
        </button>
        <button
          className={'rounded-b-[0.25rem] hover:bg-btnBgHov dark:hover:bg-btnBgHovD'}
          onMouseDown={() => setZoomLevel(calcTimelineZoom('zoomOut', zoomLevel))}
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
