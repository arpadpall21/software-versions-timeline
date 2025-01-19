import { Red_Hat_Text } from 'next/font/google';
import '@/app/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

const redHatText = Red_Hat_Text({ subsets: ['latin'] });

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html>
      <head>
        <title>{t('mainTitle')}</title>
        <meta
          name="description"
          content="Software version history timeline to compare key updates and milestones across different software releases."
        />
      </head>
      <NextIntlClientProvider messages={messages}>
        <body className={`${redHatText.className} antialiased bg-bg-lt text-fg-lt-pr dark:bg-bg-dk dark:text-fg-dk-pr`}>
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

export default RootLayout;
