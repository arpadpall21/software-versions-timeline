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

    const displayedSoftwaresClone: DisplayedSoftwares = [...displayedSoftwares];
    const selectedSoftware: Software = e.target.value as Software;
    displayedSoftwaresClone.push(selectedSoftware);

    setSelectedSoftwareByUser(selectedSoftware);
    setDisplayedSoftwares(displayedSoftwaresClone);
    store.setDisplayedSoftwares(displayedSoftwaresClone);
  }

  return (
    <div className={'relative w-[70px]'} style={{ height }}>
      <div
        className={`absolute flex btn dark:btnD w-full text-center font-bold rounded-none dark:rounded-none`}
        style={{ height }}
      >
        <span className={'m-auto'}> + </span>
      </div>
      <select
        className={`absolute opacity-0 hover:cursor-pointer`}
        style={{ height }}
        title={tButton('addTimeline')}
        onChange={handleDropdown}
      >
        {Object.entries(appConfig.supportedSoftwares).map(([software, supportedSoftware], i) => (
          <option value={software} key={i}>
            {supportedSoftware.displayName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddNewTimelineButton;
