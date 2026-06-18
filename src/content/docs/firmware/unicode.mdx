---
title: Languages & Unicode Input
description: Switch keyboard-language layouts from the language layer, and configure OS unicode input modes.
---

import { Aside, Tabs, TabItem } from '@astrojs/starlight/components';

PolyKybd does two related things with languages: it can **switch its on-screen keyboard layout**
between ~156 languages, and it can **type Unicode characters** (emoji, accented letters) on any OS.

## The language layer

PolyKybd ships with around **156 keyboard-language layouts**. Press the **Language/Globe** key
[ 🌐 ] to open the language picker. On this layer each key shows a **country flag** and its
**`xx-YY` language code** (for example `de-DE`, `fr-FR`, `es-MX`), with a frame drawn around the
currently selected language.

Pick a language and PolyKybd does two things at once:

- **Switches the keycap legends** so every key shows the characters for that layout.
- **Tells the host OS to switch input language**, so what you type matches what the keys show.

Your selection persists across reboots. Because the language list is shared by both hardware
variants, [split72 and split42](/firmware/variants/) support the same set of languages.

<Aside type="tip">
The layouts cover everything from US/UK/DE/FR/ES variants to minority and regional locales. Some are
folds (same physical layout, different OS locale), others are full distinct layouts with their own
AltGr legends.
</Aside>

## Unicode input

PolyKybd also supports Unicode input for emoji, accented characters (Æ, Ç, È, …), and any other
Unicode codepoint. Because each OS handles Unicode input differently, you must first tell the
keyboard which mode to use.

### Selecting your OS input mode

Press the Language/Globe key [ 🌐 ] to reach the OS selection. Choose the entry matching your
operating system and preferred input method:

| Key label | Use on |
|---|---|
| Mac | macOS — requires setup below |
| Lnx | Linux with IBus and compatible apps/window managers |
| BSD | BSD (currently unimplemented in QMK) |
| Emcs | Emacs (untested) |
| Win | Windows, unicode up to U+FFFF (no emoji) — requires registry edit below |
| WinC | Windows with WinCompose installed — full unicode including emoji |

Your selection is saved to the keyboard and persists across reboots.

### Per-OS setup

<Tabs>
  <TabItem label="macOS">
    Follow the QMK macOS unicode setup guide:

    1. Open **System Settings → Keyboard → Text Input → Input Sources**
    2. Add the **Unicode Hex Input** input source
    3. Select it when you want to type unicode characters

    Then press **Mac** on the PolyKybd language selector.
  </TabItem>
  <TabItem label="Linux">
    IBus must be installed and running as your input method framework. Most major desktop
    environments (GNOME, KDE) support this.

    Press **Lnx** on the PolyKybd language selector.
  </TabItem>
  <TabItem label="Windows (basic)">
    Windows supports unicode input up to code point U+FFFF (this excludes emoji). First enable hex
    numpad input:

    ```bat
    reg add "HKCU\Control Panel\Input Method" -v EnableHexNumpad -t REG_SZ -d 1
    ```

    Log out and back in (or reboot) after running this.

    Then press **Win** on the PolyKybd language selector.

    <Aside>
    This method does not support emoji or characters above U+FFFF. For full unicode support on
    Windows, use WinCompose instead.
    </Aside>
  </TabItem>
  <TabItem label="Windows (WinCompose)">
    WinCompose adds a compose key mechanism to Windows with full unicode support including emoji.

    1. Download and install [WinCompose](https://github.com/samhocevar/wincompose)
    2. Launch it — it runs in the system tray
    3. Press **WinC** on the PolyKybd language selector
  </TabItem>
</Tabs>

### Typing unicode characters

Once your OS mode is set, press any key that has a unicode character assigned in the keymap (such as
an emoji or accented character). The keyboard sends the appropriate input sequence for your OS
automatically.

Unicode character assignments are configured in the QMK keymap source. See
[Keymaps & Layers](/firmware/keymaps/) for how to modify them.
