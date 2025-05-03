'use client';

import { useState } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import Button from '@/Components/Button';
import { calcMonthsUpToCurrent } from '@/misc/helpers';
import { type Month } from '@/misc/types';

const arr = [
  1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996,
  1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
  2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  2021, 2022, 2023, 2024, 2025, 'Latest'
]
arr.reverse()

const GridContainer: React.FC = () => {
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(calcMonthsUpToCurrent(2023, 6));

  return (
    <>
      <div className={'my-7 overflow-hidden whitespace-nowrap'} style={{ direction: 'rtl' }}>
        {arr.map((i) => <Button text={i.toString()} width={86} key={i}/> )}
      </div>
      <GridFrame displayedMonths={displayedMonths} setDisplayedMonths={setdisplayedMonths} />
    </>
  );
};

export default GridContainer;
