export enum ServerPackets {
    LoginOk,
    LoginInvalid,
    AccountCreated,
    UsernameAlreadyExists,
    PlayerMove,
    Size
}

export enum ClientPackets {
    NewAccount,
    Login,
    PlayerMove,
}