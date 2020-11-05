import bcrypt from "bcrypt";
import {ClientPackets, ServerPackets} from "enums";
import {AccountCredentials, Dictionary} from "types";
import {sendClientMessage} from "handlers/messageSender";
import {findOne, insertOne} from "../database";
import {MongoError} from "mongodb";

const dataHandler: Dictionary<any> = {};

export const initMessageHandler = () => {
    dataHandler[ClientPackets.NewAccount] = handleNewAccount;
    dataHandler[ClientPackets.Login] = handleLogin;

    return dataHandler;
}

interface AuthenticationAttemptParams extends AccountCredentials {
    client: WebSocket;
}

const handleLogin = async ({ client, username, password }: AuthenticationAttemptParams) => {
    findOne('users', { username }, (err, user: any) => {
        if (err) return console.error(err);
        /* User exists and we can now validate them */
        if (user) {
            bcrypt.compare(password, user.password, (err: Error, isCredentialsValid: boolean) => {
                /* User is valid */
                if (isCredentialsValid) {
                    // TODO: Get player and world data -> Send LoginOk packet.
                    sendClientMessage({
                        client,
                        pkt: ServerPackets.LoginOk,
                        data: []
                    });
                } else {
                    sendClientMessage({
                        client,
                        pkt: ServerPackets.LoginInvalid,
                        data: []
                    });
                }
            })
        } else {
            // TODO: Send non-existent account packet. For now is just a LoginInvalid.
            sendClientMessage({
                client,
                pkt: ServerPackets.LoginInvalid,
                data: []
            });

        }
    });
}

const handleNewAccount = ({ client, username, password }: AuthenticationAttemptParams) => {
    console.log(`New account:\nUser: ${username}\nPass: ${password}`);
    /* Check first if username is available */
    findOne('users', { username }, (err, user) => {
        if (user) {
            return sendClientMessage({
                client,
                pkt: ServerPackets.UsernameAlreadyExists,
                data: [],
            });
        }

        /* Can create account */
        bcrypt.hash(password, 10, (err: Error, hash: string) => {
            insertOne('users', { username, password: hash }, (err: MongoError, result: any) => {
                if (!!result) {
                    return sendClientMessage({
                        client,
                        pkt: ServerPackets.AccountCreated,
                        data: []
                    });
                }
            });
        });
    });
}
