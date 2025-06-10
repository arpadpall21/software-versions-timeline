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
const originalGridCellWidth: number = Number.parseInt(tailwindConfig.theme.extend.spacing.gridCellW);
const defaultZoomLevel: number = appConfig.zoom.defaultLevel;

export const GridContainerContext = createContext<{
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  verticalScrollLock: boolean;
  setVerticalScrollLock: React.Dispatch<React.SetStateAction<boolean>>;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  gridCellWidth: number;
  setGridCellWidth: React.Dispatch<React.SetStateAction<number>>;
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
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}>({
  position: { x: 0, y: 0 },
  setPosition: () => {},
  zoomLevel: defaultZoomLevel,
  setZoomLevel: () => {},
  verticalScrollLock: true,
  setVerticalScrollLock: () => {},
  gridCellWidth: originalGridCellWidth,
  setGridCellWidth: () => {},
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
  setSelectedYear: () => {},
});

const GridContainer: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [verticalScrollLock, setVerticalScrollLock] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoomLevel);
  const [gridCellWidth, setGridCellWidth] = useState<number>(originalGridCellWidth);
  const [displayedMonths, setDisplayedMonths] = useState<Months>([]);
  const [displayedSoftwares, setDisplayedSoftwares] = useState<DisplayedSoftwares>([]);
  const [displayedYearButtons, setDisplayedYearButtons] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedSoftwareByUser, setSelectedSoftwareByUser] = useState<Software>();
  const [displayableDateLimit, setDisplayablDateLimit] = useState<DisplayableDateLimit>();
  const [feCache, setFeCache] = useState<FeCache>({});
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [gridOffset, setGridOffset] = useState<number>(0);

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
      if (selectedSoftwareByUser && feCache[selectedSoftwareByUser]?.newestDate) {
        const adjustedEndDate: Date = new Date(feCache[selectedSoftwareByUser].newestDate);
        adjustedEndDate.setMonth(adjustedEndDate.getMonth() + 1);

        setDisplayedMonths(
          calcMonthRange(adjustedEndDate, calcNrOfGridCellsToRender(originalGridCellWidth), newDisplayableDateLimit),
        );
        setPosition({ x: 0, y: 0 });
        setGridOffset(0);
        setZoomLevel(1);
        setGridCellWidth(originalGridCellWidth);
        setSelectedYear(feCache[selectedSoftwareByUser]?.newestDate.getFullYear());
      } else {
        setDisplayedMonths(
          calcMonthRange(
            newDisplayableDateLimit.newestDate,
            calcNrOfGridCellsToRender(gridCellWidth),
            newDisplayableDateLimit,
          ),
        );
      }

      setDisplayedYearButtons(getYearRange(newDisplayableDateLimit));
      setDisplayablDateLimit(newDisplayableDateLimit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedSoftwares, feCache, selectedSoftwareByUser]);

  function handleYearButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (displayableDateLimit) {
      const selectedYear: number = e.currentTarget.textContent
        ? Number.parseInt(e.currentTarget.textContent)
        : currentYear;

      if (selectedYear === currentYear) {
        setDisplayedMonths(
          calcMonthRange(new Date(selectedYear, 11), calcNrOfGridCellsToRender(gridCellWidth), displayableDateLimit),
        );
        setGridOffset(0);
      } else {
        setDisplayedMonths(
          calcMonthRange(
            new Date(selectedYear, 11 + appConfig.standByMonths.right),
            calcNrOfGridCellsToRender(gridCellWidth),
            displayableDateLimit,
          ),
        );
        setGridOffset(-(gridCellWidth * appConfig.standByMonths.right));
      }

      setSelectedYear(selectedYear);
      setPosition({ x: 0, y: position.y });
    }
  }

  return (
    <GridContainerContext.Provider
      value={{
        position,
        setPosition,
        verticalScrollLock,
        setVerticalScrollLock,
        zoomLevel,
        setZoomLevel,
        gridCellWidth,
        setGridCellWidth,
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
        setSelectedYear,
      }}
    >
      <div className={'h-12 mt-7 overflow-x-auto whitespace-nowrap'} style={{ direction: 'rtl' }}>
        {displayedYearButtons.map((year) => (
          <Button
            text={year.toString()}
            width={70}
            pop={year === selectedYear}
            handleClick={handleYearButtonClick}
            key={year}
          />
        ))}
      </div>
      <GridFrame />
    </GridContainerContext.Provider>
  );
};

export default GridContainer;
