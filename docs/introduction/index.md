# Introduction

CrossCopy is a cloud based clipboard manager aiming to provide a seamless universal clipboard experience across all of your devices.

Unlike other cloud based clipboard managers, you don't need to manually copy and paste content into an app, instead, everything is done for you in the background.
The experience will be seamless, you won't even recognize your clipboard on 2 devices are isolated. i.e. after `Ctrl + C` on one device, you can `Ctrl + V` on the other device immediately.

It's kind of like Apple's handoff, but available on all platforms and will be open sourced.

This project will be open sourced, [GitHub Repos](https://github.com/CrossCopy) will be public once it's ready to be used.

This documentation will contain instructions to install and use the project. Any advices are welcomed, leave an issue in the corresponding repo or [send an email](mailto:huakun.shen@crosscopy.io) to the author.

See [roadmap](./roadmap) for the latest version you can use.

## Supported Platforms

| Platform                      | Development Progress |
| ----------------------------- | -------------------- |
| CLI (Windows / MacOS / Linux) | In Progress          |
| Web                           | In Progress          |
| MacOS                         | Planning             |
| Windows                       | Planning             |
| Linux                         | Planning             |
| ChromeOS                      | Planning             |
| IOS                           | Planning             |
| Android                       | Planning             |
| HarmonyOS                     | Planning             |

## Planned Features

| Feature                 | Support | Comment                                                                                                                                                                                                             |
| ----------------------- | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clipboard Text Syncing  |   ✅    |                                                                                                                                                                                                                     |
| Clipboard Image Syncing |   ❌    | Planned to be supported in the future, will be developed once desktop client is supported.                                                                                                                          |
| Client-Side Encryption  |   ✅    | All clipboard data are encrypted on client side. Even database manager won't be able to view your data.                                                                                                             |
| Offline Mode            |   ✅    | Clipboard History recording will be available when no internet is available, and will be synced once connected to internet. It can also work completely offline as a clipboard history app without syncing feature. |
| Realtime Syncing        |   ✅    | While connected to internet, data is synced to other devices in realtime.                                                                                                                                           |
| Clipboard History       |   ✅    |                                                                                                                                                                                                                     |
| Self Deployment         |   ✅    | You can deploy on your own server for better security, while there is already client-side encryption out of the box.                                                                                                |
| Cloud Support           |   ✅    | SaaS                                                                                                                                                                                                                |
| External Plugin         |   ✅    | You can use plugins to preprocess data to be synced. e.g. implement your own encryption, upload your data to databases/notion, filter keywords (do not upload bank card number)                                     |
