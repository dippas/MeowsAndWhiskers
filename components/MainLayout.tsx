'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from './LanguageSwitcher';

import type { Pathnames } from '@/i18n/routing';
import { Link } from '@/i18n/routing';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  const t = useTranslations();

  return (
    <>
      <header>
        <div>Logo</div>
        <nav>
          <Link href="/">{t('links.home')}</Link>
          {Object.entries(t.raw('routes')).map(([key]) => (
            <Link key={key} href={`/${t.raw('routes')[key]}` as Pathnames}>
              {t(`links.${key}`)}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </header>
      <main>{children}</main>
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
};

export default MainLayout;
