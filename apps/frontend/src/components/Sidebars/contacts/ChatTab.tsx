import { useEffect, useState } from 'react';
import { getUsersWithChats } from '../../../api/userApi';
import { useAuth } from '../../../auth/authContext';

const ChatTab = ({ onContactClick, searchQuery }: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsersWithChats(getToken);
        console.log('data', data);
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, users]);
  if (loading) {
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
          onClick={() => onContactClick(user)}
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
