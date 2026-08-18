---
title: SOC Triage Calibration and Adversarial Evaluation
description: An evidence-first engineering package for auditing SOC alert datasets, validating split independence, and evaluating confidence-gated triage under adversarial prompt injection.
repo: https://github.com/hakimshifat/soc-triage-calibration
category: Security Research
stack:
  - Python
  - Dataset Auditing
  - Calibration
  - Provenance
  - Adversarial Evaluation
featured: true
draft: false
---

## What it is

`soc-triage-calibration` is an engineering package for SOC L1 automation research. It separates data auditing, manifest validation, selective-prediction evaluation, and later adversarial prompt-injection experiments so that research claims can be traced back to explicit inputs and split assignments.

## What I built

The repository contains a dataset auditor, a manifest validator, research reports, controlled data manifests, split audits, and scripts for generating and validating derived artifacts. The core modules include `src/audit_dataset.py`, `src/validate_manifest.py`, `src/selective_metrics.py`, and the planned injection harness.

The dataset auditor loads JSON or CSV rows, computes stable row hashes, detects exact duplicate rows, checks recognized label fields, and reports repeated identifiers. The manifest validator checks required fields, allowed partitions, provenance status, review status, source checksums, and group overlap across partitions.

## Engineering decisions

The project treats unique alerts as the independent unit rather than assuming repeated model responses are independent observations. It assigns policy, calibration, threshold, clean-test, and adversarial-test roles before generating derivatives. It also preserves native labels and requires adversarial records to retain a pointer to their clean source without changing ground truth.

The design deliberately avoids destructive behavior. Scripts read source material and write reports; they do not install packages, execute untrusted alert content, or treat synthetic data as confirmatory SOC evidence.

## Why it matters

This project demonstrates a research-engineering approach to security automation: make provenance explicit, freeze thresholds before final evaluation, audit independence, and report uncertainty instead of hiding it behind a single accuracy number.

## Evidence

- `src/audit_dataset.py` detects duplicate rows, repeated identifiers, label-field coverage, and stable row hashes.
- `src/validate_manifest.py` validates partition membership, required provenance fields, source checksums, and group overlap.
- `configs/manifest_schema.json` defines the controlled manifest contract.
- `reports/` contains generated audit and validation artifacts.
- `tests/` contains CSV and manifest fixtures for deterministic checks.

## Limitations

The repository is an engineering and research package, not a finished SOC product. QLoRA training and target-model trace generation depend on a verified dataset-role freeze and suitable GPU execution. The case study therefore emphasizes research controls and reproducibility rather than claiming production deployment.
