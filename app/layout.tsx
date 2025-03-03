import type { LayoutProps } from '@/types';
import './globals.css';

export const metadata = {
  title: {
    default: 'Meows And Whiskers',
    template: '%s | Meows And Whiskers'
  },
  description:
    'The name Meows & Whiskers was born in honor of all the MEOWS that were part of my life, are part of my life and will be part of my life and that with their delicate WHISKERS the will guide me and light up my path.',
  openGraph: {
    title: 'Meows And Whiskers',
    description:
      'The name Meows & Whiskers was born in honor of all the MEOWS that were part of my life, are part of my life and will be part of my life and that with their delicate WHISKERS the will guide me and light up my path.',
    images: ['/og-image.png']
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
};

const RootLayout = async ({ children }: Omit<LayoutProps, 'params'>) => (
  <html>
    <body>{children}</body>
  </html>
);

export default RootLayout;
