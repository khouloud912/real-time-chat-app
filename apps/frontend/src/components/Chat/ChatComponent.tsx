import { PhoneOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { ChatInput } from '../Chat/ChatInput';
import { ChatMessage } from './ChatMessage';
import { useAuth } from '../../auth/authContext';

const ChatComponent = () => {
  // const user = {
  //   picture: 'https://via.placeholder.com/50',
  //   name: 'John Doe',
  // };

  const dummyReceiverId = 'test-user-123';
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="flex flex-col h-full w-full ml-8">
      {/* Navbar */}
      <div className="h-16 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md px-4">
        <div className="flex items-center h-full">
          {isLoggedIn() && (
            <>
              <img
                src={
                  user.picture ||
                  `https://www.gravatar.com/avatar/${user.email}?d=identicon`
                }
                alt={user.name || 'Default User'}
                className="w-10 h-10 rounded-full object-cover mr-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://www.gravatar.com/avatar/?d=mp';
                }}
              />
              <div className="ml-2">
                <span className="block text-sm font-semibold dark:text-white">
                  {user.name}
                </span>
                <span className="block text-xs ml-0 text-green-500">
                  Online
                </span>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center h-full space-x-4">
          <PhoneOutlined className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          <VideoCameraOutlined className="text-gray-600 dark:text-gray-400 cursor-pointer" />
        </div>
      </div>

      <ChatMessage user={user} />
      <ChatInput senderId={user?.sub} receiverId={dummyReceiverId} />
    </div>
  );
};

export default ChatComponent;
