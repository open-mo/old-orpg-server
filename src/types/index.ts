import {ClientPackets, ItemType, ServerPackets} from "enums/packetTypes";

export type WebSocketMessage = string | ArrayBuffer | Buffer | Buffer[];

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface AccountCredentials {
    username: string;
    password: string;
}

export interface CPlayerMove {
    player: Player;
    direction: Position;
}

export interface SPlayerMove {
    player: Player;
    position: Position;
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

export interface Position {
    x: number;
    y: number;
}

/* TODO: Extend this */
interface Item {
    name: string;
    type: ItemType;
}

export interface Player {
    _id: string;
    name: string;
    inventory: Dictionary<Item>;
    animation: string;
    position: Position;
}