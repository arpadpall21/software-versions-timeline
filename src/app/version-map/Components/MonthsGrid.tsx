'use client';

import { type Months } from '@/misc/types';

interface Props {
  months: Months;
}

const MonthsGrid: React.FC<Props> = ({ months }) => {
  return (
    <div className={'flex bg-blue-50 h-[50px]'}>
      {months.map((month) => {
        return (
          <div className={'border-l border-b border-borPri h-full w-[50px]'} key={month.yearMonth}>
            <p className={'text-center'}> {month.monthName} </p>
            {month.monthName === 'jan' && <p className={'text-center'}> {month.yearMonth.slice(0, 4)} </p>}
          </div>
        );
      })}
    </div>
  );
};

export default MonthsGrid;
