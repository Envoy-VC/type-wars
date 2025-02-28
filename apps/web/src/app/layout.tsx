import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { TRPCReactProvider } from '~/trpc/react';

import type { ReactNode } from 'react';
import '@repo/ui/globals.css';
import Image from 'next/image';
import MockupImage from 'public/mockup.png';
import { Navbar } from '~/components/navbar';
import { ThemeProvider } from '~/providers';

export const metadata: Metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      className={GeistSans.variable}
      lang='en'
    >
      <ThemeProvider>
        <body>
          <TRPCReactProvider>
            <div className='mx-auto h-screen w-full bg-background text-foreground'>
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
              <div className='flex flex-col sm:hidden'>
                <Navbar />
                {children}
              </div>
            </div>
          </TRPCReactProvider>
        </body>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
