# Compatibility

The plan asks for a table of which desktop, API, protocol and firmware
versions work together ("Repozitoriylar va versiya mosligi", plan line 133).
This is that table, filled in on 2026-11-05 from the repositories.

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
| moby-protocol | 0.2.0 (Cargo and npm). `PROTOCOL_VERSION` is 1. | `claude/usb-control-full`, unmerged | `9032acb` | none |
| moby-protocol | 0.1.0. `PROTOCOL_VERSION` is 1. | `main` | `87b64e2` | none |
| moby-api | 0.1.0 (Cargo and `openapi.json`) | `claude/openrouter-llm`, unmerged | `326fe4f` | none |
| moby-api | 0.1.0 | `main` | `4e26f7c` | none |
| moby-desktop | 0.1.0 | `claude/desktop-d5-tools`, unmerged | `dbe2837` | none |
| moby-desktop | 0.1.0 | `main` | `e431c10` | none |
| moby-firmware | 0.1.0 (CMake project version), `protocol_version` 1 | `claude/f3-usb-link`, unmerged | `0826187` | none |
| moby-firmware | 0.1.0 | `main` | `f86fe62` | none |
| moby-web | 0.1.0 | `main` | `0e5d913` | none |

The version number did not change between `main` and the feature branches for
the API, desktop and firmware, so the number alone does not tell you which code
you have. Use the commit. moby-protocol is the only repo whose version moved
(0.1.0 to 0.2.0, on the unmerged branch).

## How each repo consumes the others

| Consumer | Depends on | How | Pinned to |
| --- | --- | --- | --- |
| moby-api | moby-protocol | Source snapshot in `vendor/moby-protocol`, crate `=0.1.0` | protocol 0.1.0 at `3f1142a` |
| moby-desktop | moby-protocol | Path dependency on a sibling checkout (`../moby-protocol`), and `file:../moby-protocol` for npm | Whatever is checked out next to it |
| moby-desktop | moby-api | HTTP `/v1`, developed against a stub API | No pin |
| moby-firmware | moby-protocol | Vendored C codec and test vectors in `components/moby_protocol` | protocol 0.2.0 at `9032acb` |
| moby-web | moby-api | Pinned OpenAPI snapshot in `contracts/` | API 0.1.0 at `2de25f1` |

All of these are temporary arrangements until protocol and API tags exist.
moby-desktop's own ADR says the sibling path becomes a git tag after the first
protocol release.

## Combinations

"Tested" means a test or build that exercises the combination was recorded by
that repo. I did not re-run any of them for this page. "Not tested" means no
such record was found.

| Combination | Result |
| --- | --- |
| protocol 0.2.0 with firmware `0826187` | Tested on a host: firmware host tests run the vendored protocol vectors through the firmware code (framing, control lines, COBS, HMAC, session proof). Builds with ESP-IDF 5.5.6. Not tested on a real board, because none exists. |
| protocol 0.2.0 with desktop | Not tested. The desktop's USB link stage (D3) is not written, so nothing in the desktop speaks USB v1. |
| desktop `dbe2837` with API | Tested against a stub API only (desktop commit `38d7ae8`). The `main` API and the OpenRouter branch were not run against this desktop. |
| API `326fe4f` with protocol | The API builds against the 0.1.0 snapshot. Protocol 0.2.0 was not tried with it. |
| API `326fe4f` with a real OpenRouter model | Not tested. The API's own ADR says tests use a local stub, and latency and Uzbek quality are unmeasured. |
| web with API | The web contract pins API 0.1.0 at `2de25f1`, which is older than API `main` (`4e26f7c`). The web working tree has uncommitted changes to this contract. Not tested together. |
| firmware with desktop over USB | Not tested. No hardware and no desktop USB code. |
| wake word model with firmware | Not applicable yet. There is no wake word repo or model. |

## Gaps to close before a first tag

- Tag moby-protocol and replace the three copies (API snapshot, firmware
  vendoring, desktop sibling path) with the tagged artifact.
- Decide which protocol version the API follows. Today the API is on 0.1.0 and
  firmware is on 0.2.0.
- Regenerate the web contract from the API release once one exists.
- Add rows for moby-ui and moby-wakeword when those repositories exist.
