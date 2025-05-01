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
  twStyle: string;
}

const Logo: React.FC<Props> = ({ zoomLevel, software, twStyle }) => {
  const { logoPath, displayName } = appConfig.supportedSoftwares[software];

  const { scaleLogoX, scaleLogoY } = useMemo(() => {
    return {
      scaleLogoX: zoomLevel < defaultZoomLevel ? zoomLevel : defaultZoomLevel,
      scaleLogoY: zoomLevel <= defaultZoomLevel ? defaultZoomLevel : calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
    };
  }, [zoomLevel]);

  return (
    <div className={`relative h-[100px] ${twStyle}`}>
      <select
        className={`absolute w-[18px] top-0 right-0 z-10 hover:cursor-pointer
          bg-bgPri dark:bg-bgPriD text-fgPop  dark:text-fgPopD
          border border-borPri dark:border-borPriD`}
      >
        {Object.values(appConfig.supportedSoftwares).map((s, i) => (
          <option value={appConfig.supportedSoftwares[software].displayName} key={i}>
            {s.displayName}
          </option>
        ))}
      </select>
      <div
        className={'absolute bottom-1 right-1 smoothTransform'}
        style={{ transform: `scaleX(${scaleLogoX}) scaleY(${scaleLogoY})` }}
      >
        <Image src={logoPath} width={60} height={60} alt={displayName} title={displayName} />
      </div>
    </div>
  );
};

export default Logo;
