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
          content={`Software version history timeline to compare key updates and milestones
            across different software releases.`}
        />
      </head>
      <NextIntlClientProvider messages={messages}>
        <body className={`${redHatText.className} antialiased bg-bgPri text-fgPri dark:bg-bgPriD dark:text-fgPriD`}>
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

export default RootLayout;
