import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from './routing';

export const getMessages = async (locale: string) => {
  try {
    return (await import(`@/i18n/${locale}.json`)).default;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'pt' | 'en')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/i18n/${locale}.json`)).default
  };
});
