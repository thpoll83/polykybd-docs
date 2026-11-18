# Agent card fonts

PolyKybdHost downloads `WenQuanYiZenHeiMono-cjk.ttf` from
`https://www.polykybd.org/fonts/agent-cards/` the first time an agent title has a
Chinese character that its bundled font (Galmuri11) does not have
(`polyhost/services/agents/card.py`, `FALLBACK_FONTS`).

The file is WenQuanYi Zen Hei Mono (face 1 of `wqy-zenhei.ttc`, Debian package
`fonts-wqy-zenhei` 0.9.45), changed: cut to the 3,939 characters of GB2312, Big5
level 1 and CJK punctuation that Galmuri11 does not have, with no hinting and no
OpenType layout tables. License: GPL-2 with a font embedding exception and the
M+ FONTS license (`LICENSE-WenQuanYi.txt`).

Do not rename or move the file: released hosts download it from this path.
