'use client';

interface Props {
  text: string;
  pop?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ text, pop, handleClick }) => {
  return (
    <button className={`${pop ? 'btnPop dark:btnPopD' : 'btn dark:btnD'}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
