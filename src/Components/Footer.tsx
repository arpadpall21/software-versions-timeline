import '@/app/globals.css';
import ThemeSelector from './ThemeSelector';
import LangSelector from './LangSelector';
import { getTranslations } from 'next-intl/server';

const Footer: React.FC = async () => {
  const t = await getTranslations('components.footer');

  return (
    <footer
      className={`flex sm:flex-row flex-col justify-between py-7 mx-mobPad sm:mx-deskPad sm:px-7 mb-4
        border-t-2 border-borPri dark:border-borPriD`}
    >
      <div className={'mr-2'}>
        <p className={'text-fgSec dark:text-fgSecD'}>{t('copyright', { name: 'Arpad Pall' })}</p>
        <p className={'pt-3 text-fgSec dark:text-fgSecD'}> Email: a.pall21@yahoo.fr </p>
      </div>
      <div className={'mt-6 sm:mt-0'}>
        <div className={'block md:inline-block mr-4 mb-2'}>
          <ThemeSelector />
        </div>
        <div className={'block md:inline-block'}>
          <LangSelector />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
