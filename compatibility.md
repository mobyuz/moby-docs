# Compatibility

The plan asks for a table of which desktop, API, protocol and firmware
versions work together ("Repozitoriylar va versiya mosligi", plan line 133).
This is that table, filled in on 2026-11-05 (updated later that day) from the repositories.

**No repository has a release tag.** Nothing here is a released, supported
combination. Every row is a snapshot of source code. Version numbers are read
from `Cargo.toml`, `package.json` and `openapi.json`, not assumed.

Rules from the plan that still apply: semver with `vX.Y.Z` tags; an integer
`PROTOCOL_VERSION` in moby-protocol that rises on breaking changes; desktop and
firmware exchange `protocol_version` and capabilities in `hello` and refuse a
mismatch; the API lives under `/v1`.

## Current versions

| Component | Version in source | Branch read | Commit | Release tag |
| --- | --- | --- | --- | --- |
| moby-protocol | 0.2.0 (Cargo and npm). `PROTOCOL_VERSION` is 1. | `claude/mutual-auth`, unmerged | `0ddc9a9` | none |
| moby-protocol | 0.1.0. `PROTOCOL_VERSION` is 1. | `main` | `87b64e2` | none |
| moby-api | 0.1.0 (Cargo and `openapi.json`) | `claude/openrouter-llm`, unmerged | `6132c41` | none |
| moby-api | 0.1.0 | `main` | `4e26f7c` | none |
| moby-desktop | 0.1.0 | `claude/desktop-d4-fixes`, unmerged | `73d0296` | none |
| moby-desktop | 0.1.0 | `main` | `e431c10` | none |
| moby-firmware | 0.1.0 (CMake project version), `protocol_version` 1 | `claude/mutual-auth`, unmerged | `7789908` | none |
| moby-firmware | 0.1.0 | `main` | `f86fe62` | none |
| moby-ui | 0.1.0 | `main` | `62de4e3` | none |
| moby-web | 0.1.0 | `main` | `0e5d913` | none |
| moby-wakeword | 0.0.0 (`pyproject.toml`) | `main` | `d0e2d25` | none |

The version number did not change between `main` and the feature branches for
the API, desktop and firmware, so the number alone does not tell you which code
you have. Use the commit. moby-protocol is the only repo whose version moved
(0.1.0 to 0.2.0, on an unmerged branch). Protocol 0.2.0 changed the USB
handshake after it was first written (the robot now proves the key too), and
the number stayed 0.2.0 because it is unreleased. Two different 0.2.0 commits
(`59717ba` and `0ddc9a9`) are in use by different repos, see below.

## How each repo consumes the others

| Consumer | Depends on | How | Pinned to |
| --- | --- | --- | --- |
| moby-api | moby-protocol | Source snapshot in `vendor/moby-protocol`, crate `=0.2.0` | protocol 0.2.0 at `59717ba`, before the robot proof |
| moby-desktop | moby-protocol | Path dependency on a sibling checkout (`../../moby-protocol`), and `file:../moby-protocol` for npm | Whatever is checked out next to it |
| moby-desktop | moby-ui | `file:../moby-ui` for npm | Whatever is checked out next to it |
| moby-desktop | moby-api | HTTP `/v1` | No pin |
| moby-firmware | moby-protocol | Vendored C codec and test vectors in `components/moby_protocol` | protocol 0.2.0 at `0ddc9a9`, with the robot proof |
| moby-ui | moby-protocol | npm peer range `>=0.1.0 <1.0.0`, `file:../moby-protocol` in development | Sibling checkout |
| moby-web | moby-api | Pinned OpenAPI snapshot in `contracts/` | API 0.1.0 at `2de25f1` |

All of these are temporary arrangements until protocol, API and UI tags exist.

The API vendors protocol `59717ba`, which predates the robot proof (`0ddc9a9`).
The API does not use the protocol's USB module, so this is harmless today. It
is still a different snapshot from the one the firmware and desktop use, and
should be refreshed when 0.2.0 is tagged.

## Combinations

"Tested" means a test or build that exercises the combination was recorded by
that repo or by the coordinator. I did not re-run any of them for this page.
"Not tested" means no such record was found.

| Combination | Result |
| --- | --- |
| protocol `0ddc9a9` with firmware `7789908` | Tested on a host: firmware host tests (F3 47, F4 39, plus text tests) run the vendored protocol vectors, including the robot proof, under MSVC and gcc 14 with warnings as errors. Three ESP-IDF images build. Coordinator-checked. Not tested on a real board, because none exists. |
| protocol `0ddc9a9` with desktop `73d0296` | Tested against the desktop's own USB simulator, which does the handshake with two-way proof checking. A forged-device test passes and fails when the protection is removed (coordinator-checked). Not tested against the real firmware. |
| desktop `73d0296` with API `326fe4f`/`6132c41` | An ignored end-to-end test passed against `moby-api` with mock providers. This is from the agent's run, not repeated by the coordinator or me. Real speech and LLM providers were not used. |
| desktop with firmware over USB | Not tested. Both sides pass tests against simulators or host builds. No hardware. |
| API with protocol `0ddc9a9` | Not tried. The API is on `59717ba`. |
| API with a real OpenRouter model | Not tested. Tests use a stub. Latency and Uzbek quality are unmeasured. |
| web with API | The web contract pins API 0.1.0 at `2de25f1`, older than API `main` (`4e26f7c`). The web working tree has uncommitted changes to this contract. Not tested together. |
| desktop with `moby-ui` | Built together in the desktop's CI definition (ADR 0008). Not re-run here. |
| wake word model with firmware | Not applicable yet. No model has been trained. |

## Gaps to close before a first tag

- Tag moby-protocol and replace the copies (API snapshot, firmware vendoring,
  desktop and ui sibling paths) with the tagged artifact. Settle on one 0.2.0
  commit for all consumers.
- Decide which protocol version the API follows.
- Regenerate the web contract from the API release once one exists.
- Publish or tag `moby-ui` and pin desktop and web to it.
