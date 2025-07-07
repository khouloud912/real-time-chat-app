import { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import { useMessages } from '../../api/messageApi.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../contexts/userContext.tsx';

export const ChatMessage = ({ receiverId }: any) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { data: messages = [] } = useMessages(user?._id, receiverId);
  const [socketMessages, setSocketMessages] = useState<any[]>([]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage: any) => {
      // Ensure newMessage is an object with a message property
      if (typeof newMessage === 'object' && newMessage?.message) {
        setSocketMessages((prev) => [...prev, newMessage]);

        // Invalidate messages query to refetch
        queryClient.invalidateQueries({
          queryKey: ['messages', user?._id, receiverId],
        });
      } else {
        console.warn('Invalid message received from socket:', newMessage);
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);
    return () => socket.off('receiveMessage', handleReceiveMessage);
  }, [user?._id, receiverId, queryClient]);

  const allMessages = [...messages, ...socketMessages];
  console.log('allMessages', allMessages);
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
      {/* Render messages dynamically */}
      {allMessages?.map((msg, index) => (
        <div key={index} className="flex items-start mb-4">
          <img
            src={
              user?.avatarUrl ||
              `https://www.gravatar.com/avatar/${user.email}?d=identicon`
            }
            alt={user.displayName}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {msg.message} {/* Display the actual message content */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
