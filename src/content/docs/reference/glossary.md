---
title: Glossary
description: Definitions of PolyKybd project terms used throughout the documentation.
---

A quick reference for terms used across the PolyKybd documentation, firmware, and host software.

**PolyKybd**
: The split ergonomic mechanical keyboard where every key has its own per-keycap OLED display.

**Split72**
: The 72-key PolyKybd variant — RGB matrix, Cirque trackpad, and a 128×64 status OLED.

**Split42**
: The 42-key PolyKybd variant on a CRKBD footprint — no RGB or trackpad, with a 128×32 status OLED. (Renamed from "corne42".)

**PolyKybdHost**
: The PyQt5 system-tray host application that bridges the keyboard to the host OS — tracking the active window and pushing overlay/keymap/language updates over HID.

**polyctl**
: The stdlib-only command-line client for PolyKybdHost. Talks to the host's control socket to query status, set language/brightness, manage overlays, flash firmware, and more.

**Daemon mode**
: PolyKybdHost running its operational core as a separate headless process, with the tray GUI attached as a client. Default startup mode; lets the GUI restart without disrupting the device connection.

**Forwarder mode**
: PolyKybdHost running on a remote machine with no keyboard attached. It watches the active window there and relays it over the network to the host machine, so one keyboard can serve multiple computers.

**Overlay**
: The per-keycap image data shown on a key's OLED — 360 bytes per keycap, pushed from the host over HID (RLE-compressed).

**MRU**
: Most-Recently-Used overlay cache. A fast path that re-applies previously sent overlay sets when switching back to a recently used application.

**QMK**
: The open-source keyboard firmware framework. PolyKybd firmware is a heavily customised fork of QMK.

**RP2040**
: The Raspberry Pi dual-core ARM Cortex-M0+ microcontroller that runs the firmware. PolyKybd pairs it with 8 MB of external QSPI flash.

**FPC**
: Flexible Printed Circuit — the flat ribbon cable/connector that links the per-key OLED display array to the PCB.

**Status OLED**
: The keyboard's main info display (128×64 on Split72, 128×32 on Split42), separate from the per-keycap displays.

**HIL rig (polykybd-ctnd)**
: The Raspberry Pi 4 hardware-in-the-loop test and deploy station that flashes both halves, runs Raw HID tests, and serves as a GitHub Actions self-hosted CI runner. See the [Test Rig & CI](/development/test-rig/) page.

**Adafruit GFX fork**
: The customised Adafruit GFX graphics library used to render the per-keycap displays, plus the `fontconvert` tool used to generate font headers.

**fontconvert**
: The standalone tool (in the Adafruit-GFX repo) that converts TTF/OTF fonts into Adafruit GFX `.h` bitmap headers for the firmware.

**EE_HANDS**
: The QMK mechanism that stores a split half's handedness (left/right) in EEPROM for normal firmware. It sets the side only — not master/slave — and the HIL build ignores it.

**Split sync**
: The CRC32-validated UART transactions that synchronise state and overlay data between the two keyboard halves.
