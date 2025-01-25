'use client';

import '@/app/globals.css';
import { useState } from 'react';






const Home = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  }

  function mouseDownHandler(e: React.MouseEvent) {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }

  function mouseUpHandler() {
    setIsDragging(false);
  }


  return (
    <>
      <div
        className={'border-2 border-black h-[700px]'}
        onMouseMove={handleMouseMove}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseLeave={mouseUpHandler}
        // onTouchStart={mouseDownHandler}
        // onTouchEnd={mouseUpHandler}
      >
        <div className={'border border-green-500 h-[300px] w-[300px]'} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
          <p> Hello World! </p>
          <p> Hello World! </p>
          <p> Hello World! </p>
          <p> Hello World! </p>
        </div>
      </div>
      
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Home;
