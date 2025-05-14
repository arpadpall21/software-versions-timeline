'use client';

import { useState, useEffect, createContext } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { calcMonthRange, getYearRange, calcDisplayableDateLimit, new__calcMonthRange } from '@/misc/helpers';
import { type Month, type FeCache, type DisplayedSoftwares, type DisplayableDateLimit } from '@/misc/types';
import { getVersionHistory } from '@/app/version-map/action';
import store from '@/misc/store';
import appConfig from '../../../../config/appConfig';

const today = new Date();
const currentYear = today.getFullYear();

const extendDisplayableMonthRange = appConfig.extendDisplayableMonthRange;
const nrOfmonthsToRender: number = 18; // TODO: fine grain this when finegraining the zoom

export const FeCacheContext = createContext<{ feCache: FeCache; fetchLoading: boolean }>({
  feCache: {},
  fetchLoading: true,
});

const GridContainer: React.FC = () => {
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(new__calcMonthRange(today, nrOfmonthsToRender));
  const [displayedSoftwares, setDisplayedSoftwares] = useState<DisplayedSoftwares>([]);
  const [displayedYearButtons, setDisplayedYearButtons] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [displayableDateLimit, setDisplayablDateLimit] = useState<DisplayableDateLimit>();
  const [feCache, setFeCache] = useState<FeCache>({});
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  useEffect(() => setDisplayedSoftwares(store.getDisplayedSoftwares()), []);

  useEffect(() => {
    const softwaresToFetch = displayedSoftwares.filter((software) => !feCache[software]);

    if (softwaresToFetch.length > 0) {
      setFetchLoading(true);
      getVersionHistory([...new Set(softwaresToFetch)])
        .then((res) => {
          const newFeCache: FeCache = { ...feCache, ...res };
          setFetchLoading(false);
          setDisplayablDateLimit(calcDisplayableDateLimit(displayedSoftwares, newFeCache, extendDisplayableMonthRange));
          setFeCache(newFeCache);
        })
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedSoftwares]);

  useEffect(() => {
    const newDisplayableDateLimit = calcDisplayableDateLimit(displayedSoftwares, feCache, extendDisplayableMonthRange);

    if (newDisplayableDateLimit) {
      const { newestDate } = newDisplayableDateLimit;
      setDisplayedYearButtons(getYearRange(newDisplayableDateLimit));
      setDisplayablDateLimit(newDisplayableDateLimit);
      setdisplayedMonths(
        new__calcMonthRange(newestDate, nrOfmonthsToRender, {
          dateLimit: newDisplayableDateLimit,
        }),
      );
      setSelectedYear(newestDate.getFullYear());
    }
  }, [displayedSoftwares, feCache]);

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (displayableDateLimit) {
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
  }

  return (
    <FeCacheContext.Provider value={{ feCache, fetchLoading }}>
      <div className={'h-12 mt-7 overflow-x-auto whitespace-nowrap'} style={{ direction: 'rtl' }}>
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
