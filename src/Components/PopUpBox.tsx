interface Props {
  message: string;
  timeout: number;
  dialog?: boolean;
}

const PopUpBox: React.FC<Props> = ({ message, timeout, dialog = false }) => {
  return (
    <div
      className={`fixed top-5 left-[50%] translate-x-[-50%] max-w-[640px]
        text-justify py-[25px] px-[35px] z-50 shadow-2xl rounded-md
        bg-bgPri dark:bg-bgPriD border-2 border-borPopUp dark:border-PopUpD`}
    >
      <p>{message}</p>
    </div>
  )
}

export default PopUpBox;
