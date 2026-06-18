---
title: Command Line (polyctl)
description: Drive a running PolyKybdHost daemon from the terminal with the polyctl CLI.
---

import { Aside } from '@astrojs/starlight/components';

`polyctl` is a small command-line tool that talks to a **running PolyKybdHost daemon** over its local control socket. It is stdlib-only and never imports Qt, which makes it ideal for headless machines, scripted setups, and quick one-off commands without opening the tray GUI.

<Aside>
`polyctl` controls an existing daemon — it does not start one. Launch the daemon first with `python -m polyhost` (GUI + daemon) or `python -m polyhost --headless` (no GUI). See [Architecture & Daemon Mode](/software/architecture/).
</Aside>

## Subcommands

| Command | Description |
|---|---|
| `status` | Show connection state and current keyboard status |
| `lang list` / `lang set <code>` | List available languages, or switch the active language |
| `brightness <value>` | Set display brightness |
| `idle <…>` | Configure or trigger idle behaviour |
| `overlay …` | Inspect and manage key overlays |
| `keymap …` | Read/write the dynamic keymap |
| `commands` | List the keyboard's available one-off commands |
| `fw version` | Report the keyboard's firmware version |
| `fw flash <bin> [--apply]` | Flash a firmware `.bin` over HID (streams progress) |
| `pause` / `resume` | Suspend or resume the daemon's device I/O |
| `mru save` | Persist the recently-used overlay cache |
| `settings get <key>` / `settings set <key> <value>` | Read or change a setting |
| `update check` / `update install` | Check for and install host updates (streams progress) |
| `window report` | Report the current active window to the daemon |
| `watch` | Stream live events from the daemon to the terminal |
| `shutdown` | Stop the daemon |

Long-running operations (`fw flash`, `update install`) subscribe to daemon events and stream their progress to the terminal as it happens.

## Examples

<Aside type="caution">
These are illustrative examples. Run `polyctl <command> --help` for the exact, current argument syntax of any subcommand.
</Aside>

```sh
# Check the daemon is alive and the keyboard is connected
polyctl status

# Switch the active language
polyctl lang set en-US

# Set display brightness
polyctl brightness 80

# Flash firmware and apply it immediately
polyctl fw flash firmware.bin --apply

# Stream live events (reconnects, overlay sends, window changes)
polyctl watch

# Adopt the daemon-by-default startup model
polyctl settings set daemon_mode true
```

Because `polyctl` speaks the same control protocol the tray GUI uses, you can mix the two freely — drive a headless daemon from scripts and attach the GUI later with `python -m polyhost --connect` when you want a window.
