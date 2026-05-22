---
title: Unicode & Language Input
description: How to configure OS unicode input modes for the PolyKybd.
---

import { Aside, Tabs, TabItem } from '@astrojs/starlight/components';

PolyKybd supports unicode input for emoji, accented characters (Æ, Ç, È, …), and any other Unicode codepoint. Because each OS handles unicode input differently, you must first tell the keyboard which mode to use.

## Selecting your OS input mode

Press the Language/Globe key [ 🌐 ] on your PolyKybd. This opens the OS selection. Choose the entry matching your operating system and preferred input method:

| Key label | Use on |
|---|---|
| Mac | macOS — requires setup below |
| Lnx | Linux with IBus and compatible apps/window managers |
| BSD | BSD (currently unimplemented in QMK) |
| Emcs | Emacs (untested) |
| Win | Windows, unicode up to U+FFFF (no emoji) — requires registry edit below |
| WinC | Windows with WinCompose installed — full unicode including emoji |

Your selection is saved to the keyboard and persists across reboots.

## Per-OS setup

<Tabs>
  <TabItem label="macOS">
    Follow the QMK macOS unicode setup guide:

    1. Open **System Settings → Keyboard → Text Input → Input Sources**
    2. Add the **Unicode Hex Input** input source
    3. Select it when you want to type unicode characters

    Then press **Mac** on the PolyKybd language selector.
  </TabItem>
  <TabItem label="Linux">
    IBus must be installed and running as your input method framework. Most major desktop environments (GNOME, KDE) support this.

    Press **Lnx** on the PolyKybd language selector.
  </TabItem>
  <TabItem label="Windows (basic)">
    Windows supports unicode input up to code point U+FFFF (this excludes emoji). First enable hex numpad input:

    ```bat
    reg add "HKCU\Control Panel\Input Method" -v EnableHexNumpad -t REG_SZ -d 1
    ```

    Log out and back in (or reboot) after running this.

    Then press **Win** on the PolyKybd language selector.

    <Aside>
    This method does not support emoji or characters above U+FFFF. For full unicode support on Windows, use WinCompose instead.
    </Aside>
  </TabItem>
  <TabItem label="Windows (WinCompose)">
    WinCompose adds a compose key mechanism to Windows with full unicode support including emoji.

    1. Download and install [WinCompose](https://github.com/samhocevar/wincompose)
    2. Launch it — it runs in the system tray
    3. Press **WinC** on the PolyKybd language selector
  </TabItem>
</Tabs>

## Typing unicode characters

Once your OS mode is set, press any key that has a unicode character assigned in the keymap (such as an emoji or accented character). The keyboard sends the appropriate input sequence for your OS automatically.

Unicode character assignments are configured in the QMK keymap source. See [Keymaps & Layers](/polykybd-docs/firmware/keymaps/) for how to modify them.
