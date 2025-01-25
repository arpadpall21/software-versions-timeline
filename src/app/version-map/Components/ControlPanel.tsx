import { useState, useEffect } from 'react';

interface Props {
  zoomLevel: number;
}

const ControlPanel: React.FC<Props> = ({ zoomLevel }) => {
  const [scrollLock, setScrollLock] = useState<boolean>(false);

  console.log(scrollLock)

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
