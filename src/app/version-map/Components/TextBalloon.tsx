'use client';

interface Props {
  text: string;
  backgroundColor?: string;
}

const TextBallon: React.FC<Props> = ({ text, backgroundColor = 'black' }) => {
  return (
    <span
      className={
        'relative px-1 h-[50px] rounded-sm text-gridFg dark:text-gridFgD border border-gridFg dark:border-gridFgD'
      }
      style={{ backgroundColor }}
    >
      {text}
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
    </span>
  );
};

export default TextBallon;
