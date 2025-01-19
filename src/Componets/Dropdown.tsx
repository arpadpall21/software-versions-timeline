interface Props {
  selectedItem: string;
  optionItems: [string, string][]; // [attrValue, value]
  dropdownHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  title?: string;
}

const Dropdown: React.FC<Props> = ({ selectedItem, optionItems, dropdownHandler, title }) => {
  return (
    <div>
      {title && <p>{title}</p>}
      <select value={selectedItem} onChange={dropdownHandler}>
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
