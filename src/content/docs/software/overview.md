---
title: What is PolyKybdHost?
description: Overview of the PolyKybdHost application that drives the per-key displays.
---

**PolyKybdHost** is the Python application that runs on your computer and brings the PolyKybd's per-key displays to life.

Without PolyKybdHost, the keyboard works as a standard QMK keyboard — all keys function normally, but the displays show only the static labels from the firmware. With PolyKybdHost running, the displays update dynamically based on context.

## What it does

- Tracks the active window on your computer and switches key overlays automatically when you change apps
- Pushes keymap and display updates to the keyboard over USB HID
- Manages language/unicode mode and display brightness
- Provides a keymap editor for remapping keys without recompiling firmware
- Flashes new firmware to the keyboard over HID
- Supports multi-machine setups — one keyboard, multiple computers

## Daemon and client model

As of the latest version, PolyKybdHost runs as two cooperating parts. The **operational core** — which owns the HID device, tracks the active window, and handles reconnects — runs in a background **daemon** process. The familiar **tray GUI** attaches to that daemon as a **client** over a local control socket; if no daemon is running, launching the GUI spawns one automatically.

This means the GUI can come and go (quit it, restart it, run it on demand) without ever dropping the keyboard connection or losing reconnect state — the daemon keeps the device alive. A small stdlib-only command-line tool, [`polyctl`](/software/cli/), talks to the same daemon, so you can script the keyboard or drive it without any GUI at all.

For development you can opt out with `--no-daemon` (everything runs in-process). See [Daemon & Client Model](/software/architecture/) for the full picture.

## Operating modes

**Normal mode (default):** PolyKybdHost runs on the machine the keyboard is physically plugged into. It owns the HID device, tracks the active window, and pushes overlay, icon, and keymap updates directly to the keyboard.

**Forwarder mode:** PolyKybdHost can also run on a remote machine that has no keyboard attached. In this configuration, a `PolyForwarder` instance watches the active window on the remote machine and relays the window title and app info over TCP to the normal-mode instance on the keyboard machine. This lets a single keyboard serve multiple computers — the displays always reflect what is focused on whichever machine the user is currently working at.

See [Multi-Machine Setup](/using/multi-machine/) for details.

## System requirements

| OS | Status |
|---|---|
| Windows 10/11 | Supported |
| macOS | Supported |
| Linux (GNOME/X11) | Supported |
| Linux (KDE Plasma) | Supported (D-Bus integration) |

## Repositories

- Host software: [github.com/thpoll83/PolyKybdHost](https://github.com/thpoll83/PolyKybdHost)
- Firmware: [github.com/thpoll83/qmk_firmware](https://github.com/thpoll83/qmk_firmware) — `PolyKybd` branch
