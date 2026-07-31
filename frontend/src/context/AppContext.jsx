import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [designData, setDesignData] = useState(null); // stores latest canvas output (image + json data)

  return (
    <AppContext.Provider value={{ cart, setCart, designData, setDesignData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
