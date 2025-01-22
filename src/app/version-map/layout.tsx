import Header from '@/Components/Hearder';
import Footer from '@/Components/Footer';

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className={'mx-5'}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
