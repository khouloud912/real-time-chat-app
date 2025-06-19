import { createContext, useContext, useState, ReactNode } from 'react';

type SelectedChatContextType = {
  selectedUser: any;
  setSelectedUser: any;
};

const SelectedChatContext = createContext<SelectedChatContextType | undefined>(
  undefined
);

export const SelectedChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <SelectedChatContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedChatContext.Provider>
  );
};

// 4. Define the hook with a useful error message
export const useSelectedChat = () => {
  const context = useContext(SelectedChatContext);
  if (!context) {
    throw new Error(
      'useSelectedChat must be used within a SelectedChatProvider'
    );
  }
  return context;
};
