'use client';

import { calcTimelineZoom } from '@/misc/helpers';
import { useTranslations } from 'next-intl';

interface Props {
  zoomLevel: number;
  setZoomLevel: (timelineZoomLevel: number) => void;
  setPosition: (position: { x: number; y: number }) => void;
}

const ZoomPanel: React.FC<Props> = ({ zoomLevel, setZoomLevel, setPosition }) => {
  const t = useTranslations('components.zoomPanel');

  function handleResetClick() {
    setPosition({ x: 0, y: 0 });
    setZoomLevel(1);
  }

  return (
    <div className={'absolute z-10 bottom-4 right-4 w-9'}>
      <div
        className={`flex flex-col text-fgPop dark:text-fgPopD font-semibold text-xl shadow-md
          border-2 border-borPri dark:border-borPriD rounded-md bg-bgPri dark:bg-bgPriD`}
      >
        <button
          className={'rounded-t-[0.25rem] hover:bg-bgIntHover dark:hover:bg-bgIntHoverD'}
          onMouseDown={() => setZoomLevel(calcTimelineZoom('zoomIn', zoomLevel))}
          title={t('zoomIn')}
        >
          +
        </button>
        <button
          className={'hover:bg-bgIntHover dark:hover:bg-bgIntHoverD'}
          onClick={handleResetClick}
          title={t('reset')}
        >
          ↺
        </button>
        <button
          className={'rounded-b-[0.25rem] hover:bg-bgIntHover dark:hover:bg-bgIntHoverD'}
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
