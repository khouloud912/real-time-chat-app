import { Phone, Video } from 'lucide-react';
import { ChatInput } from '../chat/ChatInput';
import { ChatMessage } from './ChatMessage';
import { useSelectedChat } from '../../contexts/selectedChatContext.tsx';
import { useUser } from '../../contexts/userContext.tsx';

const ChatComponent = () => {
  const { user } = useUser();
  const { selectedUser } = useSelectedChat();
  console.log('selectedUser', selectedUser);

  return (
    <div className="flex flex-col h-full w-full ml-8">
      {/* Navbar */}
      <div className="h-16 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md px-4">
        <div className="flex items-center h-full">
          <>
            <img
              src={selectedUser ? selectedUser?.avatarUrl : user?.avatarUrl}
              alt={selectedUser ? selectedUser?.displayName : user?.displayName}
              className="w-10 h-10 rounded-full object-cover mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://www.gravatar.com/avatar/?d=mp';
              }}
            />
            <div className="ml-2">
              <span className="block text-sm font-semibold dark:text-white">
                {selectedUser ? selectedUser?.displayName : user?.displayName}
              </span>
              <span className="block text-xs ml-0 text-green-500">
                {selectedUser ? selectedUser?.status : user?.status}
              </span>
            </div>
          </>
        </div>
        <div className="flex items-center h-full space-x-4">
          <Phone
            size={18}
            className="text-gray-600 dark:text-gray-400 cursor-pointer"
          />
          <Video
            size={18}
            className="text-gray-600 dark:text-gray-400 cursor-pointer"
          />
        </div>
      </div>

      <ChatMessage receiverId={selectedUser?._id} />
      <ChatInput
        senderId={user?._id}
        receiverId={selectedUser ? selectedUser?._id : user?._id}
      />
    </div>
  );
};

export default ChatComponent;
