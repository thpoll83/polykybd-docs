---
title: Flashing the Firmware
description: How to flash QMK firmware onto the PolyKybd using UF2 bootloader mode.
---

import { Aside, Steps, Tabs, TabItem } from '@astrojs/starlight/components';

## Entering bootloader mode

The RP2040 on the PolyKybd uses UF2 bootloader mode:

<Steps>
1. Hold down the **BOOT button** on the PCB
2. While holding the button, connect the **USB-C cable** to the left half
3. Release the button
4. The keyboard will mount as a USB drive called `RPI-RP2`
</Steps>

## Flashing a pre-built firmware

If you just want to use the default keymap, download the latest `.uf2` file from the [firmware repo releases](https://github.com/thpoll83/qmk_firmware/releases) and copy it to the `RPI-RP2` drive. The drive will unmount automatically when flashing is complete.

## Building from source

<Tabs>
  <TabItem label="Windows">
    <Steps>
    1. Install [QMK MSYS](https://msys.qmk.fm/) — it bundles all required build tools
    2. Open QMK MSYS and run:
       ```sh
       qmk setup thpoll83/qmk_firmware -b PolyKybd
       qmk compile -kb handwired/polykybd -km default
       ```
    3. The built `.uf2` file will be in the `qmk_firmware` directory
    </Steps>
  </TabItem>
  <TabItem label="macOS">
    <Steps>
    1. Install QMK CLI:
       ```sh
       brew install qmk/qmk/qmk
       qmk setup thpoll83/qmk_firmware -b PolyKybd
       ```
    2. Build:
       ```sh
       qmk compile -kb handwired/polykybd -km default
       ```
    </Steps>
  </TabItem>
  <TabItem label="Linux">
    <Steps>
    1. Install QMK CLI:
       ```sh
       python3 -m pip install --user qmk
       qmk setup thpoll83/qmk_firmware -b PolyKybd
       ```
    2. Build:
       ```sh
       qmk compile -kb handwired/polykybd -km default
       ```
    </Steps>
  </TabItem>
</Tabs>

<Aside>
You only need to connect one half during flashing. Repeat the process for the second half if needed (some firmware versions embed both halves in a single `.uf2`).
</Aside>

## Verifying the flash

After the drive unmounts:

1. Disconnect and reconnect the USB-C cable (or connect both halves first)
2. After 1–2 seconds, all 72 per-key displays should show characters
3. Press keys to confirm they respond

<Aside type="caution">
If displays remain blank after multiple attempts, check the FPC cable connections — see the [Step-by-Step Build Guide](/polykybd-docs/assembly/step-by-step/).
</Aside>
