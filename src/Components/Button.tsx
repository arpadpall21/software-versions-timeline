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
      className={`px-3 ml-1 ${pop ? 'btnPop dark:btnPopD' : 'btn dark:btnD'}`}
      style={{ width }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
