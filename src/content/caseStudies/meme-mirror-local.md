---
title: Meme Mirror Local
description: A privacy-first Linux camera application that turns meme and anime reaction images into teachable face-and-hand pose prompts.
repo: https://github.com/hakimshifat/meme-mirror-local
category: Computer Vision
stack:
  - Python
  - OpenCV
  - MediaPipe
  - Local Vision
  - Linux
featured: true
draft: false
---

## What it is

Meme Mirror Local is a Linux Python camera application that lets a user add a meme or anime reaction image, teach the application a physical pose, and then receive local feedback while reproducing that reaction.

## What I built

The application separates camera observation, pose extraction, reference persistence, scoring, and celebration effects. `meme_mirror/vision.py` owns the MediaPipe Face Landmarker and Hand Landmarker tasks, converts camera frames from BGR to RGB, extracts normalized landmarks, and translates them into scale-independent reaction signals.

`meme_mirror/core.py` stores reference cards and taught pose profiles in a local JSON library. The scoring model combines facial proportions and hand-gesture matching, with the repository documenting a 72% facial and 28% hand weighting. `meme_mirror/effects.py` adds optional local audio and transparent visual overlays after a high-confidence match remains stable for the configured hold time.

## Engineering decisions

The project uses a teach-a-pose workflow instead of pretending that a stylized anime image can be directly treated as a reliable biometric target. The user demonstrates the real-world version of the reaction, and the application compares later observations with that local profile.

The privacy model is intentionally local. Camera frames, landmark measurements, saved pose profiles, and reference images remain under the local `data/` directory. MediaPipe model bundles are downloaded into `models/` and reused on subsequent runs.

## Why it matters

Meme Mirror Local is a distinctive computer-vision project because it combines a playful interface with explicit privacy boundaries and interpretable matching logic. It shows that I can turn a creative idea into a modular local application without hiding the important assumptions behind an opaque similarity score.

## Evidence

- `meme_mirror/vision.py` implements MediaPipe model setup, face/hand observations, and pose extraction.
- `meme_mirror/core.py` implements reference-library persistence and pose scoring.
- `meme_mirror/effects.py` implements thresholded celebration effects with cooldown behavior.
- `tests/test_core.py` covers identical poses, missing profiles, mismatches, and persistence.
- `tests/test_effects.py` covers local effect behavior and overlay handling.

## Limitations

The matching system is playful feedback, not identity verification or emotion diagnosis. Results depend on lighting, camera framing, and a deliberate teaching pose. The application also depends on local camera permissions and MediaPipe model availability.
