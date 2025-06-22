import { useContext, useRef, type RefObject } from 'react';
import { GridContainerContext } from '@/app/version-map/Components/GridContainer';
import appConfig from '../../../../config/appConfig';

interface Props {
  height: number;
}

const AddNewTimelineButton: React.FC<Props> = ({ height }) => {
  const {  } = useContext(GridContainerContext);

  const dropdownRef: RefObject<null> = useRef(null);

  function handleDropdown() {
    const dropdownElement: HTMLSelectElement | null = dropdownRef.current;
    if (dropdownElement) {
      dropdownRef.current.click();
      console.log(dropdownElement)
      
      // setDropdownVisible(true);
      
      // dropdownElement.dispatchEvent(new Event('change'))
    }
    
    
  }

  return (
    <select
      className={`flex w-full text-center font-semibold text-btnFg dark:text-btnFgD bg-btnBg dark:bg-btnBgD
        border-2 border-borPri dark:border-borPriD
        hover:cursor-pointer  hover:bg-btnBgHov dark:hover:bg-btnBgHovD`}
      style={{ height }}
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
