'use client';

import { useMemo } from 'react';
import { type Month } from '@/misc/types';
import { useTranslations } from 'next-intl';
import appConfig from '../../../../config/appConfig';
import { calcPercentOf } from '@/misc/helpers';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  months: Month[];
}

const MonthsTimeline: React.FC<Props> = ({ zoomLevel, months }) => {
  const t = useTranslations('components.monthsGrid.months');

  const { scaleTextX, scaleTextY } = useMemo(() => {
    return {
      scaleTextX: zoomLevel <= defaultZoomLevel ? defaultZoomLevel : calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
      scaleTextY: zoomLevel < defaultZoomLevel ? zoomLevel : defaultZoomLevel,
    };
  }, [zoomLevel]);

  return (
    <div className={'flex bg-gridBg dark:bg-gridBgD h-[60px]'}>
      {months.map((month) => {
        return (
          <div
            className={'text-center top-0 border-gridBor dark:border-gridBorD h-full w-gridCellW'}
            style={{ borderLeftWidth: month.monthName === 'jan' ? 3 : 1 }}
            key={month.yearMonth}
          >
            <div className={'smoothTransform'} style={{ transform: `scaleX(${scaleTextX}) scaleY(${scaleTextY})` }}>
              <p className={'text-gridFg dark:text-gridFgD'}>{t(month.monthName)}</p>
              {month.monthName === 'jan' && (
                <p className={'text-gridFg dark:text-gridFgD'}>{month.yearMonth.slice(0, 4)} </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MonthsTimeline;
