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
      className={`
        border w-36 rounded-sm outline-2 outline-offset-4 outline-white has-[:focus]:outline 
        border-+lt-b-pri dark:border-+dk-b-pri
      `}
    >
      {title && (
        <p className={'text-center text-+lt-fg-sec bg-+lt-bg-sec dark:text-+dk-fg-sec dark:bg-+dk-bg-sec'}>{title}</p>
      )}
      <select
        className={
          'text-center w-full focus:outline-none bg-+lt-bg-pri text-+lt-fg-pop dark:bg-+dk-bg-pri dark:text-+dk-fg-pop'
        }
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
