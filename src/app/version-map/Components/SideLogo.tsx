'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Software } from '@/misc/types';
import appConfig from '../../../../config/appConfig';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  software: Software;
}

const SideLogo: React.FC<Props> = ({ zoomLevel, software }) => {
  const { logoPath, displayName } = appConfig.supportedSoftwares[software];

  const logoScale = useMemo(() => (zoomLevel < defaultZoomLevel ? zoomLevel : defaultZoomLevel), [zoomLevel]);

  return (
    <div className={'smoothTransform'} style={{ transform: `scale(${logoScale})` }}>
      <Image src={logoPath} width={80} height={80} alt={displayName} title={displayName} />
    </div>
  );
};

export default SideLogo;
