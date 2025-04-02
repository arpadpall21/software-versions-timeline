'use client';

import { type Months } from '@/misc/types';
import { useTranslations } from 'next-intl';

interface Props {
  months: Months;
}

const MonthsGrid: React.FC<Props> = ({ months }) => {
  const t = useTranslations('components.monthsGrid.months');

  return (
    <div className={'flex bg-blue-50 h-[60px]'}>
      {months.map((month) => {
        return (
          <div className={'border-l border-b border-borPri h-full w-[50px]'} key={month.yearMonth}>
            <p className={'text-center text-fgSec dark:text-fgSecD'}> {t(month.monthName)} </p>
            {month.monthName === 'jan' && (
              <p className={'text-center text-fgSec dark:text-fgSecD'}> {month.yearMonth.slice(0, 4)} </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MonthsGrid;
