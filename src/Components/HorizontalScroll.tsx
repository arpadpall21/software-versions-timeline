'use client';

import { useState } from 'react';

interface Props {
  members: React.ReactNode[];
  scrollLeftButton: React.ReactNode;
  scrollRigthButton: React.ReactNode;
  direction?: 'ltr' | 'rtl';
}

const HorizontalScroll: React.FC<Props> = ({ members, scrollLeftButton, scrollRigthButton, direction = 'ltr' }) => {
  return (
    <div className={'whitespace-nowrap'} style={{ direction }}>
      {direction === 'rtl' ? [...members].reverse() : members}
    </div>
  )
};

export default HorizontalScroll;
