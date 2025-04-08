'use client';

interface Props {
  text: string;
  textsSecondary: string[];
  backgroundColor?: string;
}

const TextBallon: React.FC<Props> = ({ text, textsSecondary, backgroundColor = 'black' }) => {
  return (
    <div
      className={`
        group relative inline-block px-2 rounded-sm hover:cursor-pointer text-center
        text-gridFg dark:text-gridFgD border border-gridFg dark:border-gridFgD`}
      style={{ backgroundColor }}
    >
      <div>{text}</div>
      <div className={'hidden text-nowrap group-hover:inline-block'}>
        {textsSecondary.map((text) => (
          <div key={text}>{text}</div>
        ))}
      </div>
      <div
        className={'border-t-gridFg dark:border-t-gridFgD'}
        style={{
          position: 'absolute',
          bottom: -9,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `8px solid`,
        }}
      />
    </div>
  );
};

export default TextBallon;
