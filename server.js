
const path = require('path');
const http = require('http');
const express = require('express');
const formatMessage = require('./utils/message');
const { userJoin, getCurrentUser,userLeave, getRoomUsers}= require('./utils/users');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'chat')));

const botname = 'chatBot';

io.on('connection', (socket) => {
  console.log("connecting....");
 

  socket.on('joinRoom',({username,room})=>{
    const user=userJoin(socket.id,username,room);    
    socket.join(user.room);
    socket.emit('message', formatMessage(botname, 'welcome to chat app'));
    socket.broadcast.to(user.room).emit('message', formatMessage(botname, `${user.username} joined the chat`));
    io.to(user.room).emit('roomUsers',{
      room:user.room,
      users:getRoomUsers(user.room)
    })

  });

  socket.on('chatMessage', (msg) => {
    const user=getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));

  });

  /*socket.on('disconnect', () => {
    const user=userLeave(socket.id);
    if(user){
    io.to(user.room).emit('message', formatMessage(botname, `${user.username} had left the chat`));
    }
    io.to(user.room).emit('roomUsers',{
      room:user.room,
      users:getRoomUsers(user.room)
    })
  });*/
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit('message', formatMessage(botname, `${user.username} has left the chat`));
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
