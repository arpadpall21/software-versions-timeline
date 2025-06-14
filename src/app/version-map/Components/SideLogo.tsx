'use client';

import { useContext, useMemo } from 'react';
import Image from 'next/image';
import { calcPercentOf } from '@/misc/helpers';
import appConfig from '../../../../config/appConfig';
import { type DisplayedSoftwares } from '@/misc/types';
import store from '@/misc/store';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import { Software } from '../../../../config/supportedSoftwares';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  zoomLevel: number;
  twStyle: string;
  software: Software;
  idx: number;
}

const Logo: React.FC<Props> = ({ zoomLevel, twStyle, software, idx }) => {
  const { logoPath, displayName } = appConfig.supportedSoftwares[software];
  const { displayedSoftwares, setDisplayedSoftwares, setSelectedSoftwareByUser } = useContext(GridContainerContext);

  const { scaleLogoX, scaleLogoY, scaleDropdownX, scaleDropdownY, bottomSpaceDropdown } = useMemo(() => {
    return {
      scaleLogoX: zoomLevel < defaultZoomLevel ? zoomLevel : defaultZoomLevel,
      scaleLogoY: zoomLevel <= defaultZoomLevel ? defaultZoomLevel : calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
      scaleDropdownX: 1,
      scaleDropdownY: calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
      bottomSpaceDropdown: zoomLevel >= defaultZoomLevel ? 2 * zoomLevel : 6 / zoomLevel,
    };
  }, [zoomLevel]);

  function handleDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    const displayedSoftwaresClone: DisplayedSoftwares = [...displayedSoftwares];
    const selectedSoftware: Software = e.target.value as Software;
    displayedSoftwaresClone[idx] = selectedSoftware;

    store.setDisplayedSoftwares(displayedSoftwaresClone);
    setDisplayedSoftwares(displayedSoftwaresClone);
    setSelectedSoftwareByUser(selectedSoftware);
  }

  return (
    <div className={`flex h-[100px] ${twStyle}`}>
      <div className={'relative w-[70px] h-[70px] m-auto'}>
        <select
          className={`absolute w-[18px] right-[5px] z-10
            rounded-sm border border-borPri dark:border-borPriD
            text-btnFg dark:text-btnFgD bg-btnBg dark:bg-btnBgD
            outline-8 focus:outline-foc focus:dark:outline-focD sm:has-[:focus]:outline
            hover:cursor-pointer hover:bg-btnBgHov dark:hover:hover:bg-btnBgHovD
          `}
          style={{ bottom: bottomSpaceDropdown, transform: `scaleX(${scaleDropdownX}) scaleY(${scaleDropdownY})` }}
          value={software}
          onChange={handleDropdown}
        >
          {Object.entries(appConfig.supportedSoftwares).map(([software, supportedSoftware], i) => (
            <option value={software} key={i}>
              {supportedSoftware.displayName}
            </option>
          ))}
        </select>
        <a
          className={'absolute bottom-1 right-1 smoothTransform'}
          style={{ transform: `scaleX(${scaleLogoX}) scaleY(${scaleLogoY})` }}
          href={appConfig.supportedSoftwares[software].source}
          target="_blank"
        >
          <Image src={logoPath} width={60} height={60} alt={displayName} title={displayName} />
        </a>
      </div>
    </div>
  );
};

export default Logo;
