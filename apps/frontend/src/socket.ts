import { io } from 'socket.io-client';

// Connect to the backend WebSocket server
const socket = io('http://localhost:4000');

export default socket;
