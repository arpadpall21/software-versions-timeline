'use client';

interface Props {
  text: string;
  width?: number;
  pop?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ text, width, pop, handleClick }) => {
  let twStyle = `bg-btnBg dark:bg-btnBgD text-btnFg dark:text-btnFgD
      hover:bg-btnBgHov dark:hover:bg-btnBgHovD`;
  if (pop) {
    twStyle = `bg-btnBgPop dark:bg-btnBgPopD font-bold text-btnFgPop
      dark:text-btnFgPopD hover:bg-btnBgHovPop dark:hover:bg-btnBgHovPopD`;
  }

  return (
    <button
      className={`shadow-md px-3 ml-1 border-2 border-borPri dark:border-borPriD rounded-md ${twStyle}`}
      style={{ width }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
