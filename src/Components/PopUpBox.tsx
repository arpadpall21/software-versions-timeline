interface Props {
  message: string;
  timeout: number;
  dialog?: boolean;
}

const PopUpBox: React.FC<Props> = ({ message, timeout, dialog = false }) => {
  return (
    <div
      className={`fixed top-4 left-[50%] translate-x-[-50%] max-w-[640px]
        py-[20px] px-[30px] z-50 shadow-2xl
        bg-bgPri dark:bg-bgPriD border-2 border-borPri dark:border-borPriD`}
    >
      <p>{message}</p>
    </div>
  )
}

export default PopUpBox;
