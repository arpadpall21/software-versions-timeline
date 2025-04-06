interface Props {
  text: string;
}

const TextBallon: React.FC<Props> = ({ text }) => {
  return <span> {text} </span>;
};

export default TextBallon;
