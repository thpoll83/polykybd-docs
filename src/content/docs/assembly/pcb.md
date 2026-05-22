---
title: PCB & Gerber Files
description: How to order the PolyKybd PCBs — gerber files, BOM, and JLCPCB instructions.
---

import { Aside } from '@astrojs/starlight/components';

The PolyKybd uses two 4-layer PCBs (left and right), each 1.6mm thick. The PCBs contain a large number of fine-pitch SMD components including the RP2040 microcontroller and 72 FPC sockets, so ordering pre-assembled PCBs is strongly recommended.

## Gerber files

The latest gerber files, BOM, and pick & place files are in the [PolyKybd hardware repo](https://github.com/thpoll83/PolyKybd):

| File | Description |
|---|---|
| `poly_kybd/Gerber/PCB/left-side-v3.1/gerber-left-side-v3.1-08.01.2024.zip` | Left PCB gerbers |
| `poly_kybd/Gerber/PCB/right-side-v3.1/gerber-right-side-v3.1-08.01.2024.zip` | Right PCB gerbers |

## Aluminum plates

The key plates are also ordered as PCBs — specify 1.2mm aluminum when ordering:

| File | Description |
|---|---|
| `poly_kybd/Gerber/Plate/gerber-left-side-v3-17.11.2023.zip` | Left aluminum plate |
| `poly_kybd/Gerber/Plate/gerber-right-side-v3-17.11.2023.zip` | Right aluminum plate |

## Ordering from JLCPCB

JLCPCB is one convenient option that supports both PCB assembly and aluminum PCB orders.

1. Upload the gerber ZIP for the PCB
2. Select 4-layer, 1.6mm thickness
3. Enable PCB Assembly and upload the BOM and CPL (pick & place) files from the Gerber folder
4. If the fab offers a parts orientation verification step, use it — part orientation in KiCad may differ from the fab's default

<Aside type="caution">
If you modify the PCB in KiCad and re-export gerbers, double-check that the hot-swap sockets are on the **back** side. The KiCad footprint places them on the front by default, which is incorrect for manufacturing.
</Aside>

## KiCad source files

The full KiCad 7 projects are in the repo if you want to make your own modifications:

- `poly_kybd/poly_kb_wave_right2.kicad_pro` — Right PCB
- `poly_kybd/poly_kb_wave_left2.kicad_pro` — Left PCB
- `poly_kybd/poly_kb_wave_right2_plate.kicad_pro` — Right plate
- `poly_kybd/poly_kb_wave_left2_plate.kicad_pro` — Left plate

See [Hardware & PCB Modification](/polykybd-docs/development/hardware/) for more on working with the KiCad sources.
