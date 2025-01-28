import { calcTimelineZoom } from '@/misc/helpers';

interface Props {
  timelineZoomLevel: number;
  setTimelineZoomLevel: (timelineZoomLevel: number) => void;
  setPosition: (position: { x: number; y: number }) => void;
}

const ZoomPanel: React.FC<Props> = ({ timelineZoomLevel, setTimelineZoomLevel, setPosition }) => {
  function handleResetClick() {
    setPosition({ x: 0, y: 0 });
    setTimelineZoomLevel(1);
  }

  return (
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
        {timelineZoomLevel.toFixed(1)}
      </div>
    </div>
  );
};

export default ZoomPanel;
