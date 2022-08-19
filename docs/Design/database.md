---
title: Database
sidebar_position: 1
---

## Database Choice

I chose MongoDB for persistent data storage and Redis for caching.

Sqlite database is used on client side for platforms that aren't based on browser (use local stroage in browser).

I will explain some fields that are no trivial to understand. I will explain how and where they are used and why they are necessary.

## Server-Side Database Schema

The database has 2 main collections, `users` and `records`, containing user data and clipboard data respectively.

<details>
<summary>Prisma Schema</summary>

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("MONGO_URL")
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
  deletedAt DateTime

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

## Client-Side Database

On the client-side sqlite is used.

<details>
<summary>Sqlite Schema</summary>

Since TypeORM is used to model the database, I will include the TypeORM entity class here.

[Link to GitHub](https://github.com/CrossCopy/crosscopy-core/blob/develop/src/database/entity/Rec.ts)

```ts
@Entity()
export class Rec extends BaseEntity {
  // Database id of record, is null when record is not uploaded to database yet
  @Column({ type: "varchar", nullable: true })
  id: string | null;

  // uuid of record, used to uniquely identify record within a user when a record has not been uploaded to database yet
  @PrimaryColumn({ type: "varchar" })
  uuid: string;

  // creation time of record
  @CreateDateColumn()
  createdAt: string;

  // device where the record is created (can be customized by user)
  @Column({ type: "varchar", default: "unknown" })
  device: string;

  // profile the record belongs to
  @Column({ type: "varchar", default: "Default" })
  profile: string;

  // type of record, either IMAGE or TEXT
  @Column({ type: "varchar", default: req.RecordType.Text })
  type: string;

  // user id
  @Column({ type: "varchar", nullable: true })
  userId: string;

  // content of record, encrypted string for text, url for image
  @Column({ type: "text", nullable: false })
  value: string;

  // whether is expired
  @Column({ type: "tinyint", default: 0 })
  expired: boolean;

  // whether is deleted
  @Column({ type: "tinyint", default: 0 })
  deleted: boolean;

  // deletion time, null if not deleted
  @Column({ type: "datetime", nullable: true })
  deletedAt: string;

  /**
   * whehter is insync, used to determine whether this record has been uploaded to database yet.
   * After a syned record is deleted in offline mode, it will be marked as deleted and not insync.
   * When connect resumes, all non-insync records will be uploaded/updated. Deleted records will be deleted in cloud DB.
   * Records created in offline mode will be marked as not insync and will be synced after connection is back.
   */
  @Column({ type: "tinyint", default: 0 })
  insync: string;
}
```

</details>

## Candidate Database

I am currently working on migrating persistent database from MongoDB to MySQL or PostgreSQL.

The reason being it's super hard to deploy a MongoDB replica set locally manually using docker. I found a method in Prisma issues, but it still doesn't work with Prisma.

This project is intended to be deployable by users completely locally (at home / office), so instead of wasting time searching for a solution with MongoDB, I'd rather choose a more mature solution and go with SQL.

See [Dev Env Setup](../Development/environment/index.md) for commands used to set up a seprate MySQL instance or easy setup using docker compose.
