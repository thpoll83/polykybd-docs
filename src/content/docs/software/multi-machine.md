---
title: Multi-Machine Setup
description: Use one PolyKybd keyboard across multiple computers with PolyKybdHost forwarder mode.
---

import { Aside } from '@astrojs/starlight/components';

PolyKybdHost supports a forwarder mode that lets a single PolyKybd serve multiple computers. The keyboard is physically connected to one machine, but the key displays reflect the active window on whichever machine you are currently using.

## How it works

```
[Remote machine] ──TCP──> [Keyboard machine] ──USB──> [PolyKybd]
  PolyForwarder                PolyHost
  watches active               owns HID device,
  window, sends                updates displays
  window info
```

- **Keyboard machine**: running PolyKybdHost in normal mode, physically connected to the keyboard
- **Remote machine(s)**: running PolyKybdHost in forwarder mode (`--host <IP>`), no keyboard attached

When focus changes on a remote machine, it sends the window title and app info over TCP to the keyboard machine, which then updates the key displays.

## Setup

1. **On the keyboard machine:** run PolyKybdHost normally:
   ```sh
   python -m polyhost
   ```

2. **On each remote machine:** run PolyKybdHost in forwarder mode, pointing at the keyboard machine's IP address:
   ```sh
   python -m polyhost --host 192.168.1.100
   ```

   Or use a file containing the IP (useful if the address changes):
   ```sh
   python -m polyhost --host-file /path/to/host.txt
   ```

<Aside>
Make sure the keyboard machine's firewall allows inbound TCP connections on the PolyKybdHost port. Check the Settings dialog or logs for the port number in use.
</Aside>

## Use case

A common setup: a desktop (with the keyboard) and a laptop. When you switch to the laptop and start typing, the forwarder detects the focus change and notifies the desktop. The keyboard displays update to reflect the laptop's active app — all while the keyboard stays physically on the desk connected to the desktop.
