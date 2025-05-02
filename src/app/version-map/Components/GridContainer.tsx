'use client';

import { useState } from 'react';
import GridFrame from '@/app/version-map/Components/GridFrame';
import { calcMonthsUpToCurrent } from '@/misc/helpers';
import { type Month } from '@/misc/types';

const GridContainer: React.FC = () => {
  const [displayedMonths, setdisplayedMonths] = useState<Month[]>(calcMonthsUpToCurrent(2023, 6));

  return <GridFrame displayedMonths={displayedMonths} setDisplayedMonths={setdisplayedMonths} />;
};

export default GridContainer;
