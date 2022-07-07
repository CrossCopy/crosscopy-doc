---
title: Environment
sidebar_position: 1
---

This project is completely in the ecosystem of JS for now. `TypeScript` is the main language of the project.

JS runtime used is **Node.js (16+)**.

Since we use Node.js runtime, you may develop on any desktop OS.

Under each project, there will be more specific instructions on environment setup.

To develop locally, you will need to setup some services, such as mongodb, redis, and kafka. It's quite similar to [Self-Deployment](../../Deployment/self-deploy).

Personally I prefer to use Docker to spin up all of these services. I will provide a complete `docker-compose.yml` file in the end of this page, don't run individual docker compose file for each service.

You can also use cloud services during development which I don't like. Some simple instructions are included.

Maintaining a working docker env setup is useful for me as I use docker for testing anyways.

## Node.js

```bash
# install Node.js 16+
sudo npm i -g nodemon typescript ts-node
```

These packages are recommended to be installed globally, but not necessary.

## IDE

VSCode is recommanded.

### Extensions

| Extension          | Extension ID                                 | Purpose                                                                        |
| ------------------ | -------------------------------------------- | ------------------------------------------------------------------------------ |
| Docker             | ms-azuretools.vscode-docker                  |                                                                                |
| ESLint             | dbaeumer.vscode-eslint                       | JS Linting                                                                     |
| GraphQL            | GraphQL.vscode-graphql                       |                                                                                |
| Prisma             | Prisma.prisma                                | Prisma Schema Format, highlight, auto-complete                                 |
| Prettier           | esbenp.prettier-vscode                       |                                                                                |
| Volar              | Vue.volar                                    | For Vue and Nuxt                                                               |
| Remote Development | ms-vscode-remote.vscode-remote-extensionpack | Collection of Extensions for remote development (remote ssh, docker container) |

## Local Environment Setup with Docker

### MongoDB

CrossCopy's backend uses [Prisma](https://www.prisma.io/) as the ORM to interact with database. [Prisma](https://www.prisma.io/) by default uses transactions so that a MongoDB Replica Set is necessary.

```yml
version: "3.9"

services:
  mongo:
    container_name: mongo
    image: mongo:5
    command: --replSet rs0
    ports:
      - "27017:27017"
      - "28017:28017"
  mongo-express:
    image: mongo-express
    container_name: crosscopy-mongo-express
    restart: unless-stopped
    depends_on:
      - mongo
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://mongo:27017/
    networks:
      - crosscopy
```

Then run `docker compose exec mongo mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});"`.

Mongo Express is a web interface allowing you to interact with your database. I personally also use mongodb compass, this service is not necessary.

For more details, see the following issues:

- https://github.com/prisma/docs/issues/2795
- https://github.com/prisma/prisma/issues/8713#issuecomment-1045268231

### Redis

Redis is used to cache some frequently used data to reduce workload of the database and speed up backend service.

```yml
version: "3.9"

services:
  redis:
    image: redislabs/rejson:2.0.9
    container_name: crosscopy-redis
    restart: unless-stopped
    ports:
      - 6379:6379
    volumes:
      - ./server-nodejs/src/database/initdb.d/redis.conf:/usr/local/etc/redis/redis.conf
```

[RedisInsight](https://redis.com/redis-enterprise/redis-insight/) is a GUI client you can use to debug.

`rejson` image is used for json support.

### Kafka

Kafka is used to communicate between services. For example, it's used for email ownership verification.

```yml
version: "3.9"

services:
  zookeeper:
    image: "bitnami/zookeeper:latest"
    container_name: crosscopy-zookeeper
    ports:
      - "2181:2181"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    image: "bitnami/kafka:latest"
    container_name: crosscopy-kafka
    restart: unless-stopped
    ports:
      - "9092:9092"
      - "9093:9093"
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CLIENT:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_LISTENERS=CLIENT://:9092,EXTERNAL://:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=CLIENT://kafka:9092,EXTERNAL://192.168.2.15:9093
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=CLIENT
    depends_on:
      - zookeeper
  kafdrop:
    image: obsidiandynamics/kafdrop
    container_name: crosscopy-kafdrop
    restart: unless-stopped
    ports:
      - "9005:9000"
    environment:
      - KAFKA_BROKERCONNECT=kafka:9092
    depends_on:
      - kafka
```

[Kafdrop](https://github.com/obsidiandynamics/kafdrop) is a web UI for viewing Kafka topics and browsing consumer groups. It's not necessary but I personally use it to debug Kafka.

See [Overview of UI Monitoring Tools for Apache Kafka Clusters](https://towardsdatascience.com/overview-of-ui-monitoring-tools-for-apache-kafka-clusters-9ca516c165bd) for more Kafka Visualization Tools.

### Complete `docker-compose.yml`

```yml
version: "3.9"

services:
  mongo:
    container_name: mongo
    image: mongo:5
    command: --replSet rs0
    ports:
      - "27017:27017"
      - "28017:28017"
    volumes:
      - crosscopy/mongo:/data/db
    networks:
      - crosscopy
  mongo-express:
    image: mongo-express
    container_name: crosscopy-mongo-express
    restart: unless-stopped
    depends_on:
      - mongo
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://mongo:27017/
    networks:
      - crosscopy
  redis:
    image: redislabs/rejson:2.0.9
    container_name: crosscopy-redis
    restart: unless-stopped
    ports:
      - 6379:6379
    volumes:
      - ./server-nodejs/src/database/initdb.d/redis.conf:/usr/local/etc/redis/redis.conf
    networks:
      - crosscopy
  zookeeper:
    image: "bitnami/zookeeper:latest"
    container_name: crosscopy-zookeeper
    ports:
      - "2181:2181"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
    networks:
      - crosscopy
  kafka:
    image: "bitnami/kafka:latest"
    container_name: crosscopy-kafka
    restart: unless-stopped
    ports:
      - "9092:9092"
      - "9093:9093"
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CLIENT:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_LISTENERS=CLIENT://:9092,EXTERNAL://:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=CLIENT://kafka:9092,EXTERNAL://192.168.2.15:9093
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=CLIENT
    depends_on:
      - zookeeper
    networks:
      - crosscopy
  kafdrop:
    image: obsidiandynamics/kafdrop
    container_name: crosscopy-kafdrop
    restart: unless-stopped
    ports:
      - 9005:9000
    environment:
      - KAFKA_BROKERCONNECT=kafka:9092
    depends_on:
      - kafka
    networks:
      - crosscopy
  notification:
    image: python:3.9.10-buster
    container_name: crosscopy-notification
    restart: unless-stopped
    depends_on:
      - kafka
    volumes:
      - ./notification:/notification
    environment:
      - KAFKA_ADDRESS=kafka:9092
    entrypoint: /notification/docker-entrypoint.sh
    networks:
      - crosscopy

networks:
  crosscopy:
    driver: bridge

volumes:
  crosscopy:
```

## Cloud Service

You can also use cloud services during development, which I don't really like to use during development and testing.

All services below provide free tier which should be enough for development.

| Service | Cloud Service Provider                                            |
| ------- | ----------------------------------------------------------------- |
| MongoDB | [MongoDB Atlas](https://www.mongodb.com/cloud)                    |
| Redis   | [Redis Cloud](https://redis.com/redis-enterprise-cloud/overview/) |
| Kafka   | [Confluent Cloud](https://www.confluent.io/)                      |
