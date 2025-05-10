'use client';

import { useState, createContext, useEffect } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { defaultDisplayedSoftwares, calcMonthRange, getYearRange, calcDisplayableDateLimit } from '@/misc/helpers';
import { type Month, type FeCache, type DisplayedSoftwares, type DisplayableDateLimit } from '@/misc/types';
import store from '@/misc/store';

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;

const nrOfmonthsToRender: number = 18; // TODO: fine grain this when finegraining the zoom

export const FeCacheContext = createContext<{
  feCache: FeCache;
  setFeCache: React.Dispatch<React.SetStateAction<FeCache>>;
}>({ feCache: {}, setFeCache: () => {} });

const GridContainer: React.FC = () => {
  const [feCache, setFeCache] = useState<FeCache>({});
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(
    calcMonthRange({ year: currentYear, month: currentMonth }, nrOfmonthsToRender),
  );
  const [displayedSoftwares, setDisplayedSoftwares] = useState<DisplayedSoftwares>(defaultDisplayedSoftwares);
  const [displayedYearButtons, setDisplayedYearButtons] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [displayableDateLimit, setDisplayablDateLimit] = useState<DisplayableDateLimit>({
    newestDate: today,
    oldestDate: new Date(today.setFullYear(-3)),
  });

  useEffect(() => setDisplayedSoftwares(store.getDisplayedSoftwares()), []);

  useEffect(() => {
    setDisplayablDateLimit(calcDisplayableDateLimit(displayedSoftwares, feCache));
  }, [displayedSoftwares, feCache]);

  useEffect(() => {
    if (displayableDateLimit) {
      const { newestDate } = displayableDateLimit;
      setDisplayedYearButtons(getYearRange(displayableDateLimit));
      setdisplayedMonths(
        calcMonthRange({ year: newestDate.getFullYear(), month: newestDate.getMonth() + 2 }, nrOfmonthsToRender),
      );
      setSelectedYear(newestDate.getFullYear());
    }
  }, [displayableDateLimit]);

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    const { newestDate } = displayableDateLimit;
    const selectedYear: number = e.currentTarget.textContent
      ? Number.parseInt(e.currentTarget.textContent)
      : currentYear;
    setSelectedYear(selectedYear);
    setdisplayedMonths(
      calcMonthRange(
        { year: selectedYear, month: selectedYear === newestDate.getFullYear() ? newestDate.getMonth() + 2 : 12 },
        nrOfmonthsToRender,
      ),
    );
  }

  return (
    <FeCacheContext.Provider value={{ feCache, setFeCache }}>
      <div className={'h-12 mt-7 overflow-auto whitespace-nowrap'} style={{ direction: 'rtl' }}>
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
