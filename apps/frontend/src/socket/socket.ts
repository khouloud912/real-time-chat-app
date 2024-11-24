import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  transports: ['websocket'], 
  reconnection: true,
  reconnectionAttempts: 5, 
});

socket.on('connect', () => {
  console.log('Connected to server, socket ID:', socket.id);
});

socket.on('receiveMessage', (message) => {
  console.log('Received message:', message);
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

export default socket;
