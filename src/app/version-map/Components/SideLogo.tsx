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

const logoDefaultSize: number = 90;

/**
 * no scale used because it unnecessarily distorts the logo
 */
const Logo: React.FC<Props> = ({ zoomLevel, software }) => {
  const { logoPath, displayName } = appConfig.supportedSoftwares[software];

  const logoScale = useMemo(() => {
    return zoomLevel < defaultZoomLevel ? zoomLevel * logoDefaultSize : logoDefaultSize;
  }, [zoomLevel]);

  return (
    <div
      className={'relative bg-gridBg dark:bg-gridBgD'}
      style={{ height: zoomLevel * 100, transition: 'height 200ms ease' }}
    >
      <div className={'absolute bottom-0 right-0'}>
        <Image
          style={{ transition: 'height 200ms ease, width 200ms ease' }}
          src={logoPath}
          width={logoScale}
          height={logoScale}
          alt={displayName}
          title={displayName}
        />
      </div>
    </div>
  );
};

export default Logo;
