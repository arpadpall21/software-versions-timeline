import { useContext, useMemo } from 'react';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import appConfig from '../../../../config/appConfig';
import { calcPercentOf } from '@/misc/helpers';

const defaultZoomLevel = appConfig.zoom.defaultLevel;

interface Props {
  height: number;
}

const AddNewTimelineButton: React.FC<Props> = ({ height }) => {
  const { zoomLevel } = useContext(GridContainerContext);

  const scaleDropdownY = useMemo(() => calcPercentOf(defaultZoomLevel, zoomLevel) / 100, [zoomLevel]);





  function handleDropdown() {
    
    
  }

  if (zoomLevel > defaultZoomLevel) {
    return <div style={{ height }} />;
  }

  return (
    <select
      className={`top-0
        w-full text-center font-semibold text-btnFg dark:text-btnFgD bg-btnBg dark:bg-btnBgD
        border-2 border-borPri dark:border-borPriD
        hover:cursor-pointer hover:bg-btnBgHov dark:hover:bg-btnBgHovD`}
      style={{ height, transform: `scaleY(${scaleDropdownY})`, marginTop: 0 }}
      value={'+'}
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
