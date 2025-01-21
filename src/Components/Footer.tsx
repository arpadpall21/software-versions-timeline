import '@/app/globals.css';
import ThemeSelector from './ThemeSelector';
import LangSelector from './LangSelector';

const Footer: React.FC = () => {
  return (
    <footer className={'flex justify-between p-7 mb-6 border-t-2 border-borPri dark:border-borPriD'}>
      <div>
        <p> Copyright © 2025 Arpad Pall. All rights reserved. </p>
        <p className={'pt-3'}> Email: a.pall21@yahoo.fr </p>
      </div>
      <div>
        <div className={'inline-block mr-4'}>
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
