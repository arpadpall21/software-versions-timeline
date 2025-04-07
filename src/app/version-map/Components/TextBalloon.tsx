'use client';

interface Props {
  text: string;
  textSecondary: string;
  backgroundColor?: string;
}

const TextBallon: React.FC<Props> = ({ text, textSecondary, backgroundColor = 'black' }) => {
  return (
    <div
      className={`
        absolute z-10 px-2 rounded-sm text-gridFg dark:text-gridFgD border border-gridFg dark:border-gridFgD
        hover:cursor-pointer hover:z-[999] group`}
      style={{ backgroundColor }}
    >
      <div className={'text-center'}>{text}</div>
      <div className={'text-center hidden group-hover:block'}>{textSecondary}</div>
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
