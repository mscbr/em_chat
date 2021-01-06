import React, { useState } from 'react';

import MessageInput from 'components/messageInput';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const handleSendMessage = () => {
    setMessages((state) => [...state, message]);
    setMessage('');
  };
  return (
    <>
      <MessageInput
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onSend={handleSendMessage}
      />
      <ul>
        {messages.map((item, i) => (
          <li key={`${i}-item`}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Chat;
