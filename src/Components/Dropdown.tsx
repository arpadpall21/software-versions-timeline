'use client';

import '@/app/globals.css';

interface Props {
  selectedItem: string;
  optionItems: [string, string][]; // [attrValue, value]
  handleDropdown?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  title?: string;
}

const Dropdown: React.FC<Props> = ({ selectedItem, optionItems, handleDropdown, title }) => {
  return (
    <div
      className={`w-36 border rounded-sm border-borPri dark:border-borPriD
        bg-bgSec dark:bg-bgSecD`}
    >
      {title && <p className={'text-center text-fgSec dark:text-fgSecD bg-bgSec dark:bg-bgSecD'}>{title}</p>}
      <select
        className={`btn dark:btnD text-center w-full focus:outline-none rounded-none dark:rounded-none
          hover:cursor-pointer border-[1px] dark:border-[1px]`}
        value={selectedItem}
        onChange={handleDropdown}
      >
        {optionItems.map(([attrValue, value]) => {
          return (
            <option value={attrValue} key={attrValue}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
