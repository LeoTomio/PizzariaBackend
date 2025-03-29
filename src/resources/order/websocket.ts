import { getIO } from "../../websockets/socketHandlers";

export function emitNewOrder(url: string, order: any) {
    const io = getIO();
    io.emit(`newOrder:${url}`, order);
}