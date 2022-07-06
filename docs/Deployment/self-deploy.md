---
title: Self Deployment
sidebar_position: 1
---

CrossCopy depends on some other services

- MongoDB
- Redis
- Kakfa

Redis and Kafka are not really necessary for self deployment where there are not many people using the service, but I didn't make a version that doesn't use them yet (maybe in the future). Deploying them with docker is still super simple.

## docker-compose.yml

:::caution
This is not completed yet.

volumn for redis.conf is not added to documentation.

The configuration is not fully tested yet.
:::

```yaml
version: '3.9'

services:
  mongo:
    container_name: mongo
    image: mongo:5
    command: --replSet rs0
    ports:
      - '27017:27017'
      - '28017:28017'
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
    image: 'bitnami/zookeeper:latest'
    container_name: crosscopy-zookeeper
    ports:
      - '2181:2181'
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
    networks:
      - crosscopy
  kafka:
    image: 'bitnami/kafka:latest'
    container_name: crosscopy-kafka
    restart: unless-stopped
    ports:
      - '9092:9092'
      - '9093:9093'
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

`mongo-express` and `kafdrop` services are not necessary, they are used during development to visualize the data.

Comment them out if you don't know what kafka or mongo is or don't expect to use them, they will be a waste of your computing resource.

Run `docker compose up` within `CrossCopy/Backend` repo which contains some dependencies and configuration files.

`notification` service is a python service I wrote to send notifications to users. For example, email verification is provided by this services.

To support transaction operations in database, MongoDB has to be a replica set. Run `docker compose exec mongo mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});"\n` after all services are up and running.

For more details, see the following issues:
- https://github.com/prisma/docs/issues/2795
- https://github.com/prisma/prisma/issues/8713#issuecomment-1045268231

Here is an example of how prisma deploys mongodb replica set: https://github.com/prisma/prisma/blob/main/docker/docker-compose.yml