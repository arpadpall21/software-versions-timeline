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
    const selectedSoftware: Software = e.target.value as Software;
    displayedSoftwaresClone[idx] = selectedSoftware;

    setSelectedSoftwareByUser(selectedSoftware);
    setDisplayedSoftwares(displayedSoftwaresClone);
    store.setDisplayedSoftwares(displayedSoftwaresClone);
  }

  function handleBinIconClick() {
    if (displayedSoftwares.length <= appConfig.timelineDisplayLimit.min) {
      showPopUpBox(
        tPopUpBox('timelineDisplayMinLimit', { minTimelineDisplayLimit: appConfig.timelineDisplayLimit.min }),
        5000,
      );
      return;
    }

    showPopUpBox(tPopUpBox('removeTimelineWarn', { timeline: appConfig.supportedSoftwares[software].displayName }), 0, {
      handleYesButtonClick() {
        const displayedSoftwaresClone: DisplayedSoftwares = [...displayedSoftwares];

        displayedSoftwaresClone.splice(idx, 1);
        setDisplayedSoftwares(displayedSoftwaresClone);
        store.setDisplayedSoftwares(displayedSoftwaresClone);
      },
      handleNoButtonClick() {},
    });
  }

  return (
    <div className={'group relative'}>
      <div className={`flex h-[100px] ${twStyle}`}>
        <div className={'smoothTransform m-auto'} style={{ transform: `scaleX(${scaleLogoX}) scaleY(${scaleLogoY})` }}>
          <Image src={logoPath} width={60} height={60} alt={displayName} title={displayName} />
        </div>
      </div>
      {zoomLevel === defaultZoomLevel && (
        <>
          <div
            className={`flex group-hover:visible md:invisible
              absolute top-2 right-2 w-[20px] h-[28px] py-[1px] rounded-sm text-center
              bg-btnBg dark:bg-btnBgD bg-opacity-50 dark:bg-opacity-70
              hover:cursor-pointer hover:bg-btnBgHov dark:hover:bg-btnBgHovD`}
            onClick={handleBinIconClick}
          >
            <p className={'m-auto'}> 🗑 </p>
          </div>
          <div className={`absolute btn dark:btnD h-[28px] w-[20px] z-10 right-2 bottom-2`}>
            <div className={`relative w-full h-full`}>
              <select
                className={`absolute w-full h-full peer opacity-0 z-10 hover:cursor-pointer`}
                title={tSideLogo('dropDownTooltip')}
                tabIndex={-1}
                onChange={handleDropdown}
              >
                {Object.entries(appConfig.supportedSoftwares).map(([software, supportedSoftware], i) => (
                  <option value={software} key={i}>
                    {supportedSoftware.displayName}
                  </option>
                ))}
              </select>
              <div
                className={`absolute flex w-full h-full text-center rounded-md
                  peer-hover:bg-btnBgHov peer-hover:dark:bg-btnBgHovD`}
                tabIndex={0}
              >
                <span className={'m-auto'}> &#709; </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideLogo;
