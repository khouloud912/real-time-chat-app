import { useState, useEffect } from 'react';
import {
  PhoneOutlined,
  VideoCameraOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import socket from '../../socket/socket';

const CallComponent = ({ isCaller, userId }) => {
  const [isInterfaceVisible, setIsInterfaceVisible] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [callerImage, setCallerImage] = useState(
    'https://via.placeholder.com/150'
  );

  useEffect(() => {
    // Listen for incoming call event
    socket.on('incomingCall', (callerData) => {
      if (!isCaller) {
        setCallerImage(callerData.image);
        setIsInterfaceVisible(true); // Show modal when there's an incoming call
      }
    });

    // Clean up on unmount
    return () => {
      socket.off('incomingCall');
    };
  }, [isCaller]);

  // Toggle phone/video call interface visibility
  const toggleCallInterface = (callType) => {
    setIsVideoCall(callType === 'video'); // Set the call type based on the button clicked
    socket.emit('makeCall', { userId, callType }); // Emit the call initiation event to the server
    setIsInterfaceVisible(true); // Show the call interface modal
  };

  // Close the call interface
  const closeCallInterface = () => {
    setIsInterfaceVisible(false);
    socket.emit('endCall', { userId }); // Emit end call event to the server
  };

  // Accept the call (phone/video)
  const acceptCall = () => {
    socket.emit('acceptCall', { userId });
    alert('Call Accepted!');
    closeCallInterface(); // Close the modal when the call is accepted
  };

  // Reject the call
  const rejectCall = () => {
    socket.emit('rejectCall', { userId });
    alert('Call Rejected');
    closeCallInterface(); // Close the modal when the call is rejected
  };

  return (
    <div>
      {/* If the user is the caller, show the buttons to start a call */}
      {!isCaller && (
        <>
          <PhoneOutlined
            onClick={() => toggleCallInterface('phone')}
            className="text-gray-600 mr-1 dark:text-gray-400 cursor-pointer"
          />
          <VideoCameraOutlined
            onClick={() => toggleCallInterface('video')}
            className="text-gray-600 dark:text-gray-400 cursor-pointer"
          />
        </>
      )}

      {/* If the user is the recipient, show the call interface modal */}
      {isInterfaceVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="call-interface bg-white p-8 rounded-lg shadow-lg w-80 md:w-96 text-center">
            {/* Caller Image */}
            <div className="caller-image mb-6">
              <img
                src={callerImage}
                alt="Caller"
                className="rounded-full w-32 h-32 mx-auto border-4 border-gray-300"
              />
            </div>

            <p className="text-gray-600 mb-6">
              {isCaller ? 'Calling ...' : 'Incoming Call'}
            </p>

            {/* Action Buttons */}
            <div className="call-actions flex justify-center gap-4">
              {/* Reject button (always visible for recipient) */}
              {!isCaller && (
                <button
                  onClick={rejectCall}
                  className="text-red-600 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                  title="Reject Call"
                >
                  <CloseOutlined style={{ fontSize: '1.5rem' }} />
                </button>
              )}

              {/* Accept button */}
              <button
                onClick={acceptCall}
                className="text-green-600 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                title="Accept Call"
              >
                {isVideoCall ? (
                  <VideoCameraOutlined style={{ fontSize: '1.5rem' }} />
                ) : (
                  <PhoneOutlined style={{ fontSize: '1.5rem' }} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallComponent;
