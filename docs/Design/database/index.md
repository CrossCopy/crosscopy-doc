---
title: Database
---

> Database Design Overview

# Database Choice

I chose MySQL for persistent data storage and Redis for caching.

Sqlite database is used on client side for platforms that aren't based on browser (use local stroage in browser).

I will explain some fields that are not trivial to understand. I will explain how and where they are used and why they are necessary.

# Server-Side Database Schema

The database has 4 tables, `User`, `Profile`, `Device` and `Record`, containing user data and clipboard data.

<details>
<summary>Prisma Schema</summary>

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
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

enum Platform {
  UNKNOWN

  CLI
  WEB
  DESKTOP
  WINDOWS
  MACOS
  LINUX
  CHROMEOS

  MOBILE
  ANDROID
  IOS
  HARMONYOS
}

model Record {
  id        Int        @id @default(autoincrement())
  createdAt DateTime   @default(now())
  // Adding userId to record violates is not the best schema design but simplifies the code a lot, and could potentially reduce runtime
  // This could be potentially removed later after testing performance
  user      User       @relation(fields: [userId], references: [id])
  userId    Int
  device    Device     @relation(fields: [deviceId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  deviceId  Int
  profile   Profile    @relation(fields: [profileId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  profileId Int
  uuid      String
  type      RecordType @default(TEXT)
  value     String
  expired   Boolean    @default(false)
  deleted   Boolean    @default(false)
  deletedAt DateTime   @default(now())
}

model Profile {
  id          Int      @id @default(autoincrement())
  profileName String
  createdAt   DateTime @default(now())
  userId      Int
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  preferences Json     @default("{}")
  Record      Record[]

  @@unique([userId, profileName], name: "UniqueProfileNameWithinUser")
}

model Device {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  userId      Int
  preferences Json     @default("{}")
  deviceName  String   @default("unknown")
  platform    Platform @default(UNKNOWN)
  Record      Record[]

  @@unique([userId, deviceName], name: "UniqueDeviceNameWithinUser")
}

model User {
  id              Int       @id @default(autoincrement())
  activated       Boolean   @default(false)
  createdAt       DateTime  @default(now())
  username        String    @unique
  email           String    @unique
  lastRecordId    Int       @default(0)
  password        String
  recordCount     Int       @default(0)
  recordQuota     Int       @default(5)
  connectionQuota Int       @default(2)
  role            Role      @default(USER)
  preferences     Json      @default("{}")
  tokenVersion    String    @default("0")
  defaultTheme    Theme     @default(DARK)
  profiles        Profile[]
  Device          Device[]
  Record          Record[]
}
```

</details>

# Client-Side Database

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

# Reason for Choosing SQL

I started implementing the project with MongoDB as the persistent DB, but then migrated to SQL Database.

MongoDB is great. It supports complex data structure as a document database. If I need 4 tables with SQL, I only need 2 collections with MongoDB.

The reason why I migrated to SQL is that it's super hard to deploy a MongoDB replica set locally manually using docker. I found a method in Prisma issues, but it still doesn't work with Prisma.

This project is intended to be deployable by users completely locally (at home / office), so instead of wasting time searching for a solution with MongoDB, I'd rather choose a more mature solution and go with SQL.

See [Dev Env Setup](../Development/environment/index.md) for commands used to set up a seprate MySQL instance or easy setup using docker compose.
