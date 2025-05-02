'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Software } from '@/misc/types';
import { calcPercentOf } from '@/misc/helpers';
import appConfig from '../../../../config/appConfig';
import { type DisplayedSoftwares } from '@/misc/types';
import store from '@/misc/store';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  twStyle: string;
  software: Software;
  idx: number;
  displayedSoftwares: DisplayedSoftwares;
  setDisplayedSoftwares: React.Dispatch<React.SetStateAction<DisplayedSoftwares | undefined>>;
}

const Logo: React.FC<Props> = ({ zoomLevel, twStyle, software, idx, displayedSoftwares, setDisplayedSoftwares }) => {
  const { logoPath, displayName } = appConfig.supportedSoftwares[software];

  const { scaleLogoX, scaleLogoY } = useMemo(() => {
    return {
      scaleLogoX: zoomLevel < defaultZoomLevel ? zoomLevel : defaultZoomLevel,
      scaleLogoY: zoomLevel <= defaultZoomLevel ? defaultZoomLevel : calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
    };
  }, [zoomLevel]);

  function dropdownHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const displayedSoftwaresClone: DisplayedSoftwares = [...displayedSoftwares];
    displayedSoftwaresClone[idx] = e.target.value as Software;

    store.setDisplayedSoftwares(displayedSoftwaresClone);
    setDisplayedSoftwares(displayedSoftwaresClone);
  }

  return (
    <div className={`relative h-[100px] ${twStyle}`}>
      <select
        className={`w-[18px]  absolute bottom-[2px] right-[2px] z-10
          rounded-sm border border-borPri dark:border-borPriD
        bg-bgPri dark:bg-bgPriD text-fgPop dark:text-fgPopD
          outline-8 focus:outline-foc focus:dark:outline-focD sm:has-[:focus]:outline
          hover:cursor-pointer hover:bg-bgIntHover dark:hover:bg-bgIntHoverD
        `}
        value={software}
        onChange={dropdownHandler}
      >
        {Object.entries(appConfig.supportedSoftwares).map(([software, supportedSoftware], i) => (
          <option value={software} key={i}>
            {supportedSoftware.displayName}
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
