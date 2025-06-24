'use client';

interface Props {
  text: string;
  width?: number;
  pop?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ text, width, pop, handleClick }) => {
  return (
    <button
      className={`${pop ? 'btnPop dark:btnPopD' : 'btn dark:btnD'} px-3 ml-1`}
      style={{ width }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;


// outline-2 outline-foc dark:outline-focD sm:has-[:focus]:outline`