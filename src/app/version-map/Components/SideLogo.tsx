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

  const { scaleLogoX, scaleLogoY } = useMemo(() => {
    return {
      scaleLogoX: zoomLevel < defaultZoomLevel ? zoomLevel : defaultZoomLevel,
      scaleLogoY: zoomLevel <= defaultZoomLevel ? defaultZoomLevel : calcPercentOf(defaultZoomLevel, zoomLevel) / 100,
    };
  }, [zoomLevel]);

  function handleDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    const displayedSoftwaresClone: DisplayedSoftwares = [...displayedSoftwares];

    if (e.target.value === 'removeTimeline' && displayedSoftwares.length <= appConfig.timelineDisplayLimit.min) {
      showPopUpBox(
        tPopUpBox('timelineDisplayMinLimit', { minTimelineDisplayLimit: appConfig.timelineDisplayLimit.min }),
        5000,
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
        {zoomLevel === defaultZoomLevel && (
          <select
            className={`btn dark:btnD absolute w-[19px] h-[30px] right-[5px] top-0 z-10
              hover:cursor-pointer`}
            value={software}
            title={tSideLogo('dropDownTooltip')}
            onChange={handleDropdown}
          >
            <option value={'removeTimeline'}>{`[${tSideLogo('removeTimeline')}]`}</option>
            {Object.entries(appConfig.supportedSoftwares).map(([software, supportedSoftware], i) => (
              <option value={software} key={i}>
                {supportedSoftware.displayName}
              </option>
            ))}
          </select>
        )}
        <div
          className={'absolute bottom-1 right-1 smoothTransform'}
          style={{ transform: `scaleX(${scaleLogoX}) scaleY(${scaleLogoY})` }}
        >
          <Image src={logoPath} width={60} height={60} alt={displayName} title={displayName} />
        </div>
      </div>
    </div>
  );
};

export default SideLogo;
