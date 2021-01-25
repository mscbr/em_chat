import express, { Application } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app: Application = express();

const httpServer = createServer(app);
let io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = 5000;
const CONNECTION_ERROR = "connectionError";
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const GET_USERS_LIST = "getUsersList";

let usersList: Array<{username: string; userId: string;}> = []

type SocketPayload = Socket & {
  handshake: {
    query: {
      username: string;
      userId: string;
    }
  }
}

io.on('connection', (socket: SocketPayload) => {
  const { username, userId } = socket.handshake.query;

  if (username && userId) {
    const usernames = usersList.map(user => user.username);
    if (usernames.indexOf(username) >= 0) {
      socket.emit(CONNECTION_ERROR, { message: "Username already in use" });
      socket.disconnect(true);
      return;
    }
    usersList.push({ username, userId });
  } else {
    socket.emit(CONNECTION_ERROR, { message: "Username not provided" });
    socket.disconnect(true);
  }
  socket.emit(GET_USERS_LIST, usersList.map(user => user.username));

  socket.on(GET_USERS_LIST, () => {
    socket.emit(GET_USERS_LIST, usersList.map(user => user.username));
  });

  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.emit(NEW_CHAT_MESSAGE_EVENT, data);
  });
  socket.on('disconnect', () => {
    usersList = [...usersList].filter(user => user.userId !== userId);
  })
})

httpServer.listen(PORT, () => {
  console.log(`APP RUNNING ON PORT: ${PORT}`);
});