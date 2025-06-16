// contexts/IdContext.tsx
import React, { createContext, useContext } from 'react';

export const IdContext = createContext({
  register: 'register',
  login: 'login',
  game: 'game',
  mirror: 'mirror',
  download: 'download',
});

export const useIds = () => useContext(IdContext);