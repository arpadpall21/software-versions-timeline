'use client';

interface Props {
  text: string;
  textsSecondary: string[];
  backgroundColor?: string;
}

const TextBallon: React.FC<Props> = ({ text, textsSecondary, backgroundColor = 'black' }) => {
  return (
    <div className={'group relative hover:cursor-pointer'}>
      <div
        className={`
          absolute bottom-[7px] left-1/2 transform -translate-x-1/2 px-2 rounded-sm text-center
          text-gridFg dark:text-gridFgD border border-gridFg dark:border-gridFgD`}
        style={{ backgroundColor }}
      >
        <div>{text}</div>
        <div className={'hidden text-nowrap group-hover:inline-block'}>
          {textsSecondary.map((text) => (
            <div key={text}>{text}</div>
          ))}
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0
        border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent
        border-t-[8px] border-t-gridFg dark:border-t-gridFgD`}
      />
    </div>
  );
};

export default TextBallon;
