---
title: Sync Design
---

Syncing is an important two-way communication mechanism that's a must for CrossCopy.

When a client is connected, we expect data uploaded to server from other devices to be synced to the client.

When a client is connected, we also expect data stored offline gets uploaded to server to keep other devices in sync.

I implemented a GraphQL version for manual syncing, and a SocketIO version for realtime syncing.

When Socket gets connected to the server, it will run a similar syncing algorithm to the GraphQL version (same service on server-side) to sync out-dated data. Later, the Socket will listen for SocketIO event and update data accordingly.
