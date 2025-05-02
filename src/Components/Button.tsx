'use client';

interface Props {
  handleClick?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Button: React.FC<Props> = ({ handleClick }) => {
  return <p> Button </p>;
};

export default Button;
