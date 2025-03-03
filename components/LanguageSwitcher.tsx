'use client';

import { useLocale } from 'next-intl';
import clsx from 'clsx';

import { Link, usePathname } from '@/i18n/routing';
export enum Locale {
  PT = 'pt',
  EN = 'en'
}

const LanguageSwitcher = () => {
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <div>
      <Link href={pathname} locale="pt">
        <button className={clsx('btn', currentLocale === 'pt' && 'btn-primary')}>PT</button>
      </Link>
      <Link href={pathname} locale="en">
        <button className={clsx('btn', currentLocale === 'en' && 'btn-primary')}>EN</button>
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
