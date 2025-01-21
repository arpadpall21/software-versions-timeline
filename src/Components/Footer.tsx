import '@/app/globals.css';
import ThemeSelector from './ThemeSelector';
import LangSelector from './LangSelector';

const Footer: React.FC = () => {
  return (
    <footer className={'border-t-2 border-borPri dark:border-borPriD'}>
      <p> This is the Footer! </p>
      <ThemeSelector />
      <LangSelector />
    </footer>
  )
}

export default Footer;
