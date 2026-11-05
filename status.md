# Status

Status as of 2026-11-05 (updated later the same day), taken from each repo's
README, CHANGELOG, ADRs, branches and git log. I did not re-run builds or tests
for this page. Test results below come from the repos' own records or from the
coordinator's checks, and each says which.

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

Newest work: branch `claude/mutual-auth` (`7789908`), unmerged. It contains
F3, F4 and the robot proof of the pairing key. `main` is still at `f86fe62`
(F0 to F2 only).

Checked by the coordinator: F3 (47) and F4 (39) host tests and the text tests
pass under MSVC and gcc 14 with warnings as errors, and three ESP-IDF images
build. **Nothing has run on a board.**

| Stage | Mark | Evidence |
| --- | --- | --- |
| F0 Toolchain, hello | partial | On `main`. Builds with ESP-IDF 5.5.6. The board memory check is not done. |
| F1 OLED, button, LED, mute | partial | On `main`. Builds, host tests pass. Board test pending. |
| F2 Microphone capture | partial | On `main`. Bench image builds, host tests pass. INMP441 signal and hardware mute not verified on a board. |
| F3 Protocol and link | partial | Unmerged. Session, pairing, framing and the robot proof are covered by host tests. USB link, pairing and NVS are not verified on a board. |
| F4 Push-to-talk audio stream | partial | Unmerged (`claude/f4-ptt-audio` is contained in `claude/mutual-auth`). Host tests and the push-to-talk image build. The README lists I2S levels, bit conversion, timing, USB throughput and mute timing as needing a board. |
| F5 VAD and wake word | not started | No code found. |
| F6 Speaker and servo (optional) | not started | No code found. |
| F7 Hardening | not started | No code found. |

## Desktop, moby-desktop (D0 to D7)

Newest work: branch `claude/desktop-d4-fixes` (`73d0296`), unmerged and
unpushed. It contains the D2, D3, D4 and D5 branches, the D5 and D3/D4
security fixes, the move to `moby-ui`, the two-way proof and the real-API test.
`main` is still at `e431c10` (D0 only). The worktree is clean.

Checked by the coordinator: 244 Rust tests and 43 TypeScript tests pass on
`1803f8c`. On `73d0296` the forged-device test passes and fails when the
protection is removed. From the agent's own run, not repeated: the real-API
end-to-end test passed against `moby-api` with mock providers on `73d0296`,
and a release build contains neither the simulator nor the PC microphone code.

Not verified by anyone: native confirmation dialogs on screen, real USB,
real speech or LLM providers, Uzbek quality, latency.

| Stage | Mark | Evidence |
| --- | --- | --- |
| D0 Shell and virtual Moby | done | `main`. The face now comes from `moby-ui` (ADR 0008, unmerged). |
| D1 Sign-in and API client | partial | Email sign-in and text chat work, and the real-API test passed with mock providers. Google sign-in is not done (README). |
| D2 Local store and settings | done | SQLite history, 30-day default retention, delete-all. Unmerged. |
| D3 Robot link | partial | Pairing, handshake, keepalive and two-way proof against the simulator only. The exit criterion needs a real USB robot, which does not exist. |
| D4 Voice chain | partial | Robot push-to-talk, consent, speech to text, agent, text to speech and playback, tested against a simulator and a stub server. Not tried with a robot, a real speech service or a sound device. The PC microphone is dev-only. |
| D5 Tools and permissions | partial | Five tools, approval dialog, activity log. Every `open_app` and `open_project` launch is confirmed in a native Windows message box with no session or always-allow grant (owner decision 8, now implemented). The native dialog has not been seen on screen. |
| D6 Updates and installer | not started | README shows signed updates as not done. |
| D7 Hardening | not started | A security review of D3/D4 was addressed in fixes, but there is no fuzz or long-run work. |

## Backend, moby-api (B0 to B7)

Newest work: branch `claude/openrouter-llm` (`6132c41`), unmerged, adds the
OpenRouter adapter, prompt v2, `local_time` context and a vendored protocol
update. `main` is still at `4e26f7c`.

| Stage | Mark | Evidence |
| --- | --- | --- |
| B0 Skeleton | done | On `main`: `/health`, OpenAPI, CI, Compose. |
| B1 Database and accounts | done | On `main`: migrations, registration, email verification through a local mail catcher. |
| B2 Tokens and Google | done | On `main`. The Google flow is tested against a local simulation only. |
| B3 AI gateway | partial | Mock adapter on `main`. The OpenRouter adapter is unmerged and tested against a stub only. Latency and Uzbek quality are unmeasured. |
| B4 Quota and budget | done | On `main`: transactional reservations and a provider circuit breaker. |
| B5 Voice | partial | On `main`: consent-gated STT and TTS routes with a local mock. No real provider. |
| B6 Demo | partial | On `main`: guest demo with bot check, IP limits and a separate budget. Not tried against the real bot-check service. |
| B7 Hardening | not started | No load, fuzz, security review or restore drill found. |

## Wake word, moby-wakeword (W0 to W6)

The repo exists on `main` (`d0e2d25`), local only. Its README says W0 and W1 are
finished, no model has been trained and accuracy is not measured.

| Stage | Mark | Evidence |
| --- | --- | --- |
| W0 Skeleton, CI, upstream toolchain on a small sample | done | Toolchain smoke script and a report of the upstream run. |
| W1 Manifest, validator, recording tool, consent and privacy docs | done | Manifest schema, validator, guided recording tool with local consent records, privacy guard. |
| W2 to W6 | not started | Source folders for synthesis, training, evaluation and export are empty placeholders. |

## Website, moby-web (Wb0 to Wb4)

| Stage | Mark | Evidence |
| --- | --- | --- |
| Wb0 Skeleton and landing | done | On `main` (`0e5d913`): landing page, pinned OpenAPI snapshot, tests. |
| Wb1 Three languages, shared UI | not started | Nothing committed. `moby-ui` now exists as a separate repo but the website does not use it in committed code. The uncommitted working tree was not checked for language work. |
| Wb2 Demo | in progress (2026-11-05) | Uncommitted files in the working tree that appear to be a guest demo component and tests. Someone else's work, not reviewed here. |
| Wb3 Download and legal pages | in progress (2026-11-05) | An uncommitted `legal/` folder appears in the working tree. |
| Wb4 Hardening | not started | No code found. |
| `/app/` signed-in panel (owner decision 2, not a plan stage) | in progress (2026-11-05) | Uncommitted `app/`, `oauth/` and `src/workspace/` in the working tree. |

## Other repositories

- **moby-protocol** has no stage table in the plan. Version 0.1.0 is on `main`
  (`87b64e2`). Version 0.2.0 is on unmerged branch `claude/mutual-auth`
  (`0ddc9a9`, also `claude/usb-control-full`). It adds the full USB control set,
  pairing, the C codec, `local_time` and the robot proof. Coordinator check:
  `cargo test`, `generate:check` and `npm test` pass.
- **moby-ui** exists on `main` (`62de4e3`), local only: the animated face
  package with tests, CI, a preview page and ADR 0001. Version 0.1.0, not
  published.
- **moby-docs** is this repository.
