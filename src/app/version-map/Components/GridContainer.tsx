'use client';

import { useState } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { calcMonthsUpToCurrent, getYearRange } from '@/misc/helpers';
import { type Month } from '@/misc/types';

const defaultYearRange: string[] = getYearRange('current');

const GridContainer: React.FC = () => {
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(calcMonthsUpToCurrent(2023, 6));
  const [yearRange, setYearRange] = useState<string[]>(defaultYearRange);
  const [selectedYear, setSelectedyear] = useState<string>(defaultYearRange[0]);

  return (
    <>
      <div className={'my-7 overflow-hidden whitespace-nowrap'} style={{ direction: 'rtl' }}>
        {yearRange.map((year) => (
          <Button text={year} pop={year === selectedYear} key={year} />
        ))}
      </div>
      <GridFrame displayedMonths={displayedMonths} setDisplayedMonths={setdisplayedMonths} />
    </>
  );
};

export default GridContainer;
