# Security Policy

SindicApp is a static site with no backend, no database, and no real user accounts (see [ADR 0003](docs/decisions/0003-avoid-backend-store-demo-state-in-localstorage.md)) — all demo data lives in the visitor's own browser via `localStorage` and is never transmitted anywhere. That significantly limits the kind of vulnerabilities that are possible here (there's no server to compromise, no database to leak), but issues are still worth reporting: things like a supply-chain problem in a dependency, a way to inject content that runs in another visitor's browser (XSS), or a way to trick the demo "anonymous denuncia" flow into looking more real/official than it is.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for anything security-sensitive.

Preferred: use [GitHub's private vulnerability reporting](https://github.com/EduNauta/sindicapp/security/advisories/new) on this repository (Security tab → Report a vulnerability). This opens a private conversation with the maintainer and, where relevant, lets a fix be prepared before public disclosure.

Alternatively, email the maintainer directly: eduardo.collin.h@gmail.com.

## What to expect

This is a small, mostly solo-maintained prototype — there's no formal SLA, but reports will be acknowledged and looked at as soon as reasonably possible. Given the project's nature (labor-organizing infrastructure), reports involving anything that could expose or deanonymize a user of the real (non-demo) future version will be treated as highest priority once that functionality exists.
