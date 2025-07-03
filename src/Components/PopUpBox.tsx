import { useState, useEffect } from 'react';

interface Props {
  message: string;
  timeout: number;
  dialog?: boolean;
}

const PopUpBox: React.FC<Props> = ({ message, timeout, dialog = false }) => {
  const [active, setActive] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => setActive(!active), 3000);
  // }, [active])

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div
      className={`fixed left-[50%] translate-x-[-50%] max-w-[640px]
        text-justify py-[25px] px-[35px] z-50 shadow-2xl rounded-md
        bg-bgPri dark:bg-bgPriD border-2 border-borPopUp dark:border-PopUpD`}
      style={{
        top: active ? 30 : -500,
        visibility: active ? 'visible' : 'hidden',
        transition: 'top 0.5s ease-in, visibility 0.5s ease-in',
      }}
      onClick={handleClick}
    >
      <p>{message}</p>
    </div>
  )
}

export default PopUpBox;
