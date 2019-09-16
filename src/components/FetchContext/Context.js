import React from 'react';

const Context = React.createContext();

// Wrapper to make usage of context easier
// See Logger.js for example usage
export function useFetchContext() {
  return React.useContext(Context);
}

export default Context;
