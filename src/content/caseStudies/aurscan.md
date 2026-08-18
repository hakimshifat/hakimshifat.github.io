---
title: aurscan
description: A local, CLI-first, evidence-based scanner for Arch Linux AUR recipes that analyzes package metadata and commands without executing repository content.
eyebrow: DEFENSIVE CLI / STATIC PACKAGE ANALYSIS
repo: https://github.com/hakimshifat/aurscan
category: Security tooling
role: Security tool builder · parser, policy, and reporting layers
year: 2026
problem: Reviewing an AUR recipe often means trusting shell-shaped metadata before you know what it will do, while dynamic execution is exactly the wrong first step for untrusted package content.
outcome: A bounded read-only scanner that turns PKGBUILD behavior, source integrity, metadata mismatches, and uncertainty into evidence-rich terminal, JSON, and SARIF reports.
visual: scanner
stack:
  - Python 3.12
  - Arch Linux
  - Static analysis
  - SARIF
  - Tree-sitter path
metrics:
  - label: Default behavior
    value: Never execute
    detail: The static path does not source, import, build, or install scanned recipes.
  - label: Release slice
    value: 0.1.0
    detail: First complete vertical slice from local traversal to policy report.
  - label: Exit contract
    value: 0–5
    detail: Stable results for pass-with-notes, review, block, input, acquisition, and parser failures.
featured: true
draft: false
---

## Scan first. Run never.

AUR recipes are small files, but they are not harmless text. `PKGBUILD` and `.install` can contain shell behavior, mutable sources, lifecycle hooks, privilege operations, and credential-bearing URLs. The safest first move is therefore not “build it in a sandbox”; it is **inspect the recipe as an untrusted artifact and preserve the uncertainty you cannot resolve**.

That is the product boundary of `aurscan`. A successful scan is not a safety certification. It is a decision-support report with explicit evidence, confidence, and coverage.

> [!WARNING]
> Unresolved Bash behavior is reported as incomplete coverage rather than treated as benign. The scanner’s most important feature is the operation it refuses to perform.

## From checkout to decision

```text
local package checkout
          │
          ▼
bounded traversal + file hashes
          │
          ├── PKGBUILD / .install ──► conservative Bash inspection
          ├── .SRCINFO             ──► declarative metadata parser
          └── sources + checksums   ──► integrity and URL rules
                                      │
                                      ▼
                 finding(rule, severity, confidence, location)
                                      │
                    redaction + deterministic policy decision
                                      │
                 terminal report · JSON · SARIF · stable exit code
```

The scanner reads `PKGBUILD`, `.install`, `.SRCINFO`, declared sources, and recipe commands. It bounds repository and file sizes, rejects symlinked input files, sanitizes terminal-control characters, and redacts credential-like URL values before they reach a report.

## What I built

The implementation is organized as a vertical slice rather than a collection of disconnected checks.

| Layer | Repository surface | Result |
| --- | --- | --- |
| Input boundary | Local traversal, size limits, symlink rejection | A bounded set of files to inspect. |
| Parsing | `recipe.py`, `srcinfo.py`, conservative Bash path | Structured package and command facts without shell evaluation. |
| Rules | Source, checksum, URL, lifecycle, privilege, persistence, and payload checks | Stable findings with evidence locations. |
| Policy | `policy/evaluator.py` | `pass_with_notes`, `review`, or `block` decisions. |
| Reporting | Terminal, JSON, and SARIF renderers | Human review and CI/code-scanning integration. |
| Hygiene | `redaction.py` | Safer evidence strings and sanitized output. |

A finding carries more than a severity label. The model includes a stable rule ID, confidence, evidence location, remediation text, and fingerprint. That makes repeated scans comparable and gives a reviewer something better than “high risk” with no path back to the source line.

## The CLI is designed for a review loop

```bash
aurscan scan --local ./package --offline --format terminal
aurscan scan --local ./package --format json --output report.json
aurscan scan --local ./package --format sarif --output report.sarif
```

Exit codes are part of the interface: `0` for pass-with-notes, `1` for review, `2` for block, `3` for invalid input or configuration, `4` for acquisition failure, and `5` for parser or internal failure. This turns the scanner into something a developer can place before a build step without scraping human-readable output.

The exact AUR RPC client, hardened Git retrieval, OSV identity adapter, and read-only pacman inventory are service modules around the local-first core. Network acquisition is explicit; the default safety path does not need it.

## Why the “never execute” invariant changes the design

The scanner cannot use the convenience of shell evaluation to understand every dynamic branch. Instead, uncertainty is a first-class output. Static Bash inspection can identify dangerous shapes—download-to-execution pipelines, dynamic evaluation, privilege operations, sensitive filesystem writes, persistence hooks, encoded payloads—but it cannot prove intent or fully predict runtime behavior.

That limitation is honest and useful. It prevents a green result from meaning “we failed to understand this script, so it must be safe.”

## Evidence map

- `src/aurscan/scanner.py` coordinates the bounded repository scan.
- `src/aurscan/parsing/bash_ast.py` performs conservative command inspection.
- `src/aurscan/parsing/recipe.py` parses sources, checksums, and package metadata.
- `src/aurscan/parsing/srcinfo.py` treats `.SRCINFO` as data rather than executing it.
- `src/aurscan/policy/evaluator.py` maps findings to policy decisions and exit codes.
- `src/aurscan/report/renderers.py` emits terminal, JSON, and SARIF formats.
- `src/aurscan/redaction.py` sanitizes and redacts evidence values.
- `tests/unit/` covers installation, scanner behavior, and service modules.

## Status and limits

Version `0.1.0` implements the first complete vertical slice: local traversal, hashing, `.SRCINFO` parsing, conservative Bash inspection, source and behavior rules, deterministic policy, multiple report formats, and a read-only inventory adapter. Full dependency graphs, history diffs, installed-package orchestration, and dynamic builds remain out of scope for this release.

A pinned checksum binds bytes to a recipe, not to benign intent. A pinned Git commit can still contain malicious code, and advisory databases are incomplete. `aurscan` reports evidence, confidence, and coverage; it does not certify a package.

## Repository

[View the source repository →](https://github.com/hakimshifat/aurscan)
