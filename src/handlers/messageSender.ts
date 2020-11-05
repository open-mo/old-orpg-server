import {MapServerMessage, Packet, SingleServerMessage} from "types/index";

const composeMessage = ({ pkt, data }: Packet): string => {
    return JSON.stringify({ pkt, data });
}

/* Sends directly to specified client */
const sendClientMessage = ({ client, pkt, data }: SingleServerMessage): void => {
    client.send(composeMessage({ pkt, data }));
}

/* Sends to people in desired region (map) */
const sendMapMessage = ({ location, pkt, data }: MapServerMessage): void => {

}

/* Send to everyone connected */
const sendWorldMessage = (): void => {}

export { sendClientMessage, sendMapMessage, sendWorldMessage };