import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import {
  SmileOutlined,
  CameraOutlined,
  PaperClipOutlined,
  AudioOutlined,
} from '@ant-design/icons';

export const ChatInput = ({ onSendMessage }: any) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Clear input after sending
    }
  };

  const handleEmojiClick = (event: any, emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="flex items-center p-2 sm:p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="relative flex items-center flex-1">
        <input
          type="text"
          className="flex-1 p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-full dark:bg-gray-900 dark:text-white pl-10 text-sm sm:text-base" // Adjusted padding and text size
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <SmileOutlined
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="absolute left-2 text-gray-500 dark:text-gray-400 cursor-pointer text-lg sm:text-xl"
        />
        <CameraOutlined
          className="absolute right-12 text-gray-500 dark:text-gray-400 cursor-pointer text-lg sm:text-xl"
        />
        <PaperClipOutlined
          className="absolute right-6 text-gray-500 dark:text-gray-400 cursor-pointer text-lg sm:text-xl"
        />

        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2 sm:mb-3">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <AudioOutlined
        className="text-gray-500 dark:text-gray-400 cursor-pointer ml-2 sm:ml-3 text-lg sm:text-xl"
      />
    </div>
  );
};
