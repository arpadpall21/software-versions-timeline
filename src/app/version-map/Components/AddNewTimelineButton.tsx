import { useContext } from 'react';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import appConfig from '../../../../config/appConfig';

interface Props {
  height: number;
}

const AddNewTimelineButton: React.FC<Props> = ({ height }) => {
  const {  } = useContext(GridContainerContext);

  return (
    <div
      className={`flex w-full text-2xl font-semibold text-btnFg dark:text-btnFgD bg-btnBg dark:bg-btnBgD
        border-2 border-borPri dark:border-borPriD
        hover:cursor-pointer  hover:bg-btnBgHov dark:hover:bg-btnBgHovD`}
      style={{ height }}
    >
      <span className={'m-auto'}>+</span>
      <select className={'hidden'}>
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
