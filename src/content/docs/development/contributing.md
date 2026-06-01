---
title: Contributing
description: How to contribute to the PolyKybd documentation, firmware, hardware, and host software.
---

PolyKybd is fully open. Contributions are welcome across all four repositories.

## Where to contribute

| What | Repository |
|---|---|
| Documentation | [thpoll83/polykybd-docs](https://github.com/thpoll83/polykybd-docs) |
| Hardware (PCB, case, STLs) | [thpoll83/PolyKybd](https://github.com/thpoll83/PolyKybd) |
| QMK firmware | [thpoll83/qmk_firmware](https://github.com/thpoll83/qmk_firmware) — branch `PolyKybd` |
| Host software | [thpoll83/PolyKybdHost](https://github.com/thpoll83/PolyKybdHost) |
| Display rendering | [thpoll83/adafruit-gfx-library](https://github.com/thpoll83/adafruit-gfx-library) |

## Contributing to the docs

The docs are plain Markdown / MDX files. To contribute:

1. Fork [thpoll83/polykybd-docs](https://github.com/thpoll83/polykybd-docs)
2. Create a branch for your change
3. Edit or add `.md` / `.mdx` files in `src/content/docs/`
4. Preview locally with `npm run dev`
5. Open a pull request

Common contributions that are always welcome:

- Tested compatible switch additions to the Compatible Switches page
- Corrections to assembly steps
- OS-specific installation notes or troubleshooting tips
- Translations (open an issue first to coordinate)

The documentation is licensed under **CC BY 4.0**. By contributing, you agree that your contribution is made under the same license.

## Contributing to the firmware

See [Firmware Development](/polykybd-docs/development/firmware/) for setup instructions. For significant changes, open an issue first to discuss the approach.

## Reporting issues

Open an issue on the relevant repository. For hardware/build problems, include:

- Which revision of the PCB and case you are using
- Photos if relevant
- Which step of the build guide the problem occurs at

## Support the project

PolyKybd is an independent project. If you find it useful, consider supporting it financially via [Ko-fi](https://ko-fi.com/polykb).
