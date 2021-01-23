import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { IMessage } from 'types/message';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const SOCKET_SERVER_URL = 'http://localhost:5000';

const useChat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]); // Sent and received messages
  const socketRef = useRef<Socket>();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = io(SOCKET_SERVER_URL);

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: IMessage) => {
      setMessages((messages) => [...messages, message]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (content: string, author: string) => {
    socketRef.current?.emit(NEW_CHAT_MESSAGE_EVENT, {
      content,
      author,
      timestamp: new Date().toISOString()
    });
  };

  return { messages, sendMessage };
};

export default useChat;
