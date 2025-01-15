import { Red_Hat_Text } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

const redHatText = Red_Hat_Text({ subsets: ['latin'] });

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html lang="en">
      <head>
        <title>{t('mainTitle')}</title>
        <meta
          name="description"
          content="Explore the Software Version History Timeline to compare key updates and milestones across different software releases."
        />
      </head>
      <NextIntlClientProvider messages={messages}>
        <body className={`${redHatText.className} antialiased`}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}

export default RootLayout;
