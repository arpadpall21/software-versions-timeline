'use client';

import { useContext, useMemo } from 'react';
import Image from 'next/image';
import { calcPercentOf } from '@/misc/helpers';
import appConfig from '../../../../config/appConfig';
import { type DisplayedSoftwares } from '@/misc/types';
import store from '@/misc/store';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import { Software } from '../../../../config/supportedSoftwares';
import { useTranslations } from 'next-intl';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  twStyle: string;
  software: Software;
  idx: number;
}

const SideLogo: React.FC<Props> = ({ twStyle, software, idx }) => {
  const { logoPath, displayName } = appConfig.supportedSoftwares[software];
  const { showPopUpBox, zoomLevel, displayedSoftwares, setDisplayedSoftwares, setSelectedSoftwareByUser } =
    useContext(GridContainerContext);

  const tSideLogo = useTranslations('components.sideLogo');
  const tPopUpBox = useTranslations('components.popUpBox.messages');

  const { scaleLogoX, scaleLogoY, scaleDropdownY, bottomSpaceDropdown } = useMemo(() => {
    return {
      scaleLogoX: zoomLevel < defaultZoomLevel ? zoomLevel : defaultZoomLevel,
      scaleLogoY: zoomLevel <= defaultZoomLevel ? defaultZoomLevel : calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
      scaleDropdownY: calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
      bottomSpaceDropdown: zoomLevel >= defaultZoomLevel ? 2 * zoomLevel : 6 / zoomLevel,
    };
  }, [zoomLevel]);

  function handleDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    const displayedSoftwaresClone: DisplayedSoftwares = [...displayedSoftwares];

    if (e.target.value === 'removeTimeline' && displayedSoftwares.length <= appConfig.timelineDisplayLimit.min) {
      showPopUpBox(
        tPopUpBox('timelineDisplayMinLimit', { minTimelineDisplayLimit: appConfig.timelineDisplayLimit.min }),
      );
      return;
    } else if (e.target.value === 'removeTimeline') {
      displayedSoftwaresClone.splice(idx, 1);
    } else {
      const selectedSoftware: Software = e.target.value as Software;
      displayedSoftwaresClone[idx] = selectedSoftware;
      setSelectedSoftwareByUser(selectedSoftware);
    }

    setDisplayedSoftwares(displayedSoftwaresClone);
    store.setDisplayedSoftwares(displayedSoftwaresClone);
  }

  return (
    <div className={`flex h-[100px] ${twStyle}`}>
      <div className={'relative w-[70px] h-[70px] m-auto'}>
        <select
          className={`btn dark:btnD absolute w-[19px] right-[5px] z-10
            hover:cursor-pointer
          `}
          style={{ bottom: bottomSpaceDropdown, transform: `scaleY(${scaleDropdownY})` }}
          value={software}
          onChange={handleDropdown}
        >
          <option value={'removeTimeline'}>{`[${tSideLogo('removeTimeline')}]`}</option>
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

export default SideLogo;
