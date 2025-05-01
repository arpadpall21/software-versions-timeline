'use client';

import '@/app/globals.css';

interface Props {
  selectedItem: string;
  optionItems: [string, string][]; // [attrValue, value]
  dropdownHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  title?: string;
}

const Dropdown: React.FC<Props> = ({ selectedItem, optionItems, dropdownHandler, title }) => {
  return (
    <div
      className={`border w-36 rounded-sm outline-2 outline-offset 
        outline-foc dark:outline-focD sm:has-[:focus]:outline border-borPri dark:border-borPriD`}
    >
      {title && <p className={'text-center text-fgSec bg-bgSec dark:text-fgSecD dark:bg-bgSecD'}>{title}</p>}
      <select
        className={`text-center w-full focus:outline-none bg-bgPri dark:bg-bgPriD text-fgPop  dark:text-fgPopD
          hover:cursor-pointer`}
        value={selectedItem}
        onChange={dropdownHandler}
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
