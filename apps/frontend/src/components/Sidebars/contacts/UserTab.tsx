import { useEffect, useState } from 'react';
import { getUsers } from '../../../api/userApi';

const UserTab = ({ user, onContactClick }: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('user', user);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        const filteredUsers = data.filter(
          (filter: any) => filter.email !== user?.email
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No users available.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-2 space-y-2 overflow-auto">
      {users.map((user) => (
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
          <div className="ml-1">
            {/* Display name */}
            <div className="font-semibold text-sm dark:text-white">
              {user.displayName}
            </div>
            {/* Joined at */}
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Joined at: {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTab;
