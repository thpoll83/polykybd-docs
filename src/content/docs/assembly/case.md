---
title: Case & Spacer
description: 3D printing and CNC instructions for the PolyKybd Split72 case and spacer.
---

import { Aside } from '@astrojs/starlight/components';

The PolyKybd case and spacer can be 3D printed (resin SLA recommended) or CNC machined.

## STL files

| Part | File |
|---|---|
| Left case | `case/case_polysplit72_left2_r4.stl` |
| Right case | `case/case_polysplit72_right2_r4.stl` |
| Spacer (×2) | `case/spacer.stl` |

All files are in the [PolyKybd hardware repo](https://github.com/thpoll83/PolyKybd).

## Printing recommendations

Resin (SLA) printing gives the best results — the fine details of the case walls and display cutouts come out cleanly.

FDM printing is possible but the surface finish and dimensional accuracy are lower.

<Aside type="tip">
If your resin print has slight warping (common with large flat parts), use a **hair dryer** to gently warm the case, then press it flat under a heavy object for a few minutes. It reliably corrects minor deformations.
</Aside>

## CNC machining

If you have the case CNC machined instead of printed, add threaded inserts to the four corner screw holes — the M3 screws need something to bite into since CNC aluminium won't self-tap.

## Screws and nuts

The current case revision (r4) uses:

- 8× M3×10 hex screws with rounded heads
- 8× M3 hex nuts (press-fit into the case corners)

<Aside>
Older revisions (before r4) did not require nuts — the screws threaded directly into the resin.
</Aside>

## Felt case (alternative)

A simpler felt case design is also available for a softer, quieter desk feel. See `felt_case.jpg` in the repo for reference.
