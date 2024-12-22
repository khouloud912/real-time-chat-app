import { ChatInput } from '../Chat/ChatInput';
import { ChatMessage } from './ChatMessage';
import { useAuth } from '../../context/AuthContext';
import CallComponent from './CallComponent';
import { useSelectedUser } from '../../context/SelectedUserContext';

const ChatComponent = () => {
  const dummyReceiverId = 'test-user-123';
  const { isLoggedIn, user } = useAuth();
  const { selectedUser } = useSelectedUser();

  return (
    <div className="flex flex-col h-full w-full ml-8">
      {/* Navbar */}
      <div className="h-16 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md px-4">
        <div className="flex items-center h-full">
          {isLoggedIn() && (
            <>
              <img
                src={
                  selectedUser?.picture ||
                  `https://www.gravatar.com/avatar/${user.email}?d=identicon`
                }
                alt={selectedUser?.name || 'Default User'}
                className="w-10 h-10 rounded-full object-cover mr-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://www.gravatar.com/avatar/?d=mp';
                }}
              />
              <div className="ml-2">
                <span className="block text-sm font-semibold dark:text-white">
                  {selectedUser?.name}
                </span>
                <span className="block text-xs ml-0 text-green-500">
                  Online
                </span>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center h-full space-x-4">
          <CallComponent />
          {/* <PhoneOutlined className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          <VideoCameraOutlined className="text-gray-600 dark:text-gray-400 cursor-pointer" /> */}
        </div>
      </div>

      <ChatMessage user={selectedUser ? selectedUser : user} />
      <ChatInput senderId={user?.sub} receiverId={dummyReceiverId} />
    </div>
  );
};

export default ChatComponent;
