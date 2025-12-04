import React, { createContext, useContext, useState } from 'react';

// Very small in-memory session store for the current driver.
const SessionContext = createContext({
  driver: null,
  setDriver: (_driver) => {},
  clear: () => {},
});

export function SessionProvider({ children }) {
  const [driver, setDriver] = useState(null);

  const clear = () => setDriver(null);

  // In a POC we keep this in memory only; if you want persistence, add AsyncStorage here.
  return (
    <SessionContext.Provider value={{ driver, setDriver, clear }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
