import '@/app/globals.css';
import ThemeSelector from './ThemeSelector';
import LangSelector from './LangSelector';

const Footer: React.FC = () => {
  return (
    <footer className={'flex justify-between p-7 mb-4 border-t-2 border-borPri dark:border-borPriD'}>
      <div>
        <p className={'text-fgSec dark:text-fgSecD'}> Copyright © 2025 Arpad Pall. All rights reserved. </p>
        <p className={'pt-3 text-fgSec dark:text-fgSecD'}> Email: a.pall21@yahoo.fr </p>
      </div>
      <div>
        <div className={'inline-block'}>
          <ThemeSelector />
        </div>
        <div className={'inline-block ml-4'}>
          <LangSelector />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
