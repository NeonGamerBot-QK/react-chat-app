import React, { useEffect, useState } from 'react';
import './Messages.css';
interface User {
    name: string;
    id: string;
}
interface Message {
    id: string;
    time: number;
    user: User;
    value: string;
}
function Messages({ socket }: any) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message: any) => {
      setMessages((prevMessages) => {
        const newMessages:any = {...prevMessages};
        newMessages[message.id] = message;
        return newMessages;
      });
    };
  
    const deleteMessageListener = (messageID: any) => {
      setMessages((prevMessages) => {
        const newMessages:any = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      
      <button id="clear-messages" onClick={() => setMessages({ 
"SERVER-MESSAGE/": {
  id: "server-message",
  user: {
    id: "server",
    name: "SERVER",
  },
  value: "Cleared Messages for you",
    time: Date.now()
} as Message
      })}>
Clear Messages
       </button>

      {([...Object.values(messages)] as Message[])
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            id={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span className="user" id={message.user.id} key={message.user.id}>{message.user.name}:</span>
            <span className={"message " + (message.user.id === 'server' ? "server" : "") }>{message.value}</span>
            <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Messages;