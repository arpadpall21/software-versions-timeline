'use client';

import { useState, useEffect, createContext } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { calcMonthRange, getYearRange, calcDisplayableDateLimit } from '@/misc/helpers';
import { type Month, type FeCache, type DisplayedSoftwares, type DisplayableDateLimit, Software } from '@/misc/types';
import { getVersionHistory } from '@/app/version-map/action';
import store from '@/misc/store';
import appConfig from '../../../../config/appConfig';

const today: Date = new Date();
const currentYear: number = today.getFullYear();

const extendDisplayableMonthRange = appConfig.extendDisplayableMonthRange;
const nrOfmonthsToRender: number = 20; // TODO: fine grain this when finegraining the zoom

export const GridContainerContext = createContext<{
  feCache: FeCache;
  fetchLoading: boolean;
  setDisplayedSoftwares: React.Dispatch<React.SetStateAction<DisplayedSoftwares>>;
}>({
  feCache: {},
  fetchLoading: true,
  setDisplayedSoftwares: () => {},
});

const GridContainer: React.FC = () => {
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(calcMonthRange(today, nrOfmonthsToRender));
  const [displayedSoftwares, setDisplayedSoftwares] = useState<DisplayedSoftwares>([]);
  const [displayedYearButtons, setDisplayedYearButtons] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedSoftwareByUser, setSelectedSoftwareByUser] = useState<Software>();
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
      setdisplayedMonths(calcMonthRange(newestDate, nrOfmonthsToRender, newDisplayableDateLimit));
      setSelectedYear(newestDate.getFullYear());
    }
  }, [displayedSoftwares, feCache]);

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (displayableDateLimit) {
      const selectedYear: number = e.currentTarget.textContent
        ? Number.parseInt(e.currentTarget.textContent)
        : currentYear;
      setSelectedYear(selectedYear);
      setdisplayedMonths(calcMonthRange(new Date(selectedYear, 11), nrOfmonthsToRender, displayableDateLimit));
    }
  }

  return (
    <GridContainerContext.Provider value={{ feCache, fetchLoading, setDisplayedSoftwares }}>
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
        displayedMonths={displayedMonths}
        setDisplayedMonths={setdisplayedMonths}
      />
    </GridContainerContext.Provider>
  );
};

export default GridContainer;
