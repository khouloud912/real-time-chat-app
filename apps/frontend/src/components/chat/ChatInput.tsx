import React, { useState, useRef, useEffect } from 'react';
import {
  Smile,
  Camera,
  Paperclip,
  Mic,
  Send,
  Square,
  Trash2,
  FileText,
  XCircle,
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import WaveSurfer from 'wavesurfer.js';
import {useAddMessage} from '../../api/messageApi';

export const ChatInput = ({ senderId, receiverId }: any) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioData, setAudioData] = useState<Blob | null>(null);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const timerRef = useRef<number | null>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const addMessageMutation = useAddMessage();

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData: any = { senderId, receiverId, message };
      if (selectedFile) messageData.file = selectedFile;
      if (selectedImage) messageData.image = selectedImage.url;

      addMessageMutation.mutate(messageData, {
        onSuccess: (data) => {
          console.log('Message added successfully:', data);
        },
        onError: (error) => {
          console.error('Failed to add message:', error);
        }
      });
      setMessage('');
    }
  };

  const handleEmojiClick = (emojiObject: any) => {
    console.log('emojiObject', emojiObject);

    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessage((prevMessage) =>
        prevMessage
          ? `${prevMessage} [File: ${file.name}]`
          : `[File: ${file.name}]`
      );
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage({ name: file.name, url: reader.result });
        setMessage((prevMessage) => `${prevMessage} [Image: ${file.name}]`);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    audioChunksRef.current = [];

    // Initialize MediaRecorder
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/wav',
          });
          setAudioData(audioBlob);
          // Check if waveRef is available before initializing WaveSurfer
          if (waveRef.current && wavesurferRef.current) {
            wavesurferRef.current.load(URL.createObjectURL(audioBlob));
          }
        };

        mediaRecorderRef.current.start();
      })
      .catch((err) => console.error('Error accessing audio devices:', err));

    // Start timer
    timerRef.current = window.setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const discardRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    audioChunksRef.current = [];
  };

  const sendRecording = () => {
    stopRecording();
    if (audioData) {
      // Here you can send the audio file to your backend
      console.log('Audio recording sent');
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    // Initialize wavesurfer.js only if waveRef is available
    if (waveRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveRef.current,
        waveColor: 'red',
        progressColor: 'green',
        height: 50,
        barWidth: 3,
        barHeight: 1,
      });
    }

    return () => {
      // Cleanup when component unmounts
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex items-center p-2 sm:p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 relative">
      {isRecording ? (
        <div className="flex items-center w-full bg-gray-100 dark:bg-gray-900 p-2 rounded-lg">
          {/* Waveform Animation */}
          <div ref={waveRef} className="w-full"></div>

          {/* Recording Timer */}
          <span className="text-red-500 font-semibold text-sm">
            Recording: {formatTime(recordingTime)}
          </span>

          {/* Stop Recording Button */}
          <Square
            onClick={stopRecording}
            className="text-blue-500 text-xl ml-4 cursor-pointer"
          />

          {/* Discard Recording Button */}
          <Trash2
            onClick={discardRecording}
            className="text-red-500 text-xl ml-4 cursor-pointer"
          />

          {/* Send Recording Button */}
          <Send
            onClick={sendRecording}
            className="text-green-500 text-xl ml-4 cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex items-center w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2">
          {/* Emoji Picker Icon */}
          <Smile
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mr-3"
          />
          {selectedFile && (
            <div className="relative flex items-center mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
              {/* Close Button */}
              <XCircle
                onClick={() => setSelectedFile(null)}
                className="absolute top-0 right-0 text-black-500 text-sm cursor-pointer hover:text-black-700 transition-all duration-200"
              />

              {/* PDF Icon and File Name */}
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
              {/* Close Button */}
              <XCircle
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 text-black-500 text-sm cursor-pointer hover:text-black-700 transition-all duration-200"
              />

              {/* Image Preview and File Name */}
              <div className="flex items-center space-x-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="w-10 h-10 object-cover rounded-lg"
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
                  {selectedImage.name}
                </span>
              </div>
            </div>
          )}
          {/* Input Field */}
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base dark:text-white"
            placeholder={
              selectedFile || selectedImage ? '' : 'Type a message...'
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />

          {/* Audio Recording Icon */}
          <Mic
            onClick={startRecording}
            size={20}
            className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl ml-2"
          />

          {/* File Attachment Icon */}
          <label htmlFor="file-upload">
            <Paperclip size={20} className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mx-2" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Camera Icon */}
          <label htmlFor="image-upload">
            <Camera  size={20} className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mx-2" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-0 mb-2 sm:mb-3">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};
