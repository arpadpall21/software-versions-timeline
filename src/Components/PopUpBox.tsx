'use client';

import Button from '@/Components/Button';
import { type PopUpBoxDialog } from '@/misc/types';
import { useTranslations } from 'next-intl';

interface Props {
  active: boolean;
  message: string;
  handleCloseButtonClick: () => void;
  dialog?: PopUpBoxDialog;
}

const PopUpBox: React.FC<Props> = ({ active, message, handleCloseButtonClick, dialog }) => {
  const t = useTranslations('components.popUpBox.buttons');

  return (
    <>
      {active && dialog && <div className={'fixed w-full h-full z-50'} />}
      <div
        className={`fixed left-[50%] translate-x-[-50%] w-[96%] md:w-auto
          text-justify p-[25px] z-50 shadow-2xl rounded-md
          bg-bgPri dark:bg-bgPriD border-2 border-borPopUp dark:border-PopUpD
          ${active ? 'max-md:bottom-[10px] md:top-[15px]' : 'max-md:bottom-[-500px] md:top-[-500px]'}`}
        style={{
          visibility: active ? 'visible' : 'hidden',
          transition: 'top 0.3s ease-in, bottom 0.3s ease-in, visibility 0.3s ease-in',
        }}
      >
        {!dialog && (
          <span
            className={`absolute right-2 top-1 font-bold text-xl text-borPri dark:text-borPriD hover:cursor-pointer`}
            onClick={handleCloseButtonClick}
          >
            ✖
          </span>
        )}
        <p>{message}</p>
        {dialog && (
          <div className={'flex flex-row-reverse mt-[25px]'}>
            <div>
              <Button twStyle={'px-4 py-1 mr-1'} text={t('yes')} handleClick={dialog.handleYesButtonClick} />
              <Button twStyle={'px-4 py-1 ml-1'} text={t('no')} handleClick={dialog.handleNoButtonClick} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PopUpBox;
