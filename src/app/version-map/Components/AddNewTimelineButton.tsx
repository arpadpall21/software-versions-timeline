import { useContext, useMemo } from 'react';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import appConfig from '../../../../config/appConfig';
import { calcPercentOf } from '@/misc/helpers';
import { Software } from '../../../../config/supportedSoftwares';
import { type DisplayedSoftwares } from '@/misc/types';
import store from '@/misc/store';
import { useTranslations } from 'next-intl';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  height: number;
}

const AddNewTimelineButton: React.FC<Props> = ({ height }) => {
  const { showPopUpBox, zoomLevel, displayedSoftwares, setDisplayedSoftwares, setSelectedSoftwareByUser } =
    useContext(GridContainerContext);

  const tButton = useTranslations('components.addNewTimelineButton');
  const tPopUpBox = useTranslations('components.popUpBox.messages');

  const scaleDropdownY = useMemo(() => calcPercentOf(defaultZoomLevel, zoomLevel) / 100, [zoomLevel]);

  function handleDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === '+') {
      return;
    }
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

  if (zoomLevel > defaultZoomLevel) {
    return <div style={{ height }} />;
  }

  return (
    <select
      className={`btn dark:btnD top-0 w-full text-center font-bold
        hover:cursor-pointer rounded-none dark:rounded-none border-[1px] dark:border-[1px]`}
      style={{ height, transform: `scaleY(${scaleDropdownY})`, marginTop: 0 }}
      value={'+'}
      title={tButton('addTimeline')}
      onChange={handleDropdown}
    >
      <option value={'+'}>+</option>
      {Object.entries(appConfig.supportedSoftwares).map(([software, supportedSoftware], i) => (
        <option value={software} key={i}>
          {supportedSoftware.displayName}
        </option>
      ))}
    </select>
  );
};

export default AddNewTimelineButton;
