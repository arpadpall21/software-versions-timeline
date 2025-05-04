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
        bg-bgSec dark:bg-bgSecD
        outline-2 outline-foc dark:outline-focD sm:has-[:focus]:outline`}
    >
      {title && <p className={'text-center text-fgSec dark:text-fgSecD bg-bgSec dark:bg-bgSecD'}>{title}</p>}
      <select
        className={`text-center w-full focus:outline-none
          text-btnFg dark:text-btnFgD bg-btnBg dark:bg-btnBgD
          hover:cursor-pointer hover:bg-btnBgHov dark:hover:bg-btnBgHovD`}
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
