---
title: GraphQL Schema
sidebar_position: 1
---

GitHub Repo: https://github.com/CrossCopy/crosscopy-graphql-schema

:::caution Default Branch is `develop`
For now, the default branch is `develop`. All links on this page also links to the develop branch. Later on, I will update the default branch to `main`.
:::

## Introduction

GraphQL is a query language for APIs. It is very powerful. With a properly defined schema, you know the input format, response format without writing documentation.

Since GraphQL is typed, it can be used to generate TypeScript types and query calls. I use [GraphQL Code Generator](https://www.graphql-code-generator.com/) to generate TypeScript code.

[Plugins](https://www.graphql-code-generator.com/plugins) can be used to generate all kinds of TypeScript code.

I like to use [TypeScript](https://www.graphql-code-generator.com/plugins/typescript) and [TypeScript Operations](https://www.graphql-code-generator.com/plugins/typescript-operations) for types, and [TypeScript GraphQL-Reuqest](https://www.graphql-code-generator.com/plugins/typescript-graphql-request) to generate query calls.

See [codegen.yml](https://github.com/CrossCopy/crosscopy-graphql-schema/blob/develop/codegen.yml) for all plugins used.

## CICD

[GitHub Workflows](https://github.com/CrossCopy/crosscopy-graphql-schema/tree/develop/.github/workflows)

| Workflow        | Action URL                                                                                                         | Workflow File                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Test Build      | [test-build.yml](https://github.com/CrossCopy/crosscopy-graphql-schema/actions/workflows/test-build.yml) | [test-build.yml](https://github.com/CrossCopy/crosscopy-graphql-schema/blob/develop/.github/workflows/test-build.yml)   |
| Publish Package | [publish.yml](https://github.com/CrossCopy/crosscopy-graphql-schema/actions/workflows/publish.yml)       | [publish.yml](https://github.com/CrossCopy/crosscopy-graphql-schema/blob/develop/.github/workflows/publish.yml) |
