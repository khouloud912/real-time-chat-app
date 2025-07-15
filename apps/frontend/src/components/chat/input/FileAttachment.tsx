import React from 'react';
import { Paperclip, Camera, Mic } from 'lucide-react';

interface FileAttachmentProps {
  onFileSelect: (file: File) => void;
  onImageSelect: (imageData: any) => void;
  onStartRecording: () => void;
}

export const FileAttachment: React.FC<FileAttachmentProps> = ({
  onFileSelect,
  onImageSelect,
  onStartRecording,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageSelect({ name: file.name, url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Mic
        onClick={onStartRecording}
        size={20}
        className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl ml-2"
      />

      <label htmlFor="file-upload">
        <Paperclip
          size={20}
          className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mx-2"
        />
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <label htmlFor="image-upload">
        <Camera
          size={20}
          className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mx-2"
        />
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleImageChange}
      />
    </>
  );
};
export default FileAttachment;