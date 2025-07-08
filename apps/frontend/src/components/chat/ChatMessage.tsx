import { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import { useMessages } from '../../api/messageApi.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../contexts/userContext.tsx';
import {useSelectedChat} from "../../contexts/selectedChatContext.tsx";

export const ChatMessage = () => {
  const { user } = useUser();
  const { selectedUser } = useSelectedChat();
  const queryClient = useQueryClient();
  const { data: messages = [] } = useMessages(user?._id, selectedUser?._id);
  const [socketMessages, setSocketMessages] = useState<any[]>([]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage: any) => {
        setSocketMessages((prev) => [...prev, newMessage]);
    };

    socket.on('receiveMessage', handleReceiveMessage);
    return () => socket.off('receiveMessage', handleReceiveMessage);
  }, [user?._id, selectedUser?._id, queryClient]);

  const allMessages = [
    ...messages,
    ...socketMessages.filter(
        (socketMsg) => !messages.some((msg) => msg._id === socketMsg._id)
    ),
  ];  console.log('allMessages', allMessages);
  console.log('messages', messages);
  console.log('socketMessages', socketMessages);


  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
      {/* Render messages dynamically */}
      {allMessages?.map((msg, index) => {
        const isSender = msg.senderId === user?._id;
        const userAvatar = isSender? user.avatarUrl : selectedUser?.avatarUrl;

        return (
            <div
                key={index}
                className={`flex mb-4 items-start ${isSender ? 'justify-start' : 'justify-end'}`}
            >
              <div className="flex items-start space-x-2">
                <img
                    src={userAvatar}
                    alt="avatar"
                    className={`w-10 h-10 rounded-full object-cover ${
                        isSender ?  'order-0 mr-2':  'order-1 ml-2'
                     }`}
                />
                <div
                    className={`max-w-xs break-words px-4 py-2 rounded-lg shadow ${
                        isSender
                            ? 'bg-gray-200 text-gray-900 rounded-bl-none order-0'
                            : 'bg-blue-500 text-white rounded-br-none order-0'
                    }`}
                >
                  {msg.message}
                </div>
              </div>
            </div>
        );
      })}
    </div>
  );
};
