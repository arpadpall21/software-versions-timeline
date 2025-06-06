'use client';

interface Props {
  text: string;
  textsSecondary: string[];
  twStyle: string;
}
/*
 * Does not affect the layout (positioned absolute)
 * positioned relative to its middle bottom point
 */
const TextBallon: React.FC<Props> = ({ text, textsSecondary, twStyle }) => {
  return (
    <div className={'group block relative'}>
      <div
        className={`
          absolute bottom-[7px] left-1/2 transform -translate-x-1/2 px-2 rounded-sm text-center
          border border-gridFg dark:border-gridFgD
          ${twStyle}`}
      >
        <div className={'text-nowrap'}>{text}</div>
        <div
          className={`
          max-h-0 max-w-0 overflow-hidden opacity-0
          group-hover:max-h-[1000px] group-hover:max-w-[1000px] group-hover:opacity-100
          transition-all duration-500 ease-in-out`}
        >
          {textsSecondary.map((text) => (
            <div key={text}>{text}</div>
          ))}
        </div>
      </div>
      <div
        className={`
        absolute bottom-0 w-0 h-0 left-1/2 transform -translate-x-1/2
        border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent
        border-t-[8px] border-t-gridFg dark:border-t-gridFgD`}
      />
      <div className={'absolute top-0 h-[15px] w-[13px] left-1/2 transform -translate-x-1/2'}></div>
    </div>
  );
};

export default TextBallon;
