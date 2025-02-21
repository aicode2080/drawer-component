import { memo } from 'react';
import localFrage from 'localforage';

export const LocalFrage = memo(function () {
  localFrage.config({
    driver: [localFrage.WEBSQL, localFrage.INDEXEDDB, localFrage.LOCALSTORAGE],
    name: 'vite-component',
    version: 1.0,
    description: 'react vite component ts pwa',
  });
  localFrage.setItem('key', 'value');
  return <>indexDb存储方式</>;
});
