# moby-docs

The home of the Moby project's single plan, decision records and compatibility
table. Moby is a small desktop companion robot with a Windows app, a backend and
a website. This repository holds documents and the checks for them, no product code.

## Contents

| File | What it is |
| --- | --- |
| [plan/moby-plan-v1.0.md](plan/moby-plan-v1.0.md) | The v1.0 technical plan, converted from the owner's Word file. Uzbek, unedited. |
| [decisions/owner-decisions.md](decisions/owner-decisions.md) | Owner decisions made after v1.0. Where they conflict with the plan, they win. |
| [decisions/README.md](decisions/README.md) | Index of the ADRs kept in each repo's `docs/adr/`. |
| [compatibility.md](compatibility.md) | Which versions of desktop, API, protocol and firmware work together. |
| [status.md](status.md) | Progress per plan stage, with evidence. |

The plan is a faithful conversion: its text, tables and two images are kept
as they were, including any wording the owner has since overridden. Read the
owner decisions file alongside it.

## Check the documents

Needs Node 24 and `npm`. From this folder:

```powershell
npm.cmd ci
npm.cmd run check
```

`check` runs `markdownlint-cli2` for format and `markdown-link-check` for
relative links. External `http` links are not fetched, so the check works
offline. The plan folder is excluded from the format rules because it is a
conversion of another document. The same check runs in GitHub Actions
(`.github/workflows/ci.yml`).

## Licence

GPL-3.0-only. See [LICENSE](LICENSE).
