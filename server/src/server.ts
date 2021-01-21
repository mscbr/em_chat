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
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on('connection', (socket: Socket) => {
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.emit(NEW_CHAT_MESSAGE_EVENT, data);
  })
})

httpServer.listen(PORT, () => {
  console.log(`APP RUNNING ON PORT: ${PORT}`);
});