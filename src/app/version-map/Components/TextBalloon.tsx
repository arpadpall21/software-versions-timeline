'use client';

interface Props {
  text: string;
  textsSecondary: string[];
  backgroundColor?: string;
}
/*
 * Does not affect the layout (positioned absolute)
 * positioned (and slaled) relative to its middle bottom point
 */
const TextBallon: React.FC<Props> = ({ text, textsSecondary, backgroundColor = 'black' }) => {
  return (
    <div className={'group relative'}>
      <div
        className={`
          absolute bottom-[7px] left-1/2 transform -translate-x-1/2 px-2 rounded-sm text-center
          text-gridFg dark:text-gridFgD border border-gridFg dark:border-gridFgD`}
        style={{ backgroundColor }}
      >
        <div>{text}</div>
        <div
          className={`
          max-h-0 max-w-0 overflow-hidden opacity-0
          group-hover:max-h-[1000px] group-hover:max-w-[1000px] group-hover:opacity-100
          transition-all duration-300 ease-in-out`}
        >
          {textsSecondary.map((text) => (
            <div key={text}>{text}</div>
          ))}
        </div>
      </div>
      <div
        className={`
        absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0
        border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent
        border-t-[8px] border-t-gridFg dark:border-t-gridFgD`}
      />
    </div>
  );
};

export default TextBallon;
