'use client';

import { useState, useEffect } from 'react';

const minZoomLevel = 1;
const maxZoomLevel = 3;
const zoomSensitivity = 0.07;

const GridFrame: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [scrollZoom, setScrollZoom] = useState<boolean>(false);

  useEffect(() => {
    if (scrollZoom) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';
  }, [scrollZoom]);

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  }

  function mouseDownHandler(e: React.MouseEvent) {
    e.preventDefault()
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  function mouseUpHandler() {
    setIsDragging(false);
  }

  function wheelHandler(e: React.WheelEvent) {
    if (scrollZoom && e.deltaY > 0 && zoomLevel > minZoomLevel) {
      setZoomLevel(Math.max(zoomLevel - zoomSensitivity, minZoomLevel));
      return;
    }
    if (scrollZoom && e.deltaY < 0 && zoomLevel < maxZoomLevel) {
      setZoomLevel(Math.min(zoomLevel + zoomSensitivity, maxZoomLevel));
    }
  }

  return (
    <div
      className={'border-2 border-black h-[700px]'}
      onMouseMove={handleMouseMove}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseUpHandler}
      onWheel={wheelHandler}
      // onTouchStart={mouseDownHandler}
      // onTouchEnd={mouseUpHandler}
    >
      <div>
        <p>{zoomLevel.toPrecision(3)}</p>
        <button style={{ backgroundColor: scrollZoom ? 'red' : '' }} onClick={() => setScrollZoom(!scrollZoom)}> Scroll Zoom Enabled </button>
        <button className={'w-10 h-6 border-2 border-red-400'}> + </button>
        <button className={'w-10 h-6 border-2 border-red-400'}> - </button>
      </div>
    
    
      <div
        className={'border border-green-500 h-[300px] w-[300px]'}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <p> Hello World! </p>
        <p> Hello World! </p>
        <p> Hello World! </p>
        <p> Hello World! </p>
      </div>
    </div>
  )
}

export default GridFrame;
