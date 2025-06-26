'use client';

interface Props {
  text: string;
  twStyle?: string;
  pop?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ text, twStyle, pop, handleClick }) => {
  return (
    <button className={`${pop ? 'btnPop dark:btnPopD' : 'btn dark:btnD'} ${twStyle}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
