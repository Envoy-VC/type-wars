import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { TRPCReactProvider } from '~/trpc/react';

import type { ReactNode } from 'react';
import '@repo/ui/globals.css';
import Image from 'next/image';
import MockupImage from 'public/mockup.png';
import { Navbar } from '~/components/navbar';
import { ThemeProvider } from '~/providers';

import { Toaster } from '@repo/ui/components/sonner';

export const metadata: Metadata = {
  title: 'Type Wars',
  description:
    'Every keystroke triggers a flash-block transaction at 200ms, challenging your speed and accuracy while showcasing the power of super-fast block times.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      className={GeistSans.variable}
      lang='en'
    >
      <body>
        <ThemeProvider>
          <TRPCReactProvider>
            <div className='mx-auto h-full max-h-screen min-h-screen w-full bg-background text-foreground sm:max-h-full sm:min-h-full'>
              <div className='relative mx-auto hidden h-screen w-fit sm:flex'>
                <Image
                  src={MockupImage}
                  alt='mockup'
                  width={500}
                  height={500}
                  className='object-cover'
                  priority={true}
                />
                <div className='-translate-x-1/2 -translate-y-1/2 absolute top-[53%] left-1/2 flex h-[85%] w-[90%] flex-col rounded-t-[2rem] rounded-b-[4rem] bg-background'>
                  <Navbar />
                  {children}
                </div>
              </div>
              <div className='flex h-screen flex-col sm:hidden'>
                <Navbar />
                {children}
              </div>
              <Toaster />
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
