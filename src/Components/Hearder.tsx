import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import logo from '../../public/V logo.png';

const Header: React.FC = async () => {
  const t = await getTranslations();

  return (
    <header className={'border-b-2 border-borPri dark:border-borPriD'}>
      <h1 className={'text-lg sm:text-2xl font-bold my-3 mx-mobPad sm:mx-deskPad'}>
        <Image className={'inline mr-2'} src={logo} width={40} height={40} alt="Logo" priority={false} />
        <p className={'inline align-middle'}>{t('mainTitle')}</p>
      </h1>
    </header>
  );
};

export default Header;
