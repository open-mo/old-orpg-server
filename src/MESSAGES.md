# Server <-> Client Messages

| SPacket | Parameters |
|----|----|
| **ServerPackets.LoginOk** | [player: *Player*] |
| **ServerPackets.LoginInvalid** | [] |
| **ServerPackets.UsernameAlreadyExists**  | [] |
| **ServerPackets.AccountCreated** | [newPlayer: *Player*] | 

| CPacket | Parameters|
| --- | ---|
| ClientPackets.NewAcount | { username: *string*, password: *string* }: *AuthenticationAttemptParams* |
| ClientPackets.Login | { username: *string*, password: *string* }: *AuthenticationAttemptParams* |