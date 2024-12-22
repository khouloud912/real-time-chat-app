import React, { createContext, useContext, useState } from 'react';

interface User {
  _id: string;
  name: string;
  picture: string;
  email: string;
  createdAt: string;
}

interface SelectedUserContextType {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}

const SelectedUserContext = createContext<SelectedUserContextType | undefined>(
  undefined
);

export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error(
      'useSelectedUser must be used within a SelectedUserProvider'
    );
  }
  return context;
};

export const SelectedUserProvider = ({ children }: any) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};
