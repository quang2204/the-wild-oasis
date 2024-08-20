import { useState, createContext, useContext } from 'react';

// Custom hook
const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return [isOpen, toggle];
};

// Context
const IsOpenContext = createContext();

// Context provider
const IsOpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <IsOpenContext.Provider value={{ isOpen, toggle }}>
      {children}
    </IsOpenContext.Provider>
  );
};

// Hook to consume context
const useIsOpen = () => useContext(IsOpenContext);
export default useToggle
export {  IsOpenProvider, useIsOpen };
