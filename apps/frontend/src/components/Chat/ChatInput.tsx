import React, { useState, useRef, useEffect } from 'react';
import {
  SmileOutlined,
  CameraOutlined,
  PaperClipOutlined,
  AudioOutlined,
  SendOutlined,
  StopOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import { addMessage } from '../../api/messageApi';
import WaveSurfer from 'wavesurfer.js';

export const ChatInput = ({ senderId, receiverId }: any) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioData, setAudioData] = useState<Blob | null>(null);
  const timerRef = useRef<number | null>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = { senderId, receiverId, message };
      addMessage(messageData);
      setMessage('');
    }
  };

  const handleEmojiClick = (event: any, emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
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
          <StopOutlined
            onClick={stopRecording}
            className="text-blue-500 text-xl ml-4 cursor-pointer"
          />

          {/* Discard Recording Button */}
          <DeleteOutlined
            onClick={discardRecording}
            className="text-red-500 text-xl ml-4 cursor-pointer"
          />

          {/* Send Recording Button */}
          <SendOutlined
            onClick={sendRecording}
            className="text-green-500 text-xl ml-4 cursor-pointer"
          />
        </div>
      ) : (
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

          {/* Audio Recording Icon */}
          <AudioOutlined
            onClick={startRecording}
            className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl ml-2"
          />

          {/* File Attachment Icon */}
          <label htmlFor="file-upload">
            <PaperClipOutlined className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mx-2" />
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={() => {}}
          />

          {/* Camera Icon */}
          <label htmlFor="image-upload">
            <CameraOutlined className="text-gray-500 dark:text-gray-400 cursor-pointer text-xl mx-2" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={() => {}}
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
