import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    pt: '/sobre'
  },
  '/method': {
    en: '/method',
    pt: '/metodo'
  },
  '/services': {
    en: '/services',
    pt: '/servicos'
  },
  '/prices': {
    en: '/prices',
    pt: '/precos'
  },
  '/booking': {
    en: '/booking',
    pt: '/agendar'
  },
  '/testimonials': {
    en: '/testimonials',
    pt: '/depoimentos'
  },
  '/blog': '/blog'
} as const;

export type Pathnames = keyof typeof pathnames;

export const routing = defineRouting({
  locales: ['en', 'pt'],
  defaultLocale: 'pt',
  localeDetection: false,
  localePrefix: 'always',
  pathnames
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
