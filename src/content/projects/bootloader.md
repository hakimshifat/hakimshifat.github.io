---
title: "Tiny x64 Bootloader"
description: "A minimal 512-byte x64 boot sector that demonstrates BIOS boot process fundamentals including real mode initialization, segment register setup, and stack configuration."
pubDate: "2025-11-10"
heroImage: "/images/projects/x86.png"
tags: ["Assembly", "x86_64", "Low-Level", "OS Dev"]
---

# Tiny x64 Bootloader

A minimal 512-byte x64 boot sector that demonstrates BIOS boot process fundamentals including real mode initialization, segment register setup, and stack configuration.

## Overview

This project is an exploration into low-level operating system development. It acts as a foundational boot sector that fits perfectly within the standard 512-byte limit of a Master Boot Record (MBR). 

## Key Features

* **Real Mode Initialization:** Handles the transition and initialization phases immediately following BIOS hand-off.
* **Segment Register Setup:** Correctly configures segment registers for memory addressing.
* **Stack Configuration:** Sets up a functional stack for subroutines and operations.
* **Size Constraint:** Optimized to fit strictly within 512 bytes.

## Technologies Used

* **x86_64 Assembly** - Written entirely in low-level assembly for absolute control.
