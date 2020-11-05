import {ClientPackets, ServerPackets} from "enums/packetTypes";

export type WebSocketMessage = string | ArrayBuffer | Buffer | Buffer[];

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface AccountCredentials {
    username: string;
    password: string;
}

export interface Packet {
    pkt: ClientPackets | ServerPackets;
    data: Array<any>;
}

export interface SingleServerMessage extends Packet {
    client: WebSocket;
}

export interface MapServerMessage extends Packet {
    location: number;
}