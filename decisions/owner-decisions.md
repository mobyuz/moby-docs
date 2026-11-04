# Owner decisions since plan v1.0

These are decisions the owner has made after the plan was written
([plan/moby-plan-v1.0.md](../plan/moby-plan-v1.0.md), dated 2026-11-02, in
Uzbek). Where a decision conflicts with the plan, this file wins. The plan
itself is kept unedited. Line numbers below refer to the plan file.

Date is 2026-11-04 unless stated otherwise.

## Decisions

| # | Date | Decision | What it changes in the plan |
| --- | --- | --- | --- |
| 1 | 2026-11-04 | All repositories are public under GPL-3.0-only. | Overrides summary decision 12, "everything private" (line 22), and the "private repository" wording in the repositories section (line 135). Settles open decision 19, the code licence text. The private-package token and deploy-key setup (lines 162-166) was written for private repos and has not been revisited. Open decision 8 still says "repo private" and still needs an owner answer on where the installer is hosted. |
| 2 | 2026-11-04 | moby-web keeps a signed-in panel under `/app/`. | Overrides summary decision 11, "no account panel" (line 21), and the moby-web change note, "only landing and demo" (line 34). The website section (line 921 onward) and stages Wb0 to Wb4 do not cover the panel. |
| 3 | 2026-11-04 | The LLM goes through OpenRouter. Default model `anthropic/claude-haiku-5.5`, fallback `openai/gpt-6-luna`. Chosen on list price and tool support. Latency and Uzbek quality are not measured. | Settles the LLM part of open decision 3. STT and TTS providers stay open. Summary decision 4 (provider-independent adapters) still holds. The selection criteria in the AI gateway section (line 745 onward) asked for measured Uzbek quality and latency; that evaluation has not been done and is still owed. |
| 4 | 2026-11-04 | Local history is kept 30 days by default and the user can change this. It is protected by the operating system's user-profile protection, not SQLCipher, and is stored in the local, non-roaming directory. | Settles open decision 9 (on-disk encryption). Adds a default retention period; the plan gave none. |
| 5 | 2026-11-04 | UI languages are Uzbek (Latin), Russian and English. | Settles open decision 22. Uzbek Cyrillic is not a UI language. |
| 6 | 2026-11-04 | `git_status` uses an in-process library (gix). | Settles open decision 13. No subprocess fallback is planned. |
| 7 | 2026-11-04 | The PC microphone is for development only. The product takes voice from the robot's microphone. | Settles open decision 23. Phase F3 can still use the PC microphone for provider evaluation in development. |
| 8 | 2026-11-05 | Every `open_app` and `open_project` launch needs its own on-screen confirmation. There is no "this session" or "always allow" option. `open_project` with no app opens Explorer. | Overrides the tools table (lines 594-595: "always allow" may be chosen) and the permission levels (line 606: once, this session, permanent) for these two tools. Other tools keep the plan's levels. |
| 9 | 2026-11-04 | No physical robot hardware exists yet. Firmware is proven by host tests and builds only. | Every firmware stage (F0 to F7) that needs a board is unverified. Phases F5 and F6 cannot meet their exit criteria on real hardware yet. |

## Plan open decisions

The plan's "Ochiq qarorlar" section (line 1211) lists 23 open decisions. The
table shows which of them the decisions above settle. "Open" means no owner
decision is recorded. Nothing here is a proposed answer.

| # | Plan open decision | State | Settled by |
| --- | --- | --- | --- |
| 1 | Product name, domain, trademark | Open | |
| 2 | Wake word phrase | Open | |
| 3 | LLM, STT, TTS providers | Partly settled: LLM only | Decision 3 |
| 4 | Hosting and region | Open | |
| 5 | Email service | Open | |
| 6 | Free tier limits and total budget | Open | |
| 7 | Windows code-signing certificate | Open | |
| 8 | Where the installer is distributed | Open; its "repo private" premise changed | Decision 1 changes the premise only |
| 9 | On-disk history encryption | Settled | Decision 4 |
| 10 | Telemetry and crash reports | Open | |
| 11 | Age limit and rules for minors | Open | |
| 12 | Desktop OAuth return method | Open in this repo; see moby-api ADR 0005 in the [ADR index](README.md) | |
| 13 | `git_status` implementation | Settled | Decision 6 |
| 14 | Robot USB channel | Open in this repo; see the moby-firmware F3 ADR in the [ADR index](README.md) | |
| 15 | Wi-Fi channel security | Open | |
| 16 | VAD method | Open | |
| 17 | Bot check type | Open in this repo; see the moby-api guest demo ADR in the [ADR index](README.md) | |
| 18 | Website analytics | Open | |
| 19 | Code licence text | Settled: GPL-3.0-only | Decision 1 |
| 20 | External security review budget | Open | |
| 21 | Support channel | Open | |
| 22 | Interface languages | Settled | Decision 5 |
| 23 | PC microphone in the product | Settled: development only | Decision 7 |

Rows 12, 14 and 17 are marked open here because no owner decision is recorded
in this file. Some repos have ADRs on these topics; they are indexed in
[README.md](README.md) and have not been checked against the plan here.
