'use client';

import { type Months } from '@/misc/types';
import { useTranslations } from 'next-intl';
import appConfig from '../../../../config/appConfig';
import { calcPercentOf } from '@/misc/helpers';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  months: Months;
}

const MonthsGrid: React.FC<Props> = ({ zoomLevel, months }) => {
  const t = useTranslations('components.monthsGrid.months');

  const scaleTextX = zoomLevel <= defaultZoomLevel ? 1 : calcPercentOf(1, zoomLevel) / 100;
  const scaleTextY = zoomLevel < defaultZoomLevel ? zoomLevel : 1;

  return (
    <div className={'flex bg-gridBg dark:bg-gridBgD h-[60px]'}>
      {months.map((month) => {
        return (
          <div
            className={'text-center top-0 border-l border-gridBor dark:border-gridBorD h-full w-[50px]'}
            key={month.yearMonth}
          >
            <div style={{ transform: `scaleX(${scaleTextX}) scaleY(${scaleTextY})` }}>
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

export default MonthsGrid;
