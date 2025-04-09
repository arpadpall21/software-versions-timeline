'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Software } from '@/misc/types';
import { calcPercentOf } from '@/misc/helpers';
import appConfig from '../../../../config/appConfig';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  software: Software;
}

const SideLogo: React.FC<Props> = ({ zoomLevel, software }) => {
  const { logoPath, displayName } = appConfig.supportedSoftwares[software];

  const imageScaleY = useMemo(() => calcPercentOf(defaultZoomLevel, zoomLevel) / 100, [zoomLevel])

  return (
    <div className={'flex h-[100px] bg-gridBg dark:bg-gridBgD'}>
      <div className={'m-auto smoothTransform'} style={{ transform: `scaleY(${imageScaleY})` }}>
        <Image src={logoPath} width={80} height={80} alt={displayName} title={displayName} />
      </div>
    </div>
  );
};

export default SideLogo;
