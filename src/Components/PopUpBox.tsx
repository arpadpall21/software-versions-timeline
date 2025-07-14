'use client';

import Button from '@/Components/Button';

interface Props {
  active: boolean;
  message: string;
  handleCloseButtonClick: () => void;
  dialog?: {
    handleYesButtonClick: (e: React.MouseEvent) => void;
    handleNoButtonClick: (e: React.MouseEvent) => void;
  };
}

const PopUpBox: React.FC<Props> = ({ active, message, handleCloseButtonClick, dialog }) => {
  return (
    <div
      className={`fixed left-[50%] translate-x-[-50%] max-w-[640px]
        text-justify p-[25px] z-50 shadow-2xl rounded-md
        bg-bgPri dark:bg-bgPriD border-2 border-borPopUp dark:border-PopUpD`}
      style={{
        top: active ? 30 : -500,
        visibility: active ? 'visible' : 'hidden',
        transition: 'top 0.3s ease-in, visibility 0.3s ease-in',
      }}
    >
      {!dialog && (
        <span
          className={`absolute right-2 top-1 font-bold text-xl text-borPri dark:text-borPriD cursor-pointer`}
          onClick={handleCloseButtonClick}
        >
          ✖
        </span>
      )}
      <p>{message}</p>
      {dialog && (
        <div className={'flex flex-row-reverse mt-[25px]'}>
          <div>
            <Button twStyle={'px-4 py-1 mr-1'} text={'Yes'} handleClick={dialog.handleYesButtonClick} />
            <Button twStyle={'px-4 py-1 ml-1'} text={'No'} handleClick={dialog.handleNoButtonClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpBox;
