const http = require("http").createServer().listen(3000, '0.0.0.0')
const io = require("socket.io")(http)

io.on('connection', socket => {

  socket.on("join", (room, username) => {
    if(username != ""){
      
      socket.leaveAll()
      socket.join(room)
      
      io.in(room).emit("receive", `${username} joined the chat.`)
    }
  })
  
  socket.on('send', (msg, room, name) => {
    io.in(room).emit("receive", `${name}: ${msg}`)
  })
})