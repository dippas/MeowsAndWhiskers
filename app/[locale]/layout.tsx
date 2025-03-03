import { NextIntlClientProvider } from 'next-intl';

import MainLayout from '@/components/MainLayout';
import { routing } from '@/i18n/routing';
import { getMessages } from '@/i18n/request';
import type { LayoutProps } from '@/types';

export const generateStaticParams = () => routing.locales.map(locale => ({ locale }));

const LocaleLayout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <MainLayout>{children}</MainLayout>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
