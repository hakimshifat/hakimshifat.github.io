---
title: Tiny x64 Bootloader
description: A minimal 512-byte BIOS boot sector for exploring x86 startup, real-mode initialization, segment registers, and stack setup.
repo: https://github.com/hakimshifat/Tiny-x64-Bootloader
category: Low-Level Systems
stack:
  - Assembly
  - x86_64
  - BIOS
  - NASM
  - Bochs
featured: true
draft: false
---

## What it is

Tiny x64 Bootloader is a minimal boot-sector experiment built around the BIOS 512-byte boot requirement. It explores what happens before a modern operating system exists: firmware loads the sector, the processor begins in real mode, and the boot code must establish a predictable execution environment.

## What I built

The project’s `bootloader.asm` initializes the early execution state, configures segment registers, establishes a stack, and provides a compact starting point for chainloading or extending into a larger boot flow. The repository includes a 512-byte boot image, NASM-oriented source, and Bochs configuration for repeatable emulation.

## Engineering decisions

The project keeps the boot sector deliberately small so that every instruction has an observable purpose. The README documents the 512-byte constraint, the difference between real mode and protected mode, and how a tiny first-stage loader can hand off to a larger loader such as GRUB.

Bochs configuration makes the experiment reproducible without requiring a physical machine. The repository also keeps the assembled artifact alongside the source so the relationship between source size and boot-sector constraints is visible.

## Why it matters

This is a strong low-level case study because it shows comfort with the boundary between hardware startup, firmware conventions, binary size constraints, and assembly-level state management. It complements the higher-level security tooling in the portfolio.

## Evidence

- `bootloader.asm` contains the compact boot-sector implementation.
- `boot.com` is the assembled 512-byte artifact.
- `bochsrc.txt` and `bochsout.txt` support emulator-based testing and inspection.
- The repository documents BIOS startup, POST, real mode, protected mode, and chainloading.

## Limitations

This is an educational first-stage boot experiment rather than a complete operating-system boot chain. It focuses on initialization and low-level understanding; protected-mode transitions, filesystem loading, and a full kernel handoff are outside the current scope.
