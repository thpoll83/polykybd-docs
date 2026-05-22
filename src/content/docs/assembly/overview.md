---
title: Assembly Overview
description: How to build a PolyKybd Split72 — kit, partial DIY, or full scratch build options.
---

import { Aside, Steps } from '@astrojs/starlight/components';

The PolyKybd Split72 can be assembled in a few different ways depending on how much of the build you want to do yourself.

## Your options

### Kit (recommended for most people)

A kit containing all parts and pre-assembled PCBs is planned via CrowdSupply. Sign up to be notified when it becomes available:

[crowdsupply.com/polykybd/polykybd](https://crowdsupply.com/polykybd/polykybd)

The kit includes the PCBs with all SMD components already soldered, so you only need to assemble the mechanical parts.

### Partial DIY

Order PCBs assembled from a PCB manufacturer (JLCPCB, PCBWay, etc.) using the gerber files and BOM in the repo, then 3D print the case and stems yourself.

### Full scratch build

Build absolutely everything from source — order bare PCBs, source all components individually, print all parts. This is for experienced builders who want full control.

<Aside type="caution">
The full scratch build requires SMD soldering experience. The PCB has fine-pitch components including the RP2040, FPC sockets, and more. If in doubt, order a pre-assembled PCB.
</Aside>

## Build video

A full build video is available on YouTube:

[Watch the build video →](https://www.youtube.com/@polykb)

## What you will need

Before starting, gather all required parts. See the full [Parts List](/polykybd-docs/assembly/parts-list/) for details.

At a high level you need:

- Left and right PCBs (assembled)
- Left and right aluminum plates (1.2mm)
- Left and right 3D-printed cases
- 72× key switches (MX-compatible)
- 72× custom 3D-printed key stems
- 72× 0.42" OLED displays with FPC cables
- 72× transparent relegendable keycap covers
- 2× (optional) 0.96" status displays
- USB-C cables (one short for between halves, one for the computer)
- 8× M3×10 hex screws and M3 hex nuts

## Next steps

<Steps>
1. Read the full [Parts List](/polykybd-docs/assembly/parts-list/)
2. Order your [PCBs](/polykybd-docs/assembly/pcb/) or wait for the kit
3. Print or order your [Case & Spacer](/polykybd-docs/assembly/case/)
4. Prepare your [Displays](/polykybd-docs/assembly/displays/)
5. Choose [Compatible Switches](/polykybd-docs/assembly/compatible-switches/)
6. Follow the [Step-by-Step Build Guide](/polykybd-docs/assembly/step-by-step/)
</Steps>
