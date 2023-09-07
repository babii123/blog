import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // 指定 Socket.io 服务器的地址

export default socket;
