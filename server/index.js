import { Server } from 'socket.io';
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

// criamos um novo servidor do socket.io. Esse parâmetro do Cors indica que qual um pode
// fazer requisição para o servidor.
const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

// fucniona como um EventListener. Sempre que um cliente se conectar ('connection') essa
// função é disparada.
io.on('connection', (socket) => {
  // socket.io
})