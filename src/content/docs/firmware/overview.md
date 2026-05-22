---
title: Firmware Overview
description: Introduction to QMK firmware on the PolyKybd Split72.
---

The PolyKybd runs [QMK firmware](https://qmk.fm/) — the most widely used open-source keyboard firmware, with excellent documentation and a large community.

## What QMK gives you

- **Layers** — define completely different keymaps activated by a hold or tap
- **Macros** — send multi-key sequences with a single keypress
- **Tap-dance** — different actions based on how many times a key is tapped
- **Unicode input** — send emoji and international characters on any OS
- **Per-key display control** — PolyKybd extends QMK with display rendering via the custom Adafruit GFX fork

## The PolyKybd firmware repo

The firmware lives in a fork of QMK with PolyKybd-specific additions on the `PolyKeyboard` branch:

[github.com/thpoll83/qmk_firmware — branch: PolyKeyboard](https://github.com/thpoll83/qmk_firmware/tree/PolyKeyboard)

The keyboard-specific files are at:

```
keyboards/handwired/polykybd/
```

## Further reading

- [Flashing the Firmware](/polykybd-docs/firmware/flashing/)
- [Keymaps & Layers](/polykybd-docs/firmware/keymaps/)
- [Unicode & Language Input](/polykybd-docs/firmware/unicode/)
- [QMK official documentation](https://docs.qmk.fm/)
