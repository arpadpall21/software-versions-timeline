'use client';

interface Props {
  text: string;
  width?: number;
  pop?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ text, pop, handleClick }) => {
  /**
   * Tailwind utilities are parsed at build time so they cannot be iterpolated with values,
   *   in this situation this means we cannot conditionally change tailwind utilities
   * So code duplication is kind of unavoidable here :/
   *
   * https://tailwindcss.com/docs/detecting-classes-in-source-files#class-detection-in-depth
   */
  if (pop) {
    return (
      <button
        className={`shadow-md px-3 ml-1 
          border-2 border-borPri dark:border-borPriD rounded-md bg-btnBgPop dark:bg-btnBgPopD
          font-bold text-btnTxtPop dark:text-btnTxtPopD 
          hover:bg-btnBgHovPop dark:hover:bg-btnBgHovPopD`}
        onClick={handleClick}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      className={` shadow-md px-3 ml-1
        border-2 border-borPri dark:border-borPriD rounded-md bg-btnBg dark:bg-btnBgD
        text-btnTxt dark:text-btnTxtD 
        hover:bg-btnBgHov dark:hover:bg-btnBgHovD`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
