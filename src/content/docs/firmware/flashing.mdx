---
title: Flashing the Firmware
description: Flash PolyKybd firmware over HID from PolyKybdHost, or via the UF2 bootloader drive as a fallback.
---

import { Aside, Steps, Tabs, TabItem } from '@astrojs/starlight/components';

There are two ways to flash PolyKybd firmware. The **recommended** way is over HID directly from
PolyKybdHost — no buttons, no bootloader drive. The **UF2 bootloader drive** method is kept as a
recovery fallback.

## Recommended: flash over HID from PolyKybdHost

PolyKybdHost includes a firmware updater (`polyhost/device/hid_fw_up.py`) that pushes a firmware
image to the keyboard over the normal HID connection. No BOOT button is needed, and — importantly —
it works **even across protocol-version mismatches**, so a keyboard running incompatible firmware can
still be updated.

The deliverable for HID flashing is a raw **`.bin`** image (not the `.uf2`).

<Tabs>
  <TabItem label="From the tray app">
    <Steps>
    1. Open **PolyKybdHost** (system-tray icon).
    2. Use the **firmware update** action — either the **release-update** flow (which fetches a
       published keyboard-firmware release) or **Flash firmware .bin…** to pick a local `.bin`.
    3. Confirm and let it transfer. Progress is shown as it streams the image to the keyboard.
    4. Apply the update when prompted — the keyboard reboots into the new firmware.
    </Steps>
  </TabItem>
  <TabItem label="From the command line">
    The `polyctl` console tool can flash without the GUI:

    ```sh
    polyctl fw flash path/to/firmware.bin --apply
    ```

    `fw flash` streams progress to the terminal. Without `--apply` it stages the image; with
    `--apply` it stages and then applies (reboots into) the new firmware.

    You can also check the running version first:

    ```sh
    polyctl fw version
    ```
  </TabItem>
</Tabs>

<Aside type="tip">
The HID flash path is gated on the device being *present* (answering identity queries), **not** on
protocol compatibility — so this is the way to recover a keyboard that's on a mismatched protocol
version.
</Aside>

## Fallback: UF2 bootloader drive

Use this if the keyboard can't be reached over HID (e.g. a bad image left it unresponsive). It flashes
the **`.uf2`** build, not the `.bin`.

### Entering bootloader mode

<Steps>
1. Hold down the **BOOT button** on the PCB.
2. While holding it, connect the **USB-C cable** to the half you're flashing.
3. Release the button.
4. The keyboard mounts as a USB drive called `RPI-RP2`.
</Steps>

### Copying the firmware

Download the latest **`.uf2`** from the [firmware repo releases](https://github.com/thpoll83/qmk_firmware/releases)
(or build your own — see below) and copy it onto the `RPI-RP2` drive. The drive unmounts automatically
when flashing completes.

<Aside>
You only need to connect one half at a time. Repeat the process for the second half if needed.
</Aside>

## Building from source

To build your own firmware image, see [Firmware Development](/development/firmware/) for
the full toolchain setup and build commands. In short:

```sh
qmk compile -kb handwired/polykybd/split72 -km default   # or /split42
```

The build produces a `.uf2` (for the bootloader drive). For HID flashing, convert the ELF to a raw
`.bin`:

```sh
arm-none-eabi-objcopy -O binary .build/<target>.elf .build/<target>.bin
```

## Verifying the flash

After the update applies and the keyboard reboots:

<Steps>
1. Wait 1–2 seconds for the firmware to boot.
2. All per-key displays should show characters.
3. Press keys to confirm they respond, and check that both halves are active.
</Steps>

<Aside type="caution">
If displays stay blank after multiple attempts, check the FPC cable connections — see the
[Step-by-Step Build Guide](/assembly/step-by-step/).
</Aside>
