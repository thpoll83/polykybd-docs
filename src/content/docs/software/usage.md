---
title: Using PolyKybdHost
description: How to use the PolyKybdHost tray application, overlays, and brightness settings.
---

import { Aside } from '@astrojs/starlight/components';

Once PolyKybdHost is running, it lives in your system tray (Windows) or menu bar (macOS). A small PolyKybd icon indicates it is active and connected.

## System tray menu

Right-click the tray icon to access:

- **Layout Editor** — remap keys without reflashing firmware
- **Settings** — configure brightness, unicode mode, and other options
- **Command menu** — send one-off commands to the keyboard
- **Log viewer** — view communication logs for debugging
- **Quit** — stop PolyKybdHost

## Context-aware overlays

The core feature: PolyKybdHost watches which application is currently focused on your screen. When you switch from, say, your browser to your code editor, the keyboard automatically updates every key display to show the relevant shortcuts and labels for the new app. This happens automatically with no action required from you.

## Adaptive brightness

If you have location access enabled, PolyKybdHost can calculate solar irradiance for your location and automatically adjust display brightness based on time of day — brighter during the day, dimmer in the evening. This is configured in **Settings → Brightness**.

## Unicode and language mode

The unicode input mode (Mac / Linux / Windows / WinCompose) selected on the keyboard is synced to PolyKybdHost. You can also change it from the Settings dialog.

## Debug logging

If something is not working as expected:

```sh
python -m polyhost --debug 1   # basic logging
python -m polyhost --debug 2   # verbose HID traffic logging
```

The Log Viewer (tray menu → Log Viewer) shows the same output in a GUI window.

<Aside>
If the keyboard is not detected, check that the udev rule is installed on Linux (see [Installation](/polykybd-docs/software/installation/)), or that the device is not claimed by another HID consumer.
</Aside>
