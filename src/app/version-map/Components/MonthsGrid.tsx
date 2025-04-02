'use client';

import { type Months } from '@/misc/types';
import { useTranslations } from 'next-intl';

interface Props {
  months: Months;
}

const MonthsGrid: React.FC<Props> = ({ months }) => {
  const t = useTranslations('components.monthsGrid.months');

  return (
    <div className={'flex bg-gridBg dark:bg-gridBgD h-[60px]'}>
      {months.map((month) => {
        return (
          <div className={'border-l border-gridBor dark:border-gridBorD h-full w-[50px]'} key={month.yearMonth}>
            <p className={'text-center text-gridFg dark:text-gridFgD'}> {t(month.monthName)} </p>
            {month.monthName === 'jan' && (
              <p className={'text-center text-gridFg dark:text-gridFgD'}> {month.yearMonth.slice(0, 4)} </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MonthsGrid;
