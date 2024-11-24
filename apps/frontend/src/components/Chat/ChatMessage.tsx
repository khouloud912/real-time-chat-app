import { useEffect, useState } from 'react';
import socket from '../../socket/socket';

export const ChatMessage = (user: any) => {
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, []);
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
      {/* Render messages dynamically */}
      {messages?.map((message, index) => (
        <div key={index} className="flex items-start mb-4">
          <img
            src={user.picture || 'https://via.placeholder.com/50'} // Fallback to default image if user.picture is not available
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
