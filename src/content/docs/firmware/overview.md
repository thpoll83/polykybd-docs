---
title: Firmware Overview
description: "Hub for the PolyKybd firmware - the QMK fork, the RP2040 hardware it targets and where to find each firmware topic."
---

The PolyKybd runs [QMK firmware](https://qmk.fm/) — the most widely used open-source keyboard firmware, with excellent documentation and a large community.

## A customised QMK fork

PolyKybd is a **heavily customised QMK fork** maintained on the `PolyKybd` branch:

[github.com/thpoll83/qmk_firmware — branch: PolyKybd](https://github.com/thpoll83/qmk_firmware/tree/PolyKybd)

**Upstream base: QMK 0.33.13** (as of PolyKybd firmware v0.11.6). The fork follows
QMK's stable release tags, so the QMK documentation for 0.33.x applies to your
keyboard, alongside the PolyKybd additions described here.

The keyboard-specific files live at:

```
keyboards/polykybd/
```

The shared keymap logic — display rendering, language selection, idle/suspend — is in
`poly_keymap.c`. The HID command handler is in `hid_com.c`, and split synchronisation in
`split_sync.c`. All of it is compiled for every variant.

## The hardware it targets

PolyKybd is **custom hardware**, not a standard board:

- **MCU**: Raspberry Pi **RP2040** — dual-core ARM Cortex-M0+, running at **200 MHz** since firmware v0.11.0 (the operating point Raspberry Pi certified for the chip; earlier firmware ran at 125 MHz). QMK runs on core 0; core 1 decompresses overlay images and runs DOOM while you play it. See [The Second Core](/beyond-qmk/core1/) and [200 MHz System Clock](/beyond-qmk/system-clock/).
- **Flash**: **8 MB external QSPI flash** (not the standard 2 MB), partitioned into:
  - **0–2 MB** — the running firmware
  - **2–4 MB** — firmware-update staging
  - **4–6 MB** — the [font pack](/firmware/font-packs/) (independently-versioned glyph bundles)
  - **6–8 MB** — additional resource packs
- **Displays**: up to **72 per-keycap OLEDs** (72×40 px monochrome, SPI-driven) plus a status OLED.
- **Split**: a left + right half connected over UART, with CRC32-validated state and overlay sync. See [Split Link Sync](/beyond-qmk/split-link/).

There are two hardware variants, **split72** and **split42**, sharing one firmware codebase — see [Keyboard Variants](/firmware/variants/).

## Host communication

The firmware talks to [PolyKybdHost](/software/overview/) over a custom **64-byte raw HID
protocol**. The host connects to any firmware from protocol 2 on and turns on each feature
only when the firmware supports it. See the [HID Protocol Reference](/reference/hid-protocol/)
for the commands and the per-version feature history.

## In this section

- [Keyboard Variants](/firmware/variants/): split72 and split42.
- [Font Packs & Resources](/firmware/font-packs/): glyph bundles in flash.
- [What PolyKybd Adds to QMK](/beyond-qmk/overview/): update over HID, signing, crash handler, second core and more.

## Related pages

- [Flash the Firmware](/setup/flashing/) and [Build & Flash from Source](/howto/build-and-flash/)
- [Keymaps & Layers](/using/keymaps/) and [Languages & Unicode Input](/using/languages/)
- [Firmware Development](/development/firmware/)
- [QMK official documentation](https://docs.qmk.fm/)
