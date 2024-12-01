import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import {
  SmileOutlined,
  CameraOutlined,
  PaperClipOutlined,
  AudioOutlined,
} from '@ant-design/icons';
import { addMessage } from '../../api/messageApi';

export const ChatInput = ({ senderId, receiverId }: any) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        senderId,
        receiverId,
        message,
      };
      addMessage(messageData);
      setMessage(''); // Clear input after sending
    }
  };

  const handleEmojiClick = (event: any, emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="flex items-center p-2 sm:p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      {/* Input Container */}
      <div className="flex items-center w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2">
        {/* Emoji Picker Icon */}
        <SmileOutlined
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mr-3"
        />

        {/* Input Field */}
        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base dark:text-white"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />

        {/* File Attachment Icon */}
        <PaperClipOutlined className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mx-2" />

        {/* Camera Icon */}
        <CameraOutlined className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mx-2" />

        {/* Audio Icon */}
        <AudioOutlined className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl ml-2" />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-0 mb-2 sm:mb-3">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};
