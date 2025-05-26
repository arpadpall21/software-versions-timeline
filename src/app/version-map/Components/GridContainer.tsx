'use client';

import { useState, useEffect, createContext } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { calcMonthRange, getYearRange, calcDisplayableDateLimit, calcNrOfGridCellsToRender } from '@/misc/helpers';
import { type Months, type FeCache, type DisplayedSoftwares, type DisplayableDateLimit } from '@/misc/types';
import { getVersionHistory } from '@/app/version-map/action';
import store from '@/misc/store';
import appConfig from '../../../../config/appConfig';
import { Software } from '../../../../config/supportedSoftwares';
import tailwindConfig from '../../../../tailwind.config';

const today: Date = new Date();
const currentYear: number = today.getFullYear();
const extendDisplayableMonthRange = appConfig.extendDisplayableMonthRange;
const gridCellWidth: number = Number.parseInt(tailwindConfig.theme.extend.spacing.gridCellW);

export const GridContainerContext = createContext<{
  feCache: FeCache;
  fetchLoading: boolean;
  displayedSoftwares: DisplayedSoftwares;
  setDisplayedSoftwares: React.Dispatch<React.SetStateAction<DisplayedSoftwares>>;
  displayedMonths: Months;
  setDisplayedMonths: React.Dispatch<React.SetStateAction<Months>>;
  setSelectedSoftwareByUser: React.Dispatch<React.SetStateAction<Software | undefined>>;
  displayableDateLimit: DisplayableDateLimit | undefined;
  gridOffset: number;
  setGridOffset: React.Dispatch<React.SetStateAction<number>>;
}>({
  feCache: {},
  fetchLoading: true,
  displayedSoftwares: [],
  setDisplayedSoftwares: () => {},
  displayedMonths: [],
  setDisplayedMonths: () => {},
  setSelectedSoftwareByUser: () => {},
  displayableDateLimit: undefined,
  gridOffset: 0,
  setGridOffset: () => {},
});

const GridContainer: React.FC = () => {
  const [displayedMonths, setDisplayedMonths] = useState<Months>([]);
  const [displayedSoftwares, setDisplayedSoftwares] = useState<DisplayedSoftwares>([]);
  const [displayedYearButtons, setDisplayedYearButtons] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedSoftwareByUser, setSelectedSoftwareByUser] = useState<Software>();
  const [displayableDateLimit, setDisplayablDateLimit] = useState<DisplayableDateLimit>();
  const [feCache, setFeCache] = useState<FeCache>({});
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [gridOffset, setGridOffset] = useState<number>(0 - gridCellWidth * appConfig.standByMonths.right);

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
      let { newestDate: latestDate } = newDisplayableDateLimit;
      if (selectedSoftwareByUser && feCache[selectedSoftwareByUser]?.newestDate) {
        latestDate = feCache[selectedSoftwareByUser].newestDate;
      }
      setDisplayedYearButtons(getYearRange(newDisplayableDateLimit));
      setDisplayablDateLimit(newDisplayableDateLimit);
      setDisplayedMonths(
        calcMonthRange(latestDate, calcNrOfGridCellsToRender(gridCellWidth), newDisplayableDateLimit, 1),
      );
      setSelectedYear(latestDate.getFullYear());
    }
  }, [displayedSoftwares, feCache, selectedSoftwareByUser]);

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (displayableDateLimit) {
      const selectedYear: number = e.currentTarget.textContent
        ? Number.parseInt(e.currentTarget.textContent)
        : currentYear;
      setSelectedYear(selectedYear);
      setDisplayedMonths(
        calcMonthRange(new Date(selectedYear, 11), calcNrOfGridCellsToRender(gridCellWidth), displayableDateLimit),
      );
    }
  }

  return (
    <GridContainerContext.Provider
      value={{
        feCache,
        fetchLoading,
        displayedSoftwares,
        setDisplayedSoftwares,
        displayedMonths,
        setDisplayedMonths,
        setSelectedSoftwareByUser,
        displayableDateLimit,
        gridOffset,
        setGridOffset,
      }}
    >
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
      <GridFrame />
    </GridContainerContext.Provider>
  );
};

export default GridContainer;
