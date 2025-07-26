import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/misc/i18n/request.ts');

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src', 'config', 'data'],
  },
};

export default withNextIntl(nextConfig);
