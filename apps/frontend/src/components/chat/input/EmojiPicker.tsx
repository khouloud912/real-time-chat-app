import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import EmojiPickerReact from 'emoji-picker-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject: any) => {
    onEmojiSelect(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <Smile
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mr-3"
      />
      {showEmojiPicker && (
        <div className="absolute bottom-full left-0 mb-2 sm:mb-3">
          <EmojiPickerReact onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </>
  );
};
export default EmojiPicker;