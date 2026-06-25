---
title: Firmware Overview
description: Introduction to the PolyKybd QMK firmware — a customised QMK fork running on the RP2040.
---

The PolyKybd runs [QMK firmware](https://qmk.fm/) — the most widely used open-source keyboard firmware, with excellent documentation and a large community.

## What QMK gives you

- **Layers** — define completely different keymaps activated by a hold or tap
- **Macros** — send multi-key sequences with a single keypress
- **Tap-dance** — different actions based on how many times a key is tapped
- **Unicode input** — send emoji and international characters on any OS
- **Per-key display control** — PolyKybd extends QMK with display rendering via the custom Adafruit GFX fork

## A customised QMK fork

PolyKybd is a **heavily customised QMK fork** maintained on the `PolyKybd` branch:

[github.com/thpoll83/qmk_firmware — branch: PolyKybd](https://github.com/thpoll83/qmk_firmware/tree/PolyKybd)

The keyboard-specific files live at:

```
keyboards/polykybd/
```

The shared keymap logic — display rendering, the HID command handler, language selection,
idle/suspend, split synchronisation — lives in `poly_keymap.c` and is compiled for every variant.

## The hardware it targets

PolyKybd is **custom hardware**, not a stock board:

- **MCU**: Raspberry Pi **RP2040** — 133 MHz dual-core ARM Cortex-M0+. QMK runs on core 0; core 1 is used for RLE decompression of overlay images.
- **Flash**: **8 MB external QSPI flash** (not the stock 2 MB), partitioned into:
  - **0–2 MB** — the running firmware
  - **2–4 MB** — firmware-update staging
  - **4–8 MB** — resource / overlay (keycap image) data
- **Displays**: up to **72 per-keycap OLEDs** (72×40 px monochrome, SPI-driven) plus a status OLED.
- **Split**: a left + right half connected over UART, with CRC32-validated state and overlay sync.

There are two hardware variants, **split72** and **split42**, sharing one firmware codebase — see [Keyboard Variants](/firmware/variants/).

## Host communication

The firmware talks to the host application ([PolyKybdHost](/software/overview/)) over a
custom **64-byte raw HID report protocol**. Each report is `[report id, command id, payload…]`, and
responses are prefixed `P\xNN.` (ACK) or `P\xNN!` (NACK). A `PROTOCOL_VERSION` reported in the
device's identity string gates host features — the firmware is currently at **PROTOCOL_VERSION 3**.

## Further reading

- [Keyboard Variants](/firmware/variants/)
- [Flashing the Firmware](/firmware/flashing/)
- [Keymaps & Layers](/firmware/keymaps/)
- [Languages & Unicode Input](/firmware/unicode/)
- [Firmware Development](/development/firmware/)
- [QMK official documentation](https://docs.qmk.fm/)
