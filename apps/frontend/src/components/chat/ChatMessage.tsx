import { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import {useMessages} from "../../api/messageApi.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useUser} from "../../contexts/userContext.tsx";

export const ChatMessage = ({ receiverId}: any) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { data: messages = [] } = useMessages(user._id, receiverId);
  const [socketMessages, setSocketMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      // Add to local socket messages
      setSocketMessages((prev) => [...prev, newMessage]);

      // Or invalidate the query to refetch
      queryClient.invalidateQueries({ queryKey: ['messages', user?.sub, receiverId] });
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [user._id, receiverId, queryClient]);
  const allMessages = [...messages, ...socketMessages];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">

      {/* Render messages dynamically */}
      {allMessages?.map((message, index) => (
        <div key={index} className="flex items-start mb-4">
          <img
            src={user.picture ||`https://www.gravatar.com/avatar/${user.email}?d=identicon`
            }
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {message} {/* Display the actual message content */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
