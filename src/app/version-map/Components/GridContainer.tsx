'use client';

import { useState } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { calcMonthsUpToCurrent, calcYearRange } from '@/misc/helpers';
import { type Month } from '@/misc/types';
import appConfig from '../../../../config/appConfig';

const defaultYearRange: string[] = calcYearRange('current');
const maxYearsRight: number = 6;

const GridContainer: React.FC = () => {
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(calcMonthsUpToCurrent(2023, 6));
  const [yearRange, setYearRange] = useState<string[]>(defaultYearRange);
  const [selectedYear, setSelectedYear] = useState<string>(defaultYearRange[0]);

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    const selectedYear = e.currentTarget.textContent ? e.currentTarget.textContent : defaultYearRange[0];
    setSelectedYear(selectedYear);
    setYearRange(calcYearRange(Math.min(Number.parseInt(selectedYear) + maxYearsRight, appConfig.newestYear)));
  }

  return (
    <>
      <div className={'my-7 overflow-hidden whitespace-nowrap'} style={{ direction: 'rtl' }}>
        {yearRange.map((year) => (
          <Button text={year} width={70} pop={year === selectedYear} handleClick={handleButtonClick} key={year} />
        ))}
      </div>
      <GridFrame displayedMonths={displayedMonths} setDisplayedMonths={setdisplayedMonths} />
    </>
  );
};

export default GridContainer;
