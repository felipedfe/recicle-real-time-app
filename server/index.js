const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);
const PORT = 4000;

// criamos um novo servidor do socket.io. Esse parâmetro do Cors indica que qual um pode
// fazer requisição para o servidor.
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// funciona como um EventListener. Sempre que um cliente se conectar ('connection') essa
// função é disparada. Dentro do connection listamos os eventos a serem ouvidos.
io.on("connection", (socket) => {
  console.log(`User Connected:`);

  socket.on("hello", (arg) => {
    console.log(arg);
    socket.broadcast.emit("hello", arg)
  });

  socket.on("hide-trash", (arg) => {
    console.log(arg);
    socket.broadcast.emit("hide-trash", arg);
  });

  socket.on("opponent-scored", (arg) => socket.broadcast.emit("opponent-scored", arg));

  // socket.on("image-move", (arg) => {
    // socket.broadcast.emit("image-move", arg);
  // });

});

server.listen(PORT, () => console.log(`connected -> port: ${PORT}`));
