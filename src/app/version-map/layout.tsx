import { useTranslations } from 'next-intl';

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const t = useTranslations();

  return (
    <main>
      <h1>{t('mainTitle')}</h1>
      {children}
    </main>
  );
}

export default Layout;
