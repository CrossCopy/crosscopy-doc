---
title: CLI App
---



For now, to use the CLI version, you need to have NodeJS 16+ and npm installed.

Install the CLI with

```bash
# https://www.npmjs.com/package/crosscopy
sudo npm install -g crosscopy@latest
```

The executable binary is `xc`, `xc --help` to view available commands. More documentation will be available when the CLI is released.

## Reset

```bash
# when something went wrong and you don't know how to solve, run clear command to clear all data
xc clear --all
```

## Register

```bash
xc register
# or
xc register -e <email> -p <password> -u <username>
```

## Login

```bash
xc login
# or
xc login -e <email> -p <password>
```

## Copy

```bash
xc copy # then enter text and Ctrl + D to finish
# or
echo <content> | xc copy
cat <file.txt> | xc copy
```

## Sync

```bash
xc sync  # upload local changes and download data from cloud
```

## Listen for Clipboard and Sync

```bash
xc listen  # start a long connection, listen for clipboard update and sync with all other computers
```

## Run In Background

To keep a server running in the background, we need to write a service file for Linux and a plist for Mac.

I haven't done that yet. For now, you could use tools like `tmux` to run a session in the background.

The session should persist even if your computer sleeps. Just start a new session after every reboot.

```bash
tmux new -s crosscopy  # start a new named session
xc listen   # start listening

# Press "Ctrl b", Then "d" # detach tmux session
# then you can close the terminal if you want

tmux a -t crosscopy  # attach to the session to read the logs or stop it, or restart the service.
```

### One Liner

```bash
tmux new-session -s crosscopy -d "xc listen; tmux detach"
tmux a -t crosscopy  # attach to the session
```