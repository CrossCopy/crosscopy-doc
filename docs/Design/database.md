---
title: Database
sidebar_position: 1
---

## Database Choice

I chose MongoDB for persistent data storage and Redis for caching.

Note that there is also a sqlite database on client side for platforms that aren't based on browser (use local stroage in browser).

## Database Schema

The database has 2 main collections, `users` and `records`, containing user data and clipboard data respectively.

<details>
<summary>Prisma Schema</summary>

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = "mongodb://localhost:27017/crosscopy-dev"
}

enum FilterListType {
  BLACKLIST
  MIXED
  WHITELIST
}

enum RecordType {
  IMAGE
  TEXT
}

enum Role {
  ADMIN
  USER
}

enum Theme {
  DARK
  LIGHT
}

model Record {
  id        String     @id @default(auto()) @map("_id") @db.ObjectId
  createdAt DateTime   @default(now()) @db.Date
  device    String     @default("unknown")
  uuid      String
  profile   String     @default("Default")
  type      RecordType @default(TEXT)
  user      User       @relation(fields: [userId], references: [id])
  userId    String     @db.ObjectId
  value     String
  expired   Boolean    @default(false)
  deleted   Boolean    @default(false)

  @@unique([userId, uuid], name: "UniqueUuidWithinUser")
}

model User {
  id              String         @id @default(auto()) @map("_id") @db.ObjectId
  activated       Boolean        @default(false)
  blacklist       String[]
  createdAt       DateTime       @default(now()) @db.Date
  email           String         @unique
  filterListType  FilterListType @default(BLACKLIST)
  lastRecordId    Int            @default(0)
  password        String
  profiles        String[]
  recordCount     Int            @default(0)
  recordQuota     Int            @default(5)
  connectionQuota Int            @default(2)
  records         Record[]
  role            Role           @default(USER)
  tokenVersion    String         @default("0")
  username        String         @unique
  whitelist       String[]
  defaultTheme    Theme          @default(DARK)
}

```
</details>