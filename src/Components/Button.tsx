'use client';

interface Props {
  text: string;
  width?: number;
  pop?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ text, width, pop, handleClick }) => {
  /**
   * Tailwind utilities are parsed at build time so they cannot be iterpolated with values,
   *   in this situation this means we cannot conditionally change tailwind utilities
   * So code duplication is kind of unavoidable here :/
   *
   * https://tailwindcss.com/docs/detecting-classes-in-source-files#class-detection-in-depth
   */

  let twStyle = `bg-btnBgPop dark:bg-btnBgPopD font-bold text-btnFgPop
    dark:text-btnFgPopD hover:bg-btnBgHovPop dark:hover:bg-btnBgHovPopD`;
  if (pop) {
    twStyle = `bg-btnBg dark:bg-btnBgD text-btnFg dark:text-btnFgD
      hover:bg-btnBgHov dark:hover:bg-btnBgHovD`;
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
