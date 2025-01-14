import type { Metadata } from 'next';
import { Red_Hat_Text } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Software Version History Timeline',
  description: 'software version history timeline',
};

const redHatText = Red_Hat_Text({ subsets: ['latin'] });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  
  console.log(locale)
  
  const messages = await getMessages();

  return (
    <html lang="en">
      <NextIntlClientProvider messages={messages}>
        <body className={`${redHatText.className} antialiased`}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
