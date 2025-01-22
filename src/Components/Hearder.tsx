import { useTranslations } from 'next-intl';

const Header: React.FC = () => {
  const t = useTranslations();

  return (
    <header className={'border-b-2 border-borPri dark:border-borPriD'}>
      <div className={'flex justify-between'}>
        <div> left section </div>
        <h1 className={'text-xl'}>{t('mainTitle')}</h1>
        <div> right section </div>
      </div>
    </header>
  );
};

export default Header;
