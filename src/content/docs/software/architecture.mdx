---
title: Architecture & Daemon Mode
description: How PolyKybdHost splits the operational core into a background daemon with the tray GUI as a client.
---

import { Aside } from '@astrojs/starlight/components';

PolyKybdHost is built around a **daemon + client** split. Understanding it helps explain why the GUI can be closed and reopened without ever disturbing the keyboard.

## The two parts

- **The core (daemon).** A Qt-free *operational core* owns the HID device, the reconnect logic, the active-window tracking, overlay/icon/keymap sends, adaptive brightness, and the recently-used overlay cache. It runs as a background process that keeps the keyboard connection alive on its own.
- **The GUI (client).** The system-tray application — menus, dialogs, the layout editor, the log viewer — attaches to the core as a **client** over a local control socket. It renders state the core publishes and forwards user actions back to it. It holds no device state of its own.

A plain `python -m polyhost` launch starts the GUI and, if no daemon is running, spawns one (detached) and connects to it. If the daemon can't come up, it falls back to running the core in-process.

<Aside type="tip">
Because the daemon outlives any single GUI session, you can **quit the tray app and reopen it later** without dropping the device connection or losing reconnect state. Quitting a client closes only its own sockets — the daemon keeps running.
</Aside>

## Why it exists

Previously the core ran inside the GUI process, so closing the window tore down the device connection — and a flaky reconnect or a long firmware transfer could be interrupted just by restarting the tray. Splitting the core into a daemon means:

- The keyboard connection and its reconnect/debounce state survive GUI restarts.
- Multiple front-ends — the tray GUI and the `polyctl` CLI — talk to the *same* live core.
- A headless machine (a server, a CI rig) can run the core with no display at all.

## The control socket

The GUI and `polyctl` reach the daemon over a local control socket:

- A Unix domain socket on Linux/macOS, or a named pipe on Windows.
- Authenticated with a key file stored with `0600` permissions in the platform's user config directory.
- It doubles as the **single-instance lock** — only one core can own it at a time.

The wire protocol is plain JSON-RPC framed over that socket; the CLI uses the exact same transport the GUI does.

## Startup modes

| Mode | Flag | What runs |
|---|---|---|
| Daemon + GUI | *(default)* | Spawns/attaches the daemon, runs the tray GUI as its client |
| Client only | `--connect[=ENDPOINT]` | Tray GUI as a pure client of an already-running daemon |
| Headless | `--headless` | The core + control socket only, **no Qt imported** |
| In-process | `--no-daemon` | Legacy single-process startup (the core runs inside the GUI) |

<Aside>
`--no-daemon` is the one to use while developing PolyKybdHost: your code edits then run in the same process as the GUI, instead of in a separately-spawned daemon.
</Aside>

In headless mode the core auto-applies its own reconnect snapshots and is driven entirely through [`polyctl`](/software/cli/). The GUI can attach to a headless daemon at any time with `--connect`.

## Logging

The daemon writes its own log to `daemon_log.txt`. When that file exists, the GUI's Log Viewer adds a **"Daemon Log"** tab, so reconnect, overlay, and window-tracking activity happening inside the daemon is visible from the GUI side. Pass `--debug 2` to the daemon to surface verbose (detailed) lines such as window-report receipts; `--debug 1` shows the standard debug level.
