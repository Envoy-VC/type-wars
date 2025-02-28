'use client';

import { Button } from '@repo/ui/components/button';
import { MoonIcon, SunIcon, SwordsIcon } from 'lucide-react';
import Link from 'next/link';

import { useTheme } from 'next-themes';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='flex flex-row items-center justify-between gap-2 px-5 py-5'>
      <Link
        href='/'
        className='flex flex-row items-center gap-2'
      >
        <SwordsIcon className='h-6 w-6' />
        <div className='text-xl'>Type Wars</div>
      </Link>
      <div className='flex gap-2'>
        <Button
          onClick={toggleTheme}
          variant='ghost'
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
    </div>
  );
};
23;
