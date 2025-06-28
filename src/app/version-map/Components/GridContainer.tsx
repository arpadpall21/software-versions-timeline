'use client';

import { useState, useEffect, createContext } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import HorizontalScroll from '@/Components/HorizontalScroll';
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
  nrOfMonthsToRender: number;
  setNrOfMonthToRender: React.Dispatch<React.SetStateAction<number>>;
}>({
  position: { x: 0, y: 0 },
  setPosition: () => {},
  verticalScrollLock: true,
  setVerticalScrollLock: () => {},
  zoomLevel: defaultZoomLevel,
  setZoomLevel: () => {},
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
  nrOfMonthsToRender: 0,
  setNrOfMonthToRender: () => {},
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
  const [displayableDateLimit, setDisplayableDateLimit] = useState<DisplayableDateLimit>();
  const [nrOfMonthsToRender, setNrOfMonthToRender] = useState<number>(0);
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
          setDisplayableDateLimit(
            calcDisplayableDateLimit(displayedSoftwares, newFeCache, extendDisplayableMonthRange),
          );
          setFeCache(newFeCache);
        })
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedSoftwares]);

  useEffect(() => {
    const newDisplayableDateLimit = calcDisplayableDateLimit(displayedSoftwares, feCache, extendDisplayableMonthRange);
    if (newDisplayableDateLimit) {
      const nrOfMonthsToRender: number = calcNrOfGridCellsToRender(originalGridCellWidth);

      if (selectedSoftwareByUser && feCache[selectedSoftwareByUser]?.newestDate) {
        const adjustedEndDate: Date = new Date(feCache[selectedSoftwareByUser].newestDate);
        adjustedEndDate.setMonth(adjustedEndDate.getMonth() + 1);

        setDisplayedMonths(calcMonthRange(adjustedEndDate, nrOfMonthsToRender, newDisplayableDateLimit));
        setPosition({ x: 0, y: 0 });
        setGridOffset(0);
        setZoomLevel(1);
        setGridCellWidth(originalGridCellWidth);
        setSelectedYear(feCache[selectedSoftwareByUser]?.newestDate.getFullYear());
      } else {
        setDisplayedMonths(
          calcMonthRange(newDisplayableDateLimit.newestDate, nrOfMonthsToRender, newDisplayableDateLimit),
        );
      }

      setNrOfMonthToRender(nrOfMonthsToRender);
      setDisplayedYearButtons(getYearRange(newDisplayableDateLimit));
      setDisplayableDateLimit(newDisplayableDateLimit);
    }
  }, [displayedSoftwares, feCache, selectedSoftwareByUser]);

  function handleYearButtonClick(e: React.MouseEvent) {
    if (displayableDateLimit) {
      const selectedYear: number = e.currentTarget.textContent
        ? Number.parseInt(e.currentTarget.textContent)
        : currentYear;

      if (selectedYear === currentYear) {
        setDisplayedMonths(calcMonthRange(new Date(selectedYear, 11), nrOfMonthsToRender, displayableDateLimit));
        setGridOffset(0);
      } else {
        setDisplayedMonths(
          calcMonthRange(
            new Date(selectedYear, 11 + appConfig.standByMonths.right),
            nrOfMonthsToRender,
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
        nrOfMonthsToRender,
        setNrOfMonthToRender,
      }}
    >
      <div className={'mt-5 h-[500px]'}>
        <HorizontalScroll
          height={35}
          members={displayedYearButtons.map((year) => (
            <Button
              twStyle={'w-[70px] ml-[3px]'}
              text={year.toString()}
              pop={year === selectedYear}
              handleClick={handleYearButtonClick}
              key={year}
            />
          ))}
          scrollLeftButton={<Button text={'<'} twStyle={'px-3'}/>}
          scrollRightButton={<Button text={'>'} twStyle={'px-3'}/>}
          scrollSensitivity={150}
          direction={'ltr'}
        />
      </div>
      <GridFrame />
    </GridContainerContext.Provider>
  );
};

export default GridContainer;
