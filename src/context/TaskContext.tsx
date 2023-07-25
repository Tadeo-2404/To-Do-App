"use client"
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

// Define the type for the context value
interface ContextValue {
  render: number;
  setRender: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with an initial value of { render: false, setRender: () => {} }
const Context = createContext<ContextValue>({
  render: 0,
  setRender: () => {},
});

// Custom hook to access the context value in components
const useContextValue = (): ContextValue => {
  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error("useContextValue must be used within a ContextProvider.");
  }
  return contextValue;
};

// ContextProvider component
interface ContextProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProps) => {
  const [render, setRender] = useState<number>(0);

  return (
    <Context.Provider value={{ render, setRender }}>
      {children}
    </Context.Provider>
  );
};

export { Context, useContextValue };
export default ContextProvider;

