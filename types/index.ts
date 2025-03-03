import type { ReactNode } from 'react';

// Separate props for pages and layouts
export interface PageProps {
  params: {
    locale: string;
  };
  children?: ReactNode;
}

export interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}
