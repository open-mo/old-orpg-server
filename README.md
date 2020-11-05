# MORPG Server

### About
This is the project for the **M**ultiplayer **O**nline RPG game. For the client, refer to (LINK SOON) repository.


### Conventions
#### Messages
**[Client <-> Server]** - Both uses their respective enumerators (ClientPackets/ServerPackets).
By convention doing this, we can use a single strategy to handle messages.
##### Client messages to server
```json
{
  "pkt": ClientPackets.WHICH,
  "data": {}
}
```

##### Server messages to client
```json
{
  "pkt": ServerPackets.WHICH,
  "data": {}
}
```

### Folder structure
```
src/
   enums/*
   types/*
   structures/* -> structures used both by server and db.
   database/* -> responsible for database abstractions.
   handlers/* -> packet handlers for both received and sent packets.
   scripts/* -> scripts to perform specific actions. used outside server.
```