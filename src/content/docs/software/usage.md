---
title: Using PolyKybdHost
description: How to use the PolyKybdHost tray application, overlays, and brightness settings.
---

import { Aside } from '@astrojs/starlight/components';

Once PolyKybdHost is running, it lives in your system tray (Windows) or menu bar (macOS). A small PolyKybd icon indicates it is active and connected. The tray app is a client of the background daemon that owns the keyboard — see [Architecture & Daemon Mode](/software/architecture/).

## System tray menu

Right-click the tray icon to access:

- **Layout Editor** — remap keys without reflashing firmware
- **Settings** — configure brightness, unicode mode, daemon mode, and other options
- **Command menu** — send one-off commands to the keyboard
- **Flash firmware** — push a new firmware `.bin` to the keyboard over HID
- **Log viewer** — view communication logs for debugging (includes a **Daemon Log** tab when the daemon is running)
- **Quit** — close the tray app (the daemon keeps running)

## Context-aware overlays

The core feature: PolyKybdHost watches which application is currently focused on your screen. When you switch from, say, your browser to your code editor, the keyboard automatically updates every key display to show the relevant shortcuts and labels for the new app. This happens automatically with no action required from you.

## Adaptive brightness

If you have location access enabled, PolyKybdHost can calculate solar irradiance for your location and automatically adjust display brightness based on time of day — brighter during the day, dimmer in the evening. This is configured in **Settings → Brightness**.

## Unicode and language mode

The unicode input mode (Mac / Linux / Windows / WinCompose) selected on the keyboard is synced to PolyKybdHost. You can also change it from the Settings dialog.

## Firmware updates

You can flash new firmware directly from the tray — choose the **Flash firmware .bin…** action and select a firmware `.bin`. Flashing works over HID and is available even when the keyboard is on a protocol version the rest of PolyKybdHost doesn't fully support, so a mismatched keyboard can always be updated. The same operation is available from the command line with `polyctl fw flash` — see [Command Line](/software/cli/) and [Flashing Firmware](/firmware/flashing/).

## Debug logging

If something is not working as expected:

```sh
python -m polyhost --debug 1   # basic logging
python -m polyhost --debug 2   # verbose HID traffic logging
```

The Log Viewer (tray menu → Log Viewer) shows the same output in a GUI window. When running with the daemon, its activity appears under the **Daemon Log** tab.

<Aside>
If the keyboard is not detected, check that the udev rule is installed on Linux (see [Installation](/software/installation/)), or that the device is not claimed by another HID consumer.
</Aside>
