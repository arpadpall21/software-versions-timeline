'use client';

import { useContext, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import appConfig from '../../../../config/appConfig';
import { calcPercentOf } from '@/misc/helpers';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  height?: number;
  gridOnly?: boolean;
}

const MonthsTimeline: React.FC<Props> = ({ zoomLevel, height = 60, gridOnly }) => {
  const { displayedMonths } = useContext(GridContainerContext);
  const t = useTranslations('components.monthsGrid.months');

  const { scaleTextX, scaleTextY } = useMemo(() => {
    if (!gridOnly) {
      return {
        scaleTextX: zoomLevel <= defaultZoomLevel ? defaultZoomLevel : calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
        scaleTextY: zoomLevel < defaultZoomLevel ? zoomLevel : defaultZoomLevel,
      };
    } else {
      return { scaleTextX: 0, scaleTextY: 0 };
    }
  }, [gridOnly, zoomLevel]);

  return (
    <div className={'flex bg-gridBg dark:bg-gridBgD'} style={{ height }}>
      {displayedMonths.map((month) => {
        return (
          <div
            className={'text-center top-0 border-gridBor dark:border-gridBorD h-full w-gridCellW'}
            style={{ borderLeftWidth: month.monthName === 'jan' ? 3 : 1 }}
            key={month.yearMonth}
          >
            {!gridOnly && (
              <div className={'smoothTransform'} style={{ transform: `scaleX(${scaleTextX}) scaleY(${scaleTextY})` }}>
                <p className={'text-gridFg dark:text-gridFgD'}>{t(month.monthName)}</p>
                <p className={'opacity-50 text-gridFg dark:text-gridFgD'}>{month.yearMonth.slice(0, 4)} </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MonthsTimeline;
