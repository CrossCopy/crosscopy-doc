---
title: Redis Design
---

> Redis is a in-memory key-value database.
>
> This document contains the the key value design and description for each type of key.

# Redis Key Design

| name                       | Key                                                   | Description                       |
| -------------------------- | ----------------------------------------------------- | --------------------------------- |
| ID - User Json Mapping     | `user:id:{id}`                                        | Map user id to JSON object        |
| Email - User Id Mapping    | `user:email:{email}`                                  | Map user email to user id         |
| Username - User Id Mapping | `user:username:{username}`                            | Map user username to user id      |
| Signup Email Verification  | `signup:email-verification:{username}:{email}:{code}` | Hash Map (status and chance-left) |

# Details

## User

### ID - User Json Mapping

Pattern: `user:id:{id}`

```json {title="Key: user:id:10"}
{
  "id": 10,
  "username": "user",
  "email": "email@email.com"
}
```

### Email - User Id Mapping

Pattern: `user:email:{email}`

```json {title="Key: user:email:email@email.com""}
10
```

### Username - User Id Mapping

Pattern: `user:username:{username}`

```json {title="Key: user:username:user"}
10
```

### Signup Email Verification

Pattern: `signup:email-verification:{username}:{email}:{code}`

Value is a Hash Map

```json {title="Key: signup:email-verification:{username}:{email}:{code}"}
{
    "status": "not-verified" | "verified",
    "chance-left": "2" | "1" | "0"
}
```

When `chance-left` drops to 0, the email ownership verification process is terminated and has to be started again.

## Clipboard Record
