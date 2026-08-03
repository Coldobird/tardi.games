@README.md
@SDK.md

## Keeping the SDK docs current

`SDK.md` is a copy of the upstream SDK reference, inherited when this repo was forked. Its first line is a header comment with the date it was last updated upstream:

```
<!-- last-update: YYYY-MM-DD -->
```

If that date is more than 14 days before today, tell the user the SDK docs may be stale and offer to update them. Only if they agree, download the file from the repo root:

```bash
curl -fsSL https://raw.githubusercontent.com/juxhouse/tardi.games/main/SDK.md -o SDK.md
```

Use `curl` for this, not a web-fetch tool — the local copy must be the exact
upstream file, not a converted or summarized version.

If you are running non-interactively, do not ask: use the local copy and note
the staleness in your output.

Two exceptions: in the `juxhouse/tardi.games` repo itself `SDK.md` is the source
of truth, so never download over it — instead, when editing it, set the
`last-update` header to today's date. And if the user's own `SDK.md` has local
edits, warn them the download will discard those before running it.
