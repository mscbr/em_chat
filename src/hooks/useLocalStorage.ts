import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage(key: string, initValue?: string) {
  if (typeof window === 'undefined') return [null, null, null];

  const [value, setValue] = useState(() => {
    const val = localStorage.getItem(key);
    if (val) return val;
    return initValue || '';
  });

  const clearStorage = () => localStorage.removeItem(key);

  useEffect(() => {
    localStorage.setItem(key, value);
  });

  return [value, setValue, clearStorage] as [
    string,
    Dispatch<SetStateAction<string>>,
    () => void
  ];
}
