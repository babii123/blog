import { useEffect, useState } from 'react';
import socket from '../lib/socket'; // 导入上面创建的 Socket.io 客户端

function ChatReceiver() {
      const [messages, setMessages] = useState<Array<string>>([]);

      useEffect(() => {
            socket.on('private-message', (message) => {
                  setMessages((prevMessages) => [...prevMessages, message]);
            });
      }, []);

      return (
            <div>
                  <ul>
                        {messages.map((message, index) => (
                              <li key={index}>{message}</li>
                        ))}
                  </ul>
            </div>
      );
}

export default ChatReceiver;
