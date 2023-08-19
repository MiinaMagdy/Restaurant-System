// Including Express Package
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

// Serve the chat room page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

let pages = ['chat', 'login', 'signup', 'book', 'menu', 'home', 'dashboard'];

for (let page of pages) {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(__dirname + `/views/${page}.html`);
    });
}

// Including Morgan Package
const morgan = require("morgan")
app.use(morgan("dev"))

// Including Cors Package
const cors = require("cors")
app.use(cors())

// Setting up the bodyParser
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Connection to MongoDB
require("./connection/mongoose")

// Routes
const cuisineRouter = require("./routes/Cuisine")
const User = require("./routes/User")

// Injections
app.use('/api/v1/cuisines', cuisineRouter)
app.use("/api/v1/users", User);

const users = {};

const room1 = 'admin-staff';
const room2 = 'admin-client';

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('new-user', data => {  // listens on new-user for new users and then assigns them to a room
      console.log(`${data.name} just joined as ${data.role}`);
      users[socket.id] = data;

      if (data.role === 'admin' && data.whichRoom === '1') {
          socket.join(room1);
          socket.broadcast.to(room1).emit('user-connected', data);
      } else if (data.role === 'admin' && data.whichRoom === '2') {
          socket.join(room2);
          socket.broadcast.to(room2).emit('user-connected', data);
      } else if (['chief', 'staff', 'delivery'].includes(data.role)) {
          socket.join(room1);
          socket.broadcast.to(room1).emit('user-connected', data);
      } else if (data.role === 'client') {
          socket.join(room2);
          socket.broadcast.to(room2).emit('user-connected', data);
      }
  });

  socket.on(room1, data => { // listens on the room and then broadcasts the message for all room members except the sender
      console.log(`message in ${room1}: ${data.message}`);
      socket.broadcast.to(room1).emit('chat message', data);
  });

  socket.on(room2, data => { // listens on the room and then broadcasts the message for all room members except the sender
      console.log(`message in ${room2}: ${data.message}`);
      socket.broadcast.to(room2).emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    
    // Get user data from the users object using socket.id
    const user = users[socket.id];

    
    if (user) {
        let roomToNotify;
        
        if (user.role === 'admin' && user.whichRoom === '1') {
            roomToNotify = room1;
        } else if (user.role === 'admin' && user.whichRoom === '2') {
            roomToNotify = room2;
        } else if (['chief', 'staff', 'delivery'].includes(user.role)) {
            roomToNotify = room1;
        } else if (user.role === 'client') {
            roomToNotify = room2;
        }

        if (roomToNotify) {
            socket.broadcast.to(roomToNotify).emit('user-disconnected', user);
            console.log(`${user.name} left the chat`);
        }

        // Remove the user from the users object
        delete users[socket.id];
    }
});
});

// The NodeJS App is running on port 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export app
module.exports = app;
