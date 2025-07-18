'use client';

interface Props {
  text: string;
  twStyle?: string;
  title?: string;
  pop?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ text, twStyle, title, pop, handleClick }) => {
  return (
    <button
      className={`${pop ? 'btnPop dark:btnPopD' : 'btn dark:btnD'} ${twStyle}`}
      title={title}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
