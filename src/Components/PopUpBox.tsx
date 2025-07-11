import { useState, useEffect } from 'react';
import Button from './Button';

interface Props {
  message: string;
  timeout?: number;
  dialog?: {
    handleYesButtonClick: (e: React.MouseEvent) => void;
    handleNoButtonClick: (e: React.MouseEvent) => void;
  };
}

const PopUpBox: React.FC<Props> = ({ message, timeout, dialog }) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (timeout && timeout > 0) {
      setTimeout(() => setActive(false), timeout);
    }
  }, [timeout]);

  function handleCloseButtonClick() {
    setActive(false);
  }

  function handleYesButtonClick(e: React.MouseEvent) {
    setActive(false);
    if (dialog) {
      dialog.handleYesButtonClick(e);
    }
  }

  function handleNoButtonClick(e: React.MouseEvent) {
    setActive(false);
    if (dialog) {
      dialog.handleNoButtonClick(e);
    }
  }

  return (
    <div
      className={`fixed left-[50%] translate-x-[-50%] max-w-[640px]
        text-justify pt-[40px] pb-[25px] px-[35px] z-50 shadow-2xl rounded-md
        bg-bgPri dark:bg-bgPriD border-2 border-borPopUp dark:border-PopUpD`}
      style={{
        top: active ? 30 : -500,
        visibility: active ? 'visible' : 'hidden',
        transition: 'top 0.3s ease-in, visibility 0.5s ease-in',
      }}
    >
      {!dialog && (
        <span
          className={`absolute right-4 top-3 font-bold text-xl text-borPri dark:text-borPriD cursor-pointer`}
          onClick={handleCloseButtonClick}
        >
          ✖
        </span>
      )}
      <p>{message}</p>
      {dialog && (
        <div className={'flex flex-row-reverse mt-[25px]'}>
          <div>
            <Button twStyle={'px-4 py-1 mr-1'} text={'Yes'} handleClick={handleYesButtonClick} />
            <Button twStyle={'px-4 py-1 ml-1'} text={'No'} handleClick={handleNoButtonClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpBox;
