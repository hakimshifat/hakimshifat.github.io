---
title: SOC Triage Calibration & Adversarial Evaluation
description: A reproducible research package for auditing alert datasets, freezing independent evaluation splits, and testing whether confidence-gated SOC automation survives prompt-injection pressure.
eyebrow: RESEARCH ENGINEERING / EVALUATION INFRASTRUCTURE
repo: https://github.com/hakimshifat/soc-triage-calibration
category: Security research
role: Research engineer · dataset and evaluation design
year: 2025–2026
problem: SOC automation can look accurate while quietly leaking information across splits, relying on duplicated alerts, or treating synthetic attack data as confirmatory evidence.
outcome: A repository that turns those failure modes into explicit artifacts, validators, manifests, and frozen evaluation roles before model training is allowed to make claims.
visual: pipeline
stack:
  - Python
  - JSON / CSV
  - Manifest validation
  - Selective prediction
  - Adversarial evaluation
metrics:
  - label: Independent unit
    value: Unique alerts
    detail: Repeated model responses are not treated as independent observations.
  - label: Evaluation roles
    value: 5 frozen splits
    detail: D_policy, D_cal, D_threshold, D_test_clean, and D_test_adv.
  - label: Safety boundary
    value: Read-only
    detail: Scripts write new reports and never modify source data.
featured: true
draft: false
---

## The real problem was not “train a classifier”

The project began from a more uncomfortable question: **when should an SOC triage policy be trusted enough to automate a decision?** A binary true-positive/false-positive prediction is only one layer. The package also needs to estimate whether that prediction is likely to be correct, decide when to abstain, and test whether attacker-controlled text can move the policy or its confidence gate.

That makes dataset design part of the security boundary. If duplicate alerts, organization identifiers, or derived traces leak across partitions, a high score can describe the split rather than the system.

> [!WARNING]
> Synthetic logs are treated as engineering fixtures unless their provenance and eligibility are verified. They are useful for testing throughput and harness behavior, but they are not silently promoted to confirmatory SOC evidence.

## The package is organized around frozen roles

The core design is a role assignment that happens **before** trace generation or injection. This prevents the evaluation from tuning itself on the final test sets.

```text
source artifacts
      │
      ▼
provenance + duplicate audit ──► candidate manifest
      │                                  │
      └─────────────── split freeze ─────┘
                         │
       ┌─────────────────┼──────────────────┐
       ▼                 ▼                  ▼
    D_policy          D_cal            D_threshold
       │                 │                  │
       └─────────────── policy + calibrator ┘
                         │
                ┌────────┴────────┐
                ▼                 ▼
          D_test_clean       D_test_adv
```

The important detail is not the diagram itself; it is the order of operations. `D_test_adv` keeps a pointer to its clean source record and preserves the ground-truth label. The injected variant is a paired stress test, not a new label source.

## What I built

The repository contains a small but deliberate toolchain rather than a single notebook. `src/audit_dataset.py` checks structural shape, identifiers, labels, and duplicates. `src/validate_manifest.py` enforces manifest schema, partition roles, provenance fields, and split independence. The evaluation surface is prepared for selective metrics such as risk–coverage, AURC, false auto-close, false auto-prioritize, and confident-error severity.

The package also has an explicit boundary for the later model-facing work. `src/injection_harness.py` is designed for paired clean/injected generation with field constraints and provenance tracking, while the manifest and schema files keep the experiment auditable when the model or GPU environment changes.

| Layer | Artifact | Why it exists |
| --- | --- | --- |
| Provenance | Source, revision, checksum, license, transformation | Makes a dataset claim traceable. |
| Partitioning | `D_policy` through `D_test_adv` | Prevents threshold tuning on final tests. |
| Validation | Manifest and split validators | Fails early on duplicate or role errors. |
| Adversarial testing | Clean/injected pairs | Measures robustness without changing labels. |
| Reporting | JSON, CSV, and Markdown outputs | Leaves inspectable evidence instead of notebook state. |

## Engineering decisions that matter

### Preserve native labels while allowing derived views

A binary TP/FP analysis view can be useful, but native labels remain intact. That distinction matters when a later audit needs to explain how a derived decision was produced rather than pretending the derived view was the original ground truth.

### Select thresholds once

Automation thresholds belong to validation data. The clean and adversarial test sets are not tuning surfaces. This is a small rule with a large consequence: it keeps “confidence-gated automation” from becoming a post-hoc choice that only works on the displayed chart.

### Treat provenance as data, not documentation

The manifest is not a README appendix. It records the source and transformation chain next to the artifact so validators and later reports can consume it. The repository intentionally separates this engineering package from the canonical manuscript vault and excludes private telemetry, credentials, and uncontrolled attack payloads.

## Evidence map

| Repository signal | What it demonstrates |
| --- | --- |
| `src/audit_dataset.py` | Structural, label, identifier, and duplicate auditing. |
| `src/validate_manifest.py` | Schema, partition, provenance, and split-independence checks. |
| `configs/manifest_schema.json` | Controlled fields for reproducible dataset roles. |
| `P1_GUIDE/analysis/` | Duplicate, shortcut, leakage, token-length, and split probes. |
| `reports/` | Generated audit, eligibility, adjudication, and source-verification artifacts. |
| `sample_10_alerts_demo.jsonl` | A small runnable fixture for checking the package without private telemetry. |

## Status and limits

The initial package includes the audit module, manifest validator, schema, tests, and reports generated from the currently available artifacts. QLoRA training and target-Qwen trace generation remain dependent on a verified dataset-role freeze and suitable GPU execution.

This is evaluation infrastructure, not a claim that SOC triage is solved. A validator can expose leakage and provenance failures; it cannot make a dataset representative by itself. The next responsible step is broader verified data and a pre-registered evaluation, not a more impressive demo score.

## Repository

[View the source repository →](https://github.com/hakimshifat/soc-triage-calibration)
