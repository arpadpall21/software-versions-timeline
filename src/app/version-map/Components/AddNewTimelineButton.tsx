import { useContext } from 'react';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import appConfig from '../../../../config/appConfig';
import { Software } from '../../../../config/supportedSoftwares';
import { type DisplayedSoftwares } from '@/misc/types';
import store from '@/misc/store';
import { useTranslations } from 'next-intl';

interface Props {
  height: number;
}

const AddNewTimelineButton: React.FC<Props> = ({ height }) => {
  const { showPopUpBox, displayedSoftwares, setDisplayedSoftwares, setSelectedSoftwareByUser } =
    useContext(GridContainerContext);

  const tButton = useTranslations('components.addNewTimelineButton');
  const tPopUpBox = useTranslations('components.popUpBox.messages');

  function handleDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    if (displayedSoftwares.length >= appConfig.timelineDisplayLimit.max) {
      showPopUpBox(
        tPopUpBox('timelineDisplayMaxLimit', { maxTimelineDisplayLimit: appConfig.timelineDisplayLimit.max }),
        5000,
      );
      return;
    }

    if (e.target.value === 'notSelected') {
      return;
    }

    const displayedSoftwaresClone: DisplayedSoftwares = [...displayedSoftwares];
    const selectedSoftware: Software = e.target.value as Software;
    displayedSoftwaresClone.push(selectedSoftware);

    setSelectedSoftwareByUser(selectedSoftware);
    setDisplayedSoftwares(displayedSoftwaresClone);
    store.setDisplayedSoftwares(displayedSoftwaresClone);
  }

  return (
    <div className={'relative w-full'} style={{ height }}>
      <select
        className={`absolute peer opacity-0 z-10 hover:cursor-pointer`}
        value={'notSelected'}
        style={{ height }}
        title={tButton('addTimeline')}
        tabIndex={-1}
        onChange={handleDropdown}
      >
        <option value={'notSelected'}>[Not Selected]</option>
        {Object.entries(appConfig.supportedSoftwares)
          .sort()
          .map(([software, supportedSoftware], i) => (
            <option value={software} key={i}>
              {supportedSoftware.displayName}
            </option>
          ))}
      </select>
      <div
        className={`absolute flex btn dark:btnD w-full text-center font-bold rounded-none dark:rounded-none
          peer-hover:bg-btnBgHov peer-hover:dark:bg-btnBgHovD`}
        style={{ height }}
        tabIndex={0}
      >
        <span className={'m-auto'}> + </span>
      </div>
    </div>
  );
};

export default AddNewTimelineButton;
