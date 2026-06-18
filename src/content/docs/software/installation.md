---
title: Installation
description: How to install PolyKybdHost on Windows, macOS, and Linux.
---

import { Aside, Steps, Tabs, TabItem } from '@astrojs/starlight/components';

## Prerequisites

- Python 3.9 or later
- The PolyKybd keyboard connected via USB

## Installation

<Tabs>
  <TabItem label="Windows">
    <Steps>
    1. **Install Python:** Download and install Python 3.9+ from [python.org](https://python.org). Check "Add Python to PATH" during installation.
    2. **Clone the repo:**
       ```sh
       git clone https://github.com/thpoll83/PolyKybdHost.git
       cd PolyKybdHost
       ```
    3. **Install dependencies:**
       ```sh
       pip install -e .
       ```
    4. **Run:**
       ```sh
       python -m polyhost
       ```
       Or use the included batch file `autorun_polyhost.bat`.
    </Steps>
  </TabItem>
  <TabItem label="macOS">
    <Steps>
    1. **Install Python** (if not already installed):
       ```sh
       brew install python
       ```
    2. **Clone the repo:**
       ```sh
       git clone https://github.com/thpoll83/PolyKybdHost.git
       cd PolyKybdHost
       ```
    3. **Create a virtual environment and install:**
       ```sh
       python3 -m venv .venv
       source .venv/bin/activate
       pip install -e .
       ```
    4. **Run:**
       ```sh
       python -m polyhost
       ```
    </Steps>
  </TabItem>
  <TabItem label="Linux">
    <Steps>
    1. **Install system dependencies:**
       ```sh
       # Debian/Ubuntu
       sudo apt install python3 python3-venv python3-pip

       # Fedora
       sudo dnf install python3 python3-pip
       ```
    2. **Install the udev rule** for HID access (required for non-root access):
       ```sh
       sudo cp polyhost/device/99-hid.rules /etc/udev/rules.d/
       sudo udevadm control --reload-rules
       sudo udevadm trigger
       ```
       Then log out and back in (or add yourself to the `plugdev` group).
    3. **Clone the repo:**
       ```sh
       git clone https://github.com/thpoll83/PolyKybdHost.git
       cd PolyKybdHost
       ```
    4. **Create a virtual environment and install:**
       ```sh
       python3 -m venv .venv
       source .venv/bin/activate
       pip install -e .
       ```
    5. **Run:**
       ```sh
       python -m polyhost
       ```
    </Steps>
  </TabItem>
</Tabs>

<Aside type="caution">
Always run PolyKybdHost from the virtual environment (`source .venv/bin/activate` first). The system Python is missing required packages like PyQt5 and numpy.
</Aside>

## Startup options

A plain `python -m polyhost` launch starts the **tray GUI** and brings up the background **daemon** that owns the keyboard (spawning it if one isn't already running). The other flags select different startup modes:

```sh
python -m polyhost                  # GUI + daemon (default)
python -m polyhost --no-daemon      # legacy in-process startup (development)
python -m polyhost --connect        # run the GUI as a client of a running daemon
python -m polyhost --headless       # run only the daemon, no GUI
python -m polyhost --debug 1        # basic debug logging
python -m polyhost --debug 2        # verbose debug logging
python -m polyhost --host <IP>      # forwarder mode (remote machine)
python -m polyhost --portable       # skip autostart registration
```

<Aside>
The daemon/client split is explained in [Architecture & Daemon Mode](/software/architecture/). Use `--no-daemon` while developing so your code edits run in the same process as the GUI. The `polyctl` command-line tool drives a running daemon — see [Command Line](/software/cli/).
</Aside>

## Autostart

PolyKybdHost can register itself to launch at login. Run it once normally — on first launch it will offer to add itself to your OS startup entries (a non-elevated scheduled task on Windows, a `.desktop` entry on Linux, a `launchd` plist on macOS). Use `--portable` to skip this and remove any existing entry.
