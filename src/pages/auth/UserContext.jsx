import { createContext, useState, useContext } from "react";

// Kontekst yaratish
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Foydalanuvchi ma'lumotlarini saqlash funksiyasi
  const saveUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};
