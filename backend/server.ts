import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';


const server = createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000', methods: ['GET', "POST"] } })
const PORT = 8008;


server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
    io.on('connection', (socket: any) => {

        socket.on('invite', (msg: any) => {
            console.log("message received", msg)
            io.emit('new-con', msg)
        })

        //event to check if a connection request is accepted/rejected
        socket.on('con-detail', (msg: any) => {
            io.emit('con-detail', msg)
        })

        //event for code
        socket.on('message', (msg: any) => {
            console.log(msg)
            io.emit('code', msg)
        })
    })
})

export const SOCKET_IO = io
