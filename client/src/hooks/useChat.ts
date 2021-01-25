import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { IMessage } from 'types/message';

const CONNECTION_ERROR = 'connectionError';
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const GET_USERS_LIST = 'getUsersList';
const SOCKET_SERVER_URL = 'http://localhost:5000';

const useChat = (username?: string, userId?: string) => {
  const [error, setError] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]); // Sent and received messages
  const [users, setUsers] = useState<string[]>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (username && userId) {
      // Creates a WebSocket connection
      socketRef.current = io(SOCKET_SERVER_URL, {
        query: `username=${username}&userId=${userId}`
      });

      socketRef.current.on(CONNECTION_ERROR, (error: { message: string }) => {
        setError(error.message);
      });

      socketRef.current.on(GET_USERS_LIST, (users: string[]) => {
        socketRef.current?.emit(GET_USERS_LIST);
        setUsers(users);
      });

      // Listens for incoming messages
      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: IMessage) => {
        setMessages((messages) => [...messages, message]);
      });
    }

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current?.disconnect();
    };
  }, [username, userId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (content: string, author: string) => {
    socketRef.current?.emit(NEW_CHAT_MESSAGE_EVENT, {
      content,
      author,
      timestamp: new Date().toISOString()
    });
  };

  if (error) return { error };

  return { messages, sendMessage, users, error };
};

export default useChat;
