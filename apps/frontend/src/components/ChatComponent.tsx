import { PhoneOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';

const ChatComponent = () => {
  const user = {
    picture: 'https://via.placeholder.com/50',
    name: 'John Doe',
  };

  const isAuthenticated = true;

  return (
    <div className="flex flex-col h-full w-full ml-8">
      {/* Navbar */}
      <div className="h-16 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md px-4">
        <div className="flex items-center h-full">
          {isAuthenticated && (
            <>
              <img
                src={user.picture}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-2">
                <span className="block text-sm font-semibold dark:text-white">
                  {user.name}
                </span>
                <span className="block text-xs text-green-500">Online</span>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center h-full space-x-4">
          <PhoneOutlined className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          <VideoCameraOutlined className="text-gray-600 dark:text-gray-400 cursor-pointer" />
        </div>
      </div>

      <ChatMessage />
      <ChatInput />
    </div>
  );
};

export default ChatComponent;
