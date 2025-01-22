import { useTranslations } from 'next-intl';
import Header from '@/Components/Hearder';
import Footer from '@/Components/Footer';

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main>
        <h1>{t('mainTitle')}</h1>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
