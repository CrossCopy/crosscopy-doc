---
title: WebSocket (Socket.IO)
---

[Socket.IO](https://socket.io/) is a wrapper for WebSocket with many extra functionalities to make things easier.

Socket.IO supports distributed system, I use [redis adapter](https://socket.io/docs/v4/redis-adapter/) to achieve it.


# SocketIO Syncing Design

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: connection: send all creation time of the latest-in-sync local record and local-only records
    Server->>Client: "init" event: Return records not on client-side + <br> uuid-id mapping for records uploaded to server
    Note left of Client: Update local storage and UI<br>1. Add database id to local records identified with uuid<br>2. Add new records to local storage (sort by created time)
    loop Long Connection Syncing
        Client->>Server: "update" event: notify server of new record upload (upload record)
        Server->>Client: "update" event: notify client of update (send records back to client)
    end
```

~~Version 1 assumes that the app will only work when connected to server. UI is updated after server responds.~~

The new design requires client app to work offline. 

The design is similar to the [regular graphql request design (Design 4)](./graphql.md), except that this will have a long connection.

A periodic syncing should be run to prevent any errors. Period: ~5 minutes.
