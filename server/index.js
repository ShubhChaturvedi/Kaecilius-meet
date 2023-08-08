const { Server } = require("socket.io");

const io = new Server(8000, {
    cors: true
});

const emailToSocketID = new Map();
const socketIDToEmail = new Map();

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("join-room", (data) => {
        const {email, code} = data;
        emailToSocketID.set(email, socket.id);
        socketIDToEmail.set(socket.id, email);
        io.to(code).emit("user:joined", {email, id:socket.id});
        socket.join(code);
        io.to(socket.id).emit("join-room",data)
    });
    socket.on("user:call", (to, offer)=>{
        io.to(to).emit("incomming:call", {from: socket.id, offer});
    })
});

