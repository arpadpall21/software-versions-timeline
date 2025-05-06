'use client';

import { useState, createContext, useEffect } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { calcMonthRange, calcYearRange } from '@/misc/helpers';
import { type Month, type FeCache, type DisplayedSoftwares } from '@/misc/types';
import appConfig from '../../../../config/appConfig';
import store from '@/misc/store';

const defaultYearRange: number[] = calcYearRange('current');
const maxYearsRight: number = 6;
const today = new Date();
const currentYear = today.getFullYear();
const nextMonth = today.getMonth() + 2;

const monthsToRender: number = 18; // TODO: fine grain this when finegraining the zoom

export const FeCacheContext = createContext<{
  feCache: FeCache;
  setFeCache: React.Dispatch<React.SetStateAction<FeCache>>;
}>({ feCache: {}, setFeCache: () => {} });

const GridContainer: React.FC = () => {
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(
    calcMonthRange(currentYear, nextMonth, monthsToRender),
  );
  const [displayedYearButtons, setDisplayedYearButtons] = useState<number[]>(defaultYearRange);
  const [displayedSoftwares, setDisplayedSoftwares] = useState<DisplayedSoftwares>();
  const [selectedYear, setSelectedYear] = useState<number>(defaultYearRange[0]);
  const [feCache, setFeCache] = useState<FeCache>({});

  useEffect(() => setDisplayedSoftwares(store.getDisplayedSoftwares()), []);

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    const selectedYear: number = e.currentTarget.textContent
      ? Number.parseInt(e.currentTarget.textContent)
      : defaultYearRange[0];
    setSelectedYear(selectedYear);
    setDisplayedYearButtons(calcYearRange(Math.min(selectedYear + maxYearsRight, appConfig.newestYear)));
    setdisplayedMonths(calcMonthRange(selectedYear, selectedYear === currentYear ? nextMonth : 12, monthsToRender));
  }

  return (
    <FeCacheContext.Provider value={{ feCache, setFeCache }}>
      <div className={'my-7 overflow-hidden whitespace-nowrap'} style={{ direction: 'rtl' }}>
        {displayedYearButtons.map((year) => (
          <Button
            text={year.toString()}
            width={70}
            pop={year === selectedYear}
            handleClick={handleButtonClick}
            key={year}
          />
        ))}
      </div>
      <GridFrame
        displayedSoftwares={displayedSoftwares}
        setDisplayedSoftwares={setDisplayedSoftwares}
        displayedMonths={displayedMonths}
        setDisplayedMonths={setdisplayedMonths}
      />
    </FeCacheContext.Provider>
  );
};

export default GridContainer;
