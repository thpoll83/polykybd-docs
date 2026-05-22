---
title: Display Graphics
description: How to add custom icons and animations to the PolyKybd per-key displays.
---

Each of the 72 per-key OLED displays is a 72×40 pixel monochrome canvas. Rendering uses a fork of the Adafruit GFX library, adapted for the RP2040 and the FPC-connected display array.

- **Firmware rendering repo**: [github.com/thpoll83/adafruit-gfx-library](https://github.com/thpoll83/adafruit-gfx-library)
- **Display driver**: integrated into `keyboards/handwired/polykybd/` in the QMK firmware fork

## The rendering pipeline

1. The QMK firmware maintains a framebuffer per key
2. The Adafruit GFX fork provides drawing primitives: `drawPixel`, `drawLine`, `drawBitmap`, `print` (text)
3. On each display update cycle, changed framebuffers are sent over the FPC bus to the corresponding displays
4. PolyKybdHost can push overlay bitmaps and text labels via HID commands, which are composited on top of the firmware-rendered content

## Adding a custom bitmap icon

Icons are stored as 1-bit bitmaps in program memory (PROGMEM). To add one:

```c
// 72x40 pixels, 1bpp, row-major
static const uint8_t PROGMEM my_icon[] = {
    0x00, 0xFF, /* ... row data ... */
};

// In your display update code:
display_draw_bitmap(key_index, 0, 0, my_icon, 72, 40, 1);
```

Use any image editor to design at 72×40px in 1-bit monochrome. Export as a C array (GIMP can do this via **File → Export As → .xbm**, then convert the bit order if needed).

## Text rendering

The GFX library supports bitmap fonts. The default font is a small 5×7 pixel font suitable for displaying 2–3 lines of text on each key.

```c
display_set_cursor(key_index, 0, 0);
display_set_text_size(key_index, 1);
display_print(key_index, "Hello");
```

## Host-side overlays

PolyKybdHost pushes per-key overlay content via HID using 64-byte reports (protocol v0.7.0+). The host can send:

- Full bitmap replacements
- Text label updates
- Inversion commands (used for key-pressed feedback)

See the `polyhost/device/cmd_composer.py` source for the command format details.
