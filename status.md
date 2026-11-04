# Status

Status as of 2026-11-05, taken from each repo's README, CHANGELOG and git log.
I read the code history. I did not re-run builds or tests for this page, so
"done" means the repo's own record says it passed.

Stage names and exit criteria are from the plan's per-component stage tables
(firmware F0 to F7, desktop D0 to D7, backend B0 to B7, wake word W0 to W6,
website Wb0 to Wb4). These are not the cross-project roadmap phases F0 to F8
that reuse the letter F.

Meaning of the marks:

- **done**: the work exists and the repo records it as passing. If it is only on
  an unmerged branch, the branch is named.
- **partial**: some of the stage's exit criteria are met.
- **in progress (date)**: uncommitted or recently moving work.
- **not started**: no code found.

"Unmerged" means the work is on a local branch that is not on `main` and has
not been pushed to GitHub. Several branches belong to subagents and may still
change after this date.

**Hardware.** No physical robot exists (owner decision 9, see
[decisions/owner-decisions.md](decisions/owner-decisions.md)). Every firmware
stage that needs a board, and every desktop stage that needs the robot, is
unverified on hardware.

## Firmware, moby-firmware (F0 to F7)

| Stage | Mark | Evidence |
| --- | --- | --- |
| F0 Toolchain, hello | partial | On `main`. Builds with ESP-IDF 5.5.6 (README, 2026-11-03). The board memory check is not done. |
| F1 OLED, button, LED, mute | partial | On `main`. Builds, and 5 host tests pass. Board test is pending. |
| F2 Microphone capture | partial | On `main` (`codex/f2-microphone-bench` merged). Bench image builds and 4 host tests pass. The INMP441 signal and hardware mute are not verified on a board. |
| F3 Protocol and link | partial | Unmerged branch `claude/f3-usb-link` (`0826187`). Host tests pass with MSVC and gcc, image builds. USB link, pairing and NVS are not verified on a board. |
| F4 Push-to-talk audio stream | not started | No code found. |
| F5 VAD and wake word | not started | No code found. |
| F6 Speaker and servo (optional) | not started | No code found. |
| F7 Hardening | not started | No code found. |

## Desktop, moby-desktop (D0 to D7)

| Stage | Mark | Evidence |
| --- | --- | --- |
| D0 Shell and virtual Moby | done | On `main` (`e431c10`): app shell, nine animated expressions. |
| D1 Sign-in and API client | partial | Unmerged branch `claude/desktop-chat-shell` (`0191719`), also contained in later branches. Email sign-in and text chat work. README shows Google sign-in as not done. |
| D2 Local store and settings | done | Unmerged branch `claude/desktop-d2-store` (`964df7f`). SQLite history, 30-day default retention, delete-all. |
| D3 Robot link | not started | Branch `claude/desktop-d3-link` exists but has no commits of its own. Needs the simulator, then a robot. |
| D4 Voice chain | not started | README shows voice as not done. |
| D5 Tools and permissions | partial | Unmerged branch `claude/desktop-d5-tools` (`dbe2837`). All five tools, approval dialog and activity log exist, tested against a stub API. It still has session grants for `open_app` and `open_project`, which owner decision 8 (2026-11-05) removes. That change is not made. |
| D6 Updates and installer | not started | README shows signed updates as not done. |
| D7 Hardening | not started | No code found. |

## Backend, moby-api (B0 to B7)

| Stage | Mark | Evidence |
| --- | --- | --- |
| B0 Skeleton | done | On `main`: `/health`, OpenAPI, CI, Compose. |
| B1 Database and accounts | done | On `main`: migrations, registration, email verification through a local mail catcher. |
| B2 Tokens and Google | done | On `main`. Google flow is tested against a local simulation only, not real Google. |
| B3 AI gateway | partial | Mock adapter and agent stream are on `main`. The OpenRouter adapter is on unmerged branch `claude/openrouter-llm` (`326fe4f`) and is tested against a stub only. |
| B4 Quota and budget | done | On `main`: transactional reservations and a provider circuit breaker. |
| B5 Voice | partial | On `main`: consent-gated STT and TTS routes with a local mock. No real STT or TTS provider. |
| B6 Demo | partial | On `main`: guest demo with bot check, IP limits and a separate budget. Not tried against the real bot-check service. |
| B7 Hardening | not started | No load, fuzz, security review or restore drill found. |

## Wake word, moby-wakeword (W0 to W6)

No `moby-wakeword` repository exists locally. All of W0 to W6 are **not started**.

## Website, moby-web (Wb0 to Wb4)

| Stage | Mark | Evidence |
| --- | --- | --- |
| Wb0 Skeleton and landing | done | On `main` (`0e5d913`): landing page, pinned OpenAPI snapshot, tests. |
| Wb1 Three languages, shared UI | not started | Nothing committed. `moby-ui` does not exist. The uncommitted working tree was not checked for language work. |
| Wb2 Demo | in progress (2026-11-05) | Uncommitted files in the working tree that appear to be a guest demo component and tests. Someone else's work, not reviewed here. |
| Wb3 Download and legal pages | in progress (2026-11-05) | An uncommitted `legal/` folder appears in the working tree. |
| Wb4 Hardening | not started | No code found. |
| `/app/` signed-in panel (owner decision 2, not a plan stage) | in progress (2026-11-05) | Uncommitted `app/`, `oauth/` and `src/workspace/` in the working tree. |

## Other repositories

- **moby-protocol** has no stage table in the plan. Version 0.1.0 is on `main`.
  Version 0.2.0 (full USB control set, pairing, C codec) is on unmerged branch
  `claude/usb-control-full` (`9032acb`). A second worktree on branch
  `claude/agent-local-time` has uncommitted changes (in progress, 2026-11-05).
- **moby-ui** and **moby-docs** (this repo) are plan roadmap items. `moby-ui` does not exist
  yet. This repo was created locally on 2026-11-05.
