import ChatSender from '../components/ChatSender';
import ChatReceiver from '../components/ChatReceiver';

function ChatPage() {
      return (
            <div>
                  <h1>Chat</h1>
                  <div>
                        <ChatSender />
                        <ChatReceiver />
                  </div>
            </div>
      );
}

export default ChatPage;
