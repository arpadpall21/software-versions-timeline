import type { Metadata } from 'next';
import { Red_Hat_Text } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Software Version History Timeline',
  description: 'software version history timeline',
};

const redHatText = Red_Hat_Text({ subsets: ['latin'] });

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <NextIntlClientProvider messages={messages}>
        <body className={`${redHatText.className} antialiased`}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}

export default RootLayout;
