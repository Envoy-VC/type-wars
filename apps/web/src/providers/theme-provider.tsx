import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextThemesProvider
      attribute='class'
      enableSystem={true}
    >
      {children}
    </NextThemesProvider>
  );
};
