import '@/app/globals.css';
import { getTranslations } from 'next-intl/server';
import ThemeSelector from './ThemeSelector';
import LangSelector from './LangSelector';

const Footer: React.FC = async () => {
  const t = await getTranslations('components.footer');

  return (
    <footer
      className={`flex flex-col sm:flex-row justify-between py-7 mx-mobPad sm:mx-desckPad sm:px-7 mb-4
        border-t-2 border-borPri dark:border-borPriD`}
    >
      <div>
        <p className={'text-fgSec dark:text-fgSecD'}>{t('copyright', { name: 'Arpad Pall' })}</p>
        <p className={'pt-3 text-fgSec dark:text-fgSecD'}> Email: a.pall21@yahoo.fr </p>
      </div>
      <div className={'w-36 mt-6 sm:mt-0 md:w-auto'}>
        <div className={'inline-block mr-4 mb-2'}>
          <ThemeSelector />
        </div>
        <div className={'inline-block'}>
          <LangSelector />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
