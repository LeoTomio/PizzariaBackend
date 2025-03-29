
import { Server } from 'socket.io';

let io: Server | null = null;

export function initializeSocket(server: any) {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });
}

export function getIO() {
    if (!io) {
        throw new Error('O objeto io ainda não foi inicializado!');
    }
    return io;
}

