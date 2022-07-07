---
title: Core
sidebar_position: 2
---

GitHub Repo: https://github.com/CrossCopy/crosscopy-core

The core package has multiple components

- Encryption
- Plugin System
  - See [Design Doc](../../Design/plugin)
- Sqlite Database Definition for Client
- SocketIO Service
- Common Utilities
  - JWT

## Environment Setup

```bash
git clone git@github.com:CrossCopy/crosscopy-core.git
cd crosscopy-core
npm install   # Install dependencies
npm run test  # Run tests with jest
npm run build # build package with tsup
```

## CICD

[GitHub Workflows](https://github.com/CrossCopy/crosscopy-core/tree/main/.github/workflows)

| Workflow        | Action URL                                                                                                         | Workflow File                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Unittest        | [unittest.yml](https://github.com/CrossCopy/crosscopy-core/blob/main/.github/workflows/unittest.yml)               | [unittest.yml](https://github.com/CrossCopy/crosscopy-core/actions/workflows/unittest.yml)               |
| Publish Package | [release-package.yml](https://github.com/CrossCopy/crosscopy-core/blob/main/.github/workflows/release-package.yml) | [release-package.yml](https://github.com/CrossCopy/crosscopy-core/actions/workflows/release-package.yml) |

### CI (Unittest)

Triggered on all push and pull requests.

### CD (Publish)

Workflow triggered when

- release created
- push to `release/*` branch
- push to tag `v*`

Don't forget to update version in `package.json`.

## Publish Package

The [CD workflow](#cd-publish) is the recommended way to publish a package.

You can also publish a package manually by running `npm publish`.
