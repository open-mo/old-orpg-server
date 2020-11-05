import 'module-alias/register';
import WebSocket from 'ws';
import { initMessageHandler } from "handlers/dataHandler"
import { initializeDB } from "./database";
import {Dictionary, Packet} from "types/index";

const PORT: number = 8060;
const wss = new WebSocket.Server({ port: PORT });

let messageHandler: Dictionary<any>;

const initialize = async () => {
    initializeDB();
    messageHandler = initMessageHandler();
}

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        const { pkt, data }: Packet = JSON.parse(message);
        messageHandler[pkt]({ client: ws, ...data });
    });

    ws.on('close', () => {

    });
});

initialize();
console.log(`Server listening at *:${PORT}`);