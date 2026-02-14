import { createContext, useState } from 'react';
import {toast} from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;

    const parsed = JSON.parse(storedUser);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem('user');
      toast.error("Session expired. Please log in again.");
      return null;
    }

    return parsed.value;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};