---
title: Message Queue
---

Message Queue is used for some asynchronous tasks and making the application more extendable in the future.

Currently, we use Kafka as the message queue, and it's only used for email ownership verification (with a notifiction service).

I designed a plugin system on client-side to let users customize what they need. Later, if I could find a proper use case, Kafka could be used to implement a similar server-side plugin system with the [open-closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) in mind.
