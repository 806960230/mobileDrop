import { createContext } from 'react';

export const DataContext = createContext<{
  locale: string;
  setLocale: React.Dispatch<React.SetStateAction<string>>;
}>({
  locale: 'en',
  setLocale: () => {},
});
