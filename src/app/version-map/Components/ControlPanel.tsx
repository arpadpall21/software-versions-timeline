import { useEffect } from 'react';

interface Props {
  zoomLevel: number;
  scrollLock: boolean;
  setScrollLock: (scrollLock: boolean) => void;
}

const ControlPanel: React.FC<Props> = ({ zoomLevel, scrollLock, setScrollLock }) => {

  useEffect(() => {
    if (scrollLock) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';
  }, [scrollLock]);

  return (
    <div>
      <p>{zoomLevel.toPrecision(3)}</p>
      <button style={{ backgroundColor: scrollLock ? 'red' : '' }} onClick={() => setScrollLock(!scrollLock)}> Scroll Zoom Enabled </button>
    </div>
  );
};

export default ControlPanel;
