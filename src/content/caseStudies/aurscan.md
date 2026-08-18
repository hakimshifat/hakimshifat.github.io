---
title: aurscan
description: A local, CLI-first, evidence-based scanner for Arch Linux AUR recipes that analyzes package metadata and commands without executing repository content.
repo: https://github.com/hakimshifat/aurscan
category: Security Tooling
stack:
  - Python
  - Arch Linux
  - Static Analysis
  - CLI
  - SARIF
featured: true
draft: false
---

## What it is

`aurscan` is a read-only scanner for Arch Linux AUR package recipes. It inspects `PKGBUILD`, `.install`, `.SRCINFO`, source declarations, and recipe commands, then produces a risk assessment with explicit severity, confidence, evidence, and coverage.

## What I built

The parser layer includes a bounded Bash inspection path, declarative `.SRCINFO` parsing, recipe extraction, checksum collection, and mismatch detection between `PKGBUILD` literals and generated metadata. The scanner refuses symlinked input files and applies size and line limits before analysis.

The policy layer models findings with severity and confidence, evaluates blocking decisions using a configurable threshold, and emits stable exit codes. The reporting layer renders terminal, JSON, and SARIF output so the same evidence can be used interactively, in automation, or inside code-scanning workflows.

The redaction layer sanitizes terminal-control characters and removes credential-like values from evidence before they reach reports. The repository also includes service modules for AUR RPC, hardened Git retrieval, OSV identity lookup, and read-only pacman inventory.

## Engineering decisions

The default static path never sources, evaluates, imports, builds, or installs the scanned recipe. Unresolved Bash behavior is reported as incomplete coverage rather than assumed benign. This creates a safer boundary for analyzing untrusted package recipes.

The scanner is intentionally evidence-based rather than a safety certification. A finding includes a stable rule ID, severity, confidence, evidence location, remediation, and fingerprint. The project also makes limitations explicit: static Bash analysis cannot determine every runtime behavior, and a pinned source can still contain malicious code.

## Why it matters

`aurscan` demonstrates security tooling that favors conservative analysis, explicit uncertainty, bounded input handling, and machine-readable reports. It is a strong example of combining Linux ecosystem knowledge with practical defensive engineering.

## Evidence

- `src/aurscan/parsing/bash_ast.py` performs bounded static Bash inspection.
- `src/aurscan/parsing/recipe.py` parses package recipes, sources, checksums, and metadata mismatches.
- `src/aurscan/parsing/srcinfo.py` treats `.SRCINFO` as data without invoking a shell.
- `src/aurscan/policy/evaluator.py` maps findings to policy decisions and exit codes.
- `src/aurscan/report/renderers.py` emits JSON and SARIF reports.
- `src/aurscan/redaction.py` sanitizes and redacts report evidence.
- `tests/unit/` covers installation, scanning, and service behavior.

## Limitations

The current release does not dynamically build or install packages. Full dependency graphs, history diffs, and installed-package dashboard workflows remain separate milestones. The tool reports evidence and coverage; it does not certify that a package is safe.
