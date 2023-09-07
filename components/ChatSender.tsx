import { useEffect, useState } from 'react';
import socket from '../lib/socket'; // 导入上面创建的 Socket.io 客户端

function ChatSender() {
      const [message, setMessage] = useState('');

      const sendMessage = () => {
            socket.emit('private-message', message);
            setMessage('');
      };

      return (
            <div>
                  <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                  />
                  <button onClick={sendMessage}>Send</button>
            </div>
      );
}

export default ChatSender;
