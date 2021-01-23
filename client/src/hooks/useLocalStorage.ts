import { useState } from 'react';

export default function useLocalStorage(key: string, initValue?: string) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item || initValue;
    } catch (err) {
      console.warn('Setting localStorage went wrong: ', err);
      return initValue;
    }
  });

  const setValue = (value: string) => {
    window.localStorage.setItem(key, value);
    setStoredValue(value);
  };

  const clearStorage = () => localStorage.removeItem(key);

  return [storedValue, setValue, clearStorage] as [
    string,
    (value: string) => void,
    () => void
  ];
}
