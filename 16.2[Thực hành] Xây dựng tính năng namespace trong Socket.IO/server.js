
const port = 3000;
const http = require("http").createServer();
const io = require("socket.io")(http);

const gameRooms = ["codegym1", "codegym2", "codegym3"]

io.of("/games")
    .on("connection", (socket)=>{
        console.log("new client");
        socket.emit("welcome", "Hello and welcome to the Game ");
        socket.on("joinRoom", (room)=>{
            if (gameRooms.includes(room)){
                socket.join(room);
                io
                    .of("/games")
                    .in(room)
                    .emit("newUser", "New Player has join of the "+ room)
                return socket.emit("sucsess", "You have succefully joined this room");
            }
            else {
                socket.emit("err", "Error, no room named " + room);
            }
            socket.disconnect();

        })
    })

http.listen(port, ()=> {
    console.log("Server is listening on localhost: " + port);
})

