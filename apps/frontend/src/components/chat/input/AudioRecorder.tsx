import React, { useState, useRef, useEffect } from 'react';
import { Square, Trash2, Send } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

interface AudioRecorderProps {
  onStopRecording: () => void;
  onSendRecording: (audioData: Blob) => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onStopRecording,
  onSendRecording,
}) => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioData, setAudioData] = useState<Blob | null>(null);

  const timerRef = useRef<number | null>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startRecording = () => {
    setRecordingTime(0);
    audioChunksRef.current = [];

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
          if (waveRef.current && wavesurferRef.current) {
            wavesurferRef.current.load(URL.createObjectURL(audioBlob));
          }
        };

        mediaRecorderRef.current.start();
      })
      .catch((err) => console.error('Error accessing audio devices:', err));

    timerRef.current = window.setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onStopRecording();
  };

  const discardRecording = () => {
    stopRecording();
    audioChunksRef.current = [];
    setAudioData(null);
  };

  const sendRecording = () => {
    if (audioData) {
      onSendRecording(audioData);
    }
  };

  useEffect(() => {
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

    startRecording();

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center p-2 sm:p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="flex items-center w-full bg-gray-100 dark:bg-gray-900 p-2 rounded-lg">
        <div ref={waveRef} className="w-full"></div>

        <span className="text-red-500 font-semibold text-sm">
          Recording: {formatTime(recordingTime)}
        </span>

        <Square
          onClick={stopRecording}
          className="text-blue-500 text-xl ml-4 cursor-pointer"
        />

        <Trash2
          onClick={discardRecording}
          className="text-red-500 text-xl ml-4 cursor-pointer"
        />

        <Send
          onClick={sendRecording}
          className="text-green-500 text-xl ml-4 cursor-pointer"
        />
      </div>
    </div>
  );
};
export default AudioRecorder;