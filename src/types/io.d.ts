import { Socket } from 'socket.io';

export interface UserSocketMap {
    [userId: string]: Socket;
}
