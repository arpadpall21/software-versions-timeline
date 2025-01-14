import type { Metadata } from 'next';
import { Red_Hat_Text } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Software Version History',
  description: 'softwrae version history timeline',
};

const redHatText = Red_Hat_Text({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${redHatText.className} antialiased`}>{children}</body>
    </html>
  );
}
