---
title: Keymaps & Layers
description: How to customize key assignments and layers on the PolyKybd.
---

import { Aside } from '@astrojs/starlight/components';

## What are layers?

Layers work like the Shift key but for your entire layout. You can define multiple complete keymaps and switch between them with a dedicated key. PolyKybd's per-key displays make layers instantly visible — every key shows its current function on the active layer.

## The default keymap

The default keymap is defined in:

```
keyboards/handwired/polykybd/keymaps/default/keymap.c
```

in the [PolyKybd firmware repo](https://github.com/thpoll83/qmk_firmware/tree/PolyKeyboard).

## Customizing with PolyKybdHost

The easiest way to remap keys is through the PolyKybdHost keymap editor, which writes changes directly to the keyboard without needing to recompile firmware:

1. Open PolyKybdHost (system tray icon → Layout Editor)
2. Click any key to select it
3. Choose the new keycode from the browser
4. The change is written immediately to the keyboard

See [Keymap Editor](/polykybd-docs/software/keymap-editor/) for details.

## Customizing in QMK source

For deeper changes (new layers, macros, tap-dance), edit `keymap.c` directly:

```c
const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [0] = LAYOUT(
        KC_ESC,  KC_1,  KC_2,  /* ... */
    ),
    [1] = LAYOUT(
        /* function layer */
    ),
};
```

Then rebuild and flash the firmware.

QMK's full keycode reference is at [docs.qmk.fm/keycodes](https://docs.qmk.fm/keycodes). Everything documented there works on PolyKybd.

## Layer indicator on the status display

The 0.96" status displays (if installed) show the current active layer, along with other status information like the unicode input mode and host OS selection.

<Aside type="tip">
Adding a new keymap without modifying the default is the safest way to experiment. Use `qmk new-keymap -kb handwired/polykybd -km my_keymap` to get started.
</Aside>
