# Decision records

Each repository keeps its own architecture decision records (ADRs) in
`docs/adr/`. This page indexes them. It does not copy their contents.
Decisions the owner made outside any repo are in
[owner-decisions.md](owner-decisions.md). They override both the plan and, where
they conflict, older ADRs.

Checked on 2026-11-05 against each repo's local checkout. "On main" means the
file is on the default branch `main` and on `origin/main`, so the GitHub link
works once the repo is public (it may be private today). "Unmerged" means the file exists only on the
named local branch. None of those branches has been pushed to GitHub, so there
is no link.

The ADR files are in the language their repo's authors used: moby-api ADRs 0001
to 0005 are in Uzbek, the others in English.

## moby-api

Current checkout: `claude/openrouter-llm` (`326fe4f`). Default branch `main` is
at `4e26f7c`.

| ADR | Topic | State |
| --- | --- | --- |
| [0001-api-bootstrap.md](https://github.com/mobyuz/moby-api/blob/main/docs/adr/0001-api-bootstrap.md) | API skeleton | On main |
| [0002-local-account-email.md](https://github.com/mobyuz/moby-api/blob/main/docs/adr/0002-local-account-email.md) | Email verification | On main |
| [0003-desktop-sessions.md](https://github.com/mobyuz/moby-api/blob/main/docs/adr/0003-desktop-sessions.md) | Desktop sessions and tokens | On main |
| [0004-profile-and-consent.md](https://github.com/mobyuz/moby-api/blob/main/docs/adr/0004-profile-and-consent.md) | Profile export and consent | On main |
| [0005-google-desktop-sign-in.md](https://github.com/mobyuz/moby-api/blob/main/docs/adr/0005-google-desktop-sign-in.md) | Google sign-in for desktop | On main |
| [0006-agent-stream.md](https://github.com/mobyuz/moby-api/blob/main/docs/adr/0006-agent-stream.md) | Stateless agent turns | On main |
| [0007-agent-usage.md](https://github.com/mobyuz/moby-api/blob/main/docs/adr/0007-agent-usage.md) | Agent quota and budgets | On main |
| [0008-voice-api.md](https://github.com/mobyuz/moby-api/blob/main/docs/adr/0008-voice-api.md) | Voice requests | On main |
| [0009-guest-demo.md](https://github.com/mobyuz/moby-api/blob/main/docs/adr/0009-guest-demo.md) | Guest demo | On main |
| `0010-openrouter-llm.md` | OpenRouter LLM adapter | Unmerged, local branch `claude/openrouter-llm` |

## moby-desktop

Current checkout: `claude/desktop-d5-tools` (`dbe2837`). Default branch `main` is at `e431c10`. The worktree `moby-desktop-d3` is on `claude/desktop-d3-link`, which points at the same commit.

| ADR | Topic | State |
| --- | --- | --- |
| [0001-desktop-foundation.md](https://github.com/mobyuz/moby-desktop/blob/main/docs/adr/0001-desktop-foundation.md) | Desktop foundation (D0) | On main |
| `0002-api-client.md` | API client in Rust | Unmerged, local branch `claude/desktop-d5-tools` |
| `0003-local-store.md` | Local store (D2) | Unmerged, local branch `claude/desktop-d5-tools` |
| `0004-git-status.md` | In-process git status (D5) | Unmerged, local branch `claude/desktop-d5-tools` |
| `0005-local-tools.md` | Safe local tools, approvals and audit (D5) | Unmerged, local branch `claude/desktop-d5-tools` |

## moby-firmware

Current checkout: `claude/f3-usb-link` (`0826187`). Default branch `main` is at `f86fe62`.

| ADR | Topic | State |
| --- | --- | --- |
| `0001-f3-usb-link.md` | F3 USB link, session and pairing | Unmerged, local branch `claude/f3-usb-link` |

## moby-protocol

Current checkout: `claude/usb-control-full` (`9032acb`). Default branch `main` is at `87b64e2`.

| ADR | Topic | State |
| --- | --- | --- |
| [0001-agent-and-tool-wire-contract.md](https://github.com/mobyuz/moby-protocol/blob/main/docs/adr/0001-agent-and-tool-wire-contract.md) | Agent and tool wire contract | On main |
| [0002-protocol-license.md](https://github.com/mobyuz/moby-protocol/blob/main/docs/adr/0002-protocol-license.md) | Protocol licence | On main |
| [0003-usb-v1-host-framing.md](https://github.com/mobyuz/moby-protocol/blob/main/docs/adr/0003-usb-v1-host-framing.md) | USB v1 host framing | On main |
| `0004-pairing-and-session-auth.md` | Pairing and session authentication | Unmerged, local branch `claude/usb-control-full` |

## moby-web

Checked against committed files only (`git ls-tree -r HEAD`), because the working tree has uncommitted changes from other work. Branch `main` at `0e5d913`.

| ADR | Topic | State |
| --- | --- | --- |
| [0001-web-foundation.md](https://github.com/mobyuz/moby-web/blob/main/docs/adr/0001-web-foundation.md) | Static website foundation | On main |

Not indexed: `moby-docs` (this repo) has no ADRs of its own yet. The plan also
names `moby-ui` and `moby-wakeword`; no such repositories exist in the local
checkout, so they have no ADRs.
