import React from 'react';
import { XCircle, FileText } from 'lucide-react';

interface AttachmentPreviewProps {
  selectedFile: File | null;
  selectedImage: any | null;
  onRemoveFile: () => void;
  onRemoveImage: () => void;
}

export const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  selectedFile,
  selectedImage,
  onRemoveFile,
  onRemoveImage
}) => {
  return (
    <>
      {selectedFile && (
        <div className="relative flex items-center mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
          <XCircle
            onClick={onRemoveFile}
            className="absolute top-0 right-0 text-black-500 text-sm cursor-pointer hover:text-black-700 transition-all duration-200"
          />
          <div className="flex items-center space-x-2">
            <FileText className="text-pink-500 text-lg" />
            <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
              {selectedFile.name}
            </span>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="relative flex items-center mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
          <XCircle
            onClick={onRemoveImage}
            className="absolute top-0 right-0 text-black-500 text-sm cursor-pointer hover:text-black-700 transition-all duration-200"
          />
          <div className="flex items-center space-x-4">
            <img
              src={selectedImage.url}
              className="w-10 h-10 object-cover rounded-lg"
            />
            <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
              {selectedImage.name}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
export default AttachmentPreview;