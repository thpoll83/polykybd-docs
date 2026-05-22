---
title: Firmware Development
description: Setting up the QMK development environment for PolyKybd firmware.
---

import { Aside } from '@astrojs/starlight/components';

## Repository structure

The PolyKybd firmware lives on the `PolyKeyboard` branch of the QMK fork: [github.com/thpoll83/qmk_firmware](https://github.com/thpoll83/qmk_firmware/tree/PolyKeyboard)

```
keyboards/handwired/polykybd/
├── config.h          — pin assignments, display count, feature flags
├── halconf.h         — HAL configuration (RP2040)
├── mcuconf.h         — MCU configuration
├── polykybd.c        — keyboard-level code, display init and update loop
├── polykybd.h        — keyboard API, matrix layout
├── rules.mk          — build flags, enabled QMK features
└── keymaps/
    └── default/
        └── keymap.c  — the default keymap
```

## Setting up the dev environment

```sh
# Clone and switch to the PolyKybd branch
git clone https://github.com/thpoll83/qmk_firmware.git
cd qmk_firmware
git checkout PolyKeyboard
git submodule update --init --recursive

# Install QMK CLI if not already installed
pip install qmk

# Set the QMK home to this clone
qmk config user.qmk_home=$(pwd)
```

## Building

```sh
qmk compile -kb handwired/polykybd -km default
```

The output `.uf2` file can be flashed directly. See [Flashing the Firmware](/polykybd-docs/firmware/flashing/).

## Adding a new keymap

```sh
qmk new-keymap -kb handwired/polykybd -km my_keymap
# Edit keyboards/handwired/polykybd/keymaps/my_keymap/keymap.c
qmk compile -kb handwired/polykybd -km my_keymap
```

## Display rendering

The per-key OLED displays are driven via the custom Adafruit GFX fork. The display update loop runs in `polykybd.c`. Each key display is a 72×40 pixel canvas.

See [Display Graphics](/polykybd-docs/development/display-graphics/) for details on how to add custom icons or animations.

## QMK documentation

All standard QMK features are available. Refer to the [official docs](https://docs.qmk.fm/) for:

- [Keycodes reference](https://docs.qmk.fm/keycodes)
- [Layers](https://docs.qmk.fm/feature_layers)
- [Macros](https://docs.qmk.fm/feature_macros)
- [Tap Dance](https://docs.qmk.fm/feature_tap_dance)
- [Unicode](https://docs.qmk.fm/feature_unicode)

<Aside type="tip">
When working on display-related code, use `--debug 2` with PolyKybdHost to see the raw HID traffic and verify the firmware is sending the expected display commands.
</Aside>
