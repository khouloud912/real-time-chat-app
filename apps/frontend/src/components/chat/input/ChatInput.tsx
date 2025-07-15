import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { EmojiPicker } from './EmojiPicker';
import { FileAttachment } from './FileAttachment';
import { AudioRecorder } from './AudioRecorder';
import { AttachmentPreview } from './AttachmentPreview';
import { useAddMessage } from '../../../api/messageApi';

interface ChatInputProps {
  senderId: string;
  receiverId: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  senderId,
  receiverId,
}) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const addMessageMutation = useAddMessage();

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData: any = { senderId, receiverId, message };
      if (selectedFile) messageData.file = selectedFile;
      if (selectedImage) messageData.image = selectedImage.url;

      addMessageMutation.mutate(messageData, {
        onSuccess: (data) => {
          console.log('Message added successfully:', data);
          resetForm();
        },
        onError: (error) => {
          console.error('Failed to add message:', error);
        },
      });
    }
  };

  const resetForm = () => {
    setMessage('');
    setSelectedFile(null);
    setSelectedImage(null);
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setMessage((prev) =>
      prev ? `${prev} [File: ${file.name}]` : `[File: ${file.name}]`
    );
  };

  const handleImageSelect = (imageData: any) => {
    setSelectedImage(imageData);
    setMessage((prev) => `${prev} [Image: ${imageData.name}]`);
  };

  const removeFile = () => {
    setSelectedFile(null);
    // Remove file reference from message
    setMessage((prev) => prev.replace(/\[File: [^\]]+\]/g, '').trim());
  };

  const removeImage = () => {
    setSelectedImage(null);
    // Remove image reference from message
    setMessage((prev) => prev.replace(/\[Image: [^\]]+\]/g, '').trim());
  };

  if (isRecording) {
    return (
      <AudioRecorder
        onStopRecording={() => setIsRecording(false)}
        onSendRecording={(audioData) => {
          // Handle audio sending logic
          console.log('Audio recording sent', audioData);
          setIsRecording(false);
        }}
      />
    );
  }

  return (
    <div className="flex items-center p-2 sm:p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 relative">
      <div className="flex items-center w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2">
        <EmojiPicker onEmojiSelect={handleEmojiSelect} />

        <AttachmentPreview
          selectedFile={selectedFile}
          selectedImage={selectedImage}
          onRemoveFile={removeFile}
          onRemoveImage={removeImage}
        />

        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base dark:text-white"
          placeholder={selectedFile || selectedImage ? '' : 'Type a message...'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />

        <FileAttachment
          onFileSelect={handleFileSelect}
          onImageSelect={handleImageSelect}
          onStartRecording={() => setIsRecording(true)}
        />

        <Send
          onClick={handleSendMessage}
          className="text-blue-500 cursor-pointer ml-2"
          size={20}
        />
      </div>
    </div>
  );
};
export default ChatInput;