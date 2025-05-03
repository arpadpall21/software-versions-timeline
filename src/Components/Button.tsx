'use client';

interface Props {
  text: string;
  pop?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ text, pop, handleClick }) => {
  return (
    <button
      className={` shadow-md px-3 ml-1
        border-2 border-borPri dark:border-borPriD rounded-md bg-bgPri dark:bg-bgPriD
        hover:bg-bgIntHover dark:hover:bg-bgIntHoverD`}
      onClick={handleClick}
    >
      {pop ? (
        <span className={'text-fgPri dark:text-fgPriD font-semibold'}>{text}</span>
      ) : (
        <span className={'text-fgPop dark:text-fgPopD'}>{text}</span>
      )}
    </button>
  );
};

export default Button;
