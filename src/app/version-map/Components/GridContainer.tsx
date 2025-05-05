'use client';

import { useState } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { calcMonthRange, calcYearRange } from '@/misc/helpers';
import { type Month } from '@/misc/types';
import appConfig from '../../../../config/appConfig';

const defaultYearRange: number[] = calcYearRange('current');
const maxYearsRight: number = 6;

const GridContainer: React.FC = () => {
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(calcMonthRange({ year: 2015, month: 1 }, 'current'));
  const [yearRange, setYearRange] = useState<number[]>(defaultYearRange);
  const [selectedYear, setSelectedYear] = useState<number>(defaultYearRange[0]);

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    const selectedYear: number = e.currentTarget.textContent
      ? Number.parseInt(e.currentTarget.textContent)
      : defaultYearRange[0];
    setSelectedYear(selectedYear);
    setYearRange(calcYearRange(Math.min(selectedYear + maxYearsRight, appConfig.newestYear)));
    setdisplayedMonths(calcMonthRange({ year: selectedYear, month: 1 }, { year: selectedYear, month: 12 }));
  }

  return (
    <>
      <div className={'my-7 overflow-hidden whitespace-nowrap'} style={{ direction: 'rtl' }}>
        {yearRange.map((year) => (
          <Button
            text={year.toString()}
            width={70}
            pop={year === selectedYear}
            handleClick={handleButtonClick}
            key={year}
          />
        ))}
      </div>
      <GridFrame displayedMonths={displayedMonths} setDisplayedMonths={setdisplayedMonths} />
    </>
  );
};

export default GridContainer;
