import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = withNextIntl({
  reactStrictMode: true
});

export default nextConfig;
