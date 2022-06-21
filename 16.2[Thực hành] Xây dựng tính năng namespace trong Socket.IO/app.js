
const  io = require("socket.io-client");
let games = io.connect("http://localhost:3000/games");
games.on("welcome", (mgs)=>{
    console.log("recevied: ", mgs);
})
games.emit("joinRoom", "codegym1");
games.on("newUser", (res)=> console.log(res))
games.on("err", (err) => console.log(err) );
games.on("success", (res) => console.log(res) );
