import {useMemo} from 'react';
import {useUsersWithChats} from '../../../api/userApi';
import {useSelectedChat} from "../../../contexts/selectedChatContext.tsx";


const ChatTab = ({ onContactClick, searchQuery }: any) => {


  const { data: users = [], isLoading, isError } = useUsersWithChats();
  const {setSelectedUser} = useSelectedChat();

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    return users.filter((user: any) =>
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);


  if (isLoading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No users available.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-2 space-y-2 overflow-auto">
      {filteredUsers?.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className="flex items-start bg-gray-100 dark:bg-gray-700 rounded-lg p-2 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.avatarUrl}
            alt={user.name}
          />
          <div className="ml-2 flex-1">
            {/* Display name */}
            <div className="font-semibold text-sm dark:text-white">
              {user.displayName}
            </div>
            {/* Last message */}
            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {user.lastMessage}
            </div>
          </div>
          {/* Optional: Last message timestamp */}
          {user.lastMessageDate && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(user.lastMessageDate).toLocaleTimeString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatTab;
