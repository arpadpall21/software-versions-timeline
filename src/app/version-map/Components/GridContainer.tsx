'use client';

import { useState } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { calcMonthsUpToCurrent } from '@/misc/helpers';
import { type Month } from '@/misc/types';

const GridContainer: React.FC = () => {
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(calcMonthsUpToCurrent(2023, 6));

  return (
    <>
      <div className={'my-7'}>
        <Button text={'2024'} />
        <Button text={'2025'} />
        <Button text={'Latest'} pop={true}/>
      </div>
      <GridFrame displayedMonths={displayedMonths} setDisplayedMonths={setdisplayedMonths} />
    </>
  );
};

export default GridContainer;
