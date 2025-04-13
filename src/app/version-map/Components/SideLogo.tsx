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

const Logo: React.FC<Props> = ({ zoomLevel, software }) => {
  const { logoPath, displayName } = appConfig.supportedSoftwares[software];

  const { scaleLogoX, scaleLogoY } = useMemo(() => {
    return {
      scaleLogoX: zoomLevel < defaultZoomLevel ? zoomLevel : defaultZoomLevel,
      scaleLogoY: zoomLevel <= defaultZoomLevel ? defaultZoomLevel : calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
    };
  }, [zoomLevel]);

  return (
    <div className={'relative h-[100px] bg-gridBg dark:bg-gridBgD'}>
      <div
        className={'absolute bottom-0 smoothTransform'}
        style={{ transform: `scaleX(${scaleLogoX}) scaleY(${scaleLogoY})` }}
      >
        <Image src={logoPath} width={80} height={80} alt={displayName} title={displayName} />
      </div>
    </div>
  );
};

export default Logo;
