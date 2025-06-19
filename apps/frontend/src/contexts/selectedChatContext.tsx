// SelectedChatContext.tsx
import { createContext, useContext, useState } from 'react';

const SelectedChatContext = createContext(null);

export const SelectedChatProvider = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <SelectedChatContext.Provider value={{ selectedUser, setSelectedUser }}>
            {children}
        </SelectedChatContext.Provider>
    );
};

export const useSelectedChat = () => useContext(SelectedChatContext);
