---
title: HID Protocol Reference
description: The raw HID report protocol used by PolyKybdHost to communicate with the PolyKybd firmware.
---

import { Aside } from '@astrojs/starlight/components';

PolyKybdHost talks to the firmware over a custom **raw HID** report protocol. The same protocol is used by the [HIL test rig](/development/test-rig/) to exercise the firmware in CI.

## Report format

- **64-byte** raw HID reports.
- **Byte 0** — Report ID
- **Byte 1** — Command ID
- **Byte 2+** — payload

Responses are prefixed with the command echo plus a status marker:

- `"P\xNN."` — **ACK** (success), where `NN` is the command ID
- `"P\xNN!"` — **NACK** (rejected / unsupported / out of bounds)

The dispatcher lives in the firmware's `hid_com.c` (`raw_hid_receive()`), which handles 21 command IDs in the range `0x01`–`0x15`. The `PROTOCOL_VERSION`, reported inside the **GET_ID** identity string, gates which host features are available.

## Command areas

The commands below are the main areas grounded in the firmware and host sources. (Command IDs not listed here exist but are omitted where the exact ID is not documented in the source notes.)

| Area | Command(s) | Notes |
|---|---|---|
| **Identity** | `GET_ID` | Returns the identity string, including `PROTOCOL_VERSION` and firmware version. Used for capability detection and liveness checks. |
| **Language (get / set)** | language get/set | Query and select the active keyboard language. |
| **Language list (packed)** | `27` (`0x1b`) | **Protocol v2+.** Returns the language list as a count byte plus one 2-byte `(ISO 639-1 index, ISO 3166-1 alpha-2 index)` pair per language. The only language-list command on current firmware. |
| **Language list (legacy ASCII)** | `0x08` | **Retired.** Returned 4 ASCII chars per language. On current firmware it NACKs (`P\x08!`); the host uses the packed list exclusively. |
| **Brightness** | brightness set | Sets keycap OLED brightness (also used by preset brightness keys). |
| **Default layer** | default-layer set | Selects/queries the default layer. |
| **Overlay upload (segmented)** | `0x0A` | Each keycap overlay (360 bytes) split into 6 × 60-byte segments. |
| **Overlay upload (RLE)** | `0x10` / `0x11` | RLE-compressed overlay, sent in 1–2 packets; decompressed in firmware (optionally on RP2040 core1). |
| **Overlay ROI update** | `0x12` / `0x13` | Partial refresh of a region of a keycap's display. |
| **Overlay mapping** | `21` (`0x15`) | Maps overlay pool slots to displays / usage bits. **Silent since protocol v3** (no per-chunk ACK). |
| **Enable overlays** | `11` (`0x0B`) | Activates overlays after all mapping chunks are sent; force-syncs overlay state to the slave half. |

<Aside type="note">
The bulk overlay commands (`0x0A`, `0x10`/`0x11`, `0x12`/`0x13`, and mapping on v3) are **not** ACK'd per chunk — the host follows a burst with a `GET_ID` liveness check rather than waiting for replies.
</Aside>

## Overlay addressing

Overlay memory holds **90 keycap slots × 9 modifier variants**, 360 bytes each. The overlay index is:

```
overlay_index = keycode_slot + 90 * modifier_variant
```

The 9 modifier variants are: bare, Ctrl, Shift, Ctrl+Shift, Alt, Ctrl+Alt, Alt+Shift, Ctrl+Alt+Shift, GUI.

## Protocol versions

The firmware advertises a `PROTOCOL_VERSION` (in the GET_ID string) that the host reads to decide which commands to use.

- **v2** — added the **packed language list** (`27` / `0x1b`): a count byte plus one 2-byte ISO index pair per language, replacing the 4-ASCII-char legacy list. The legacy ASCII list (`0x08`) is retired and NACKs on current firmware.
- **v3** — made the **overlay-mapping** command (`21`) **silent** (no per-chunk ACK), matching the other bulk overlay commands. This is the current protocol version. The previous ACK was informationless and a frequent source of stale replies the host had to drain.

<Aside type="tip">
Run PolyKybdHost with `--debug 2` to log the raw HID traffic — the cleanest way to see these commands and their ACK/NACK responses on the wire.
</Aside>
