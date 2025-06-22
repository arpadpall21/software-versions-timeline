import { useContext } from 'react';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import appConfig from '../../../../config/appConfig';

interface Props {
  height: number;
}

const AddNewTimelineButton: React.FC<Props> = ({ height }) => {
  const {  } = useContext(GridContainerContext);

  return (
    <div className={'bg-red-300'} style={{ height }}>
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
