---
title: Meme Mirror Local
description: A privacy-first Linux camera application that turns meme and anime reaction images into teachable face-and-hand pose prompts.
eyebrow: LOCAL COMPUTER VISION / PLAYFUL UX
repo: https://github.com/hakimshifat/meme-mirror-local
category: Computer vision
role: Product engineer · vision pipeline and interaction design
year: 2026
problem: Stylized reaction images are fun prompts but poor ground truth for direct image similarity, while camera-based experimentation often sends personal frames to an opaque remote service.
outcome: A local rehearsal loop where the user teaches a real pose once, receives interpretable live feedback, and keeps images, profiles, and camera measurements on the machine.
visual: camera
stack:
  - Python
  - OpenCV
  - MediaPipe
  - Local JSON storage
  - Pygame effects
metrics:
  - label: Match model
    value: 72 / 28
    detail: Facial proportions contribute 72%; taught hand gesture contributes 28%.
  - label: Local data
    value: 0 uploads
    detail: References, profiles, landmarks, and camera frames stay under data/.
  - label: Effect guard
    value: 0.35 s
    detail: The default hold time prevents one-frame score jitter from retriggering effects.
featured: true
draft: false
---

## A reaction image is a prompt, not a measurement

Meme Mirror Local started with a deliberately small interaction: pick a meme or anime reaction image, make the expression yourself, and see how close you can get. The design problem is that the original image is usually stylized, cropped, or drawn. Treating its pixels as a biometric target would be both technically brittle and conceptually wrong.

The solution is a **teach-a-pose loop**. The image remains a human-facing reference card; the machine-readable target is the pose the user demonstrates in front of the camera.

> [!TIP]
> The application matches a locally taught version of the reaction—not the drawn character’s pixels. That makes the feedback more understandable and keeps the project in the territory of playful rehearsal rather than emotion diagnosis.

## The interaction loop

```text
add image ──► choose card ──► face the camera ──► press T to teach
    ▲                                                   │
    └────── live score + gesture state ◄──── compare ◄──┘
                              │
                   sustained match → local effect
```

The first run creates a local reference library and downloads the official MediaPipe task bundles into `models/`. After that, the camera loop can work from the local files. `[` and `]` move between cards, `T` teaches the active card, `X` removes it, and `Q` or `Esc` exits cleanly.

## What I built

The code is split around responsibilities that can be tested independently:

| Module | Responsibility | Design payoff |
| --- | --- | --- |
| `meme_mirror/vision.py` | MediaPipe face and hand tasks, BGR→RGB conversion, landmark features | Keeps camera/model concerns out of scoring. |
| `meme_mirror/core.py` | Reference cards, JSON persistence, pose comparison | Makes the target state inspectable and portable. |
| `meme_mirror/effects.py` | Threshold, hold time, cooldown, audio, overlay | Keeps celebration behavior from contaminating the matcher. |
| `app.py` | CLI, OpenCV window, selection and key handling | Turns the modules into a usable rehearsal tool. |

The face side extracts normalized proportions such as mouth openness, eye openness, brow lift, and smile shape. Hand tracking reduces a live pose to a small gesture vocabulary—V-sign, open palm, another detected hand position, or no hand. The final score remains interpretable instead of becoming an unexplained embedding distance.

## The effect system is a tiny state machine

A visual burst or sound does not fire the instant a score crosses a threshold. The score must remain above the configured threshold for a hold period; a cooldown then limits retriggers. The default example uses an 85 score threshold, a 0.35-second hold, a 2.5-second cooldown, and a 1.1-second effect duration.

```json
{
  "threshold": 85,
  "hold_seconds": 0.35,
  "cooldown_seconds": 2.5,
  "duration_seconds": 1.1
}
```

That small amount of hysteresis makes the interface feel intentional. It prevents a noisy camera frame from playing a sound repeatedly while the user hovers around the success boundary.

## Privacy is part of the feature

Camera frames, landmark measurements, saved profiles, and copied reference images remain under `data/`. The repository’s runtime directories are intentionally ignored by Git. Model bundles live under `models/` and are reused locally. No remote inference service is required for the core loop.

The local boundary also makes deletion concrete: removing a reference card removes its copied image and library entry. This is a better privacy story than simply saying “we do not store your data” without showing where the state lives or how it is removed.

## Evidence map

- `meme_mirror/vision.py` implements MediaPipe model setup, face/hand observations, and pose-feature extraction.
- `meme_mirror/core.py` implements the weighted score and JSON reference-library persistence.
- `meme_mirror/effects.py` implements thresholded celebration effects, cooldown behavior, and overlay composition.
- `tests/test_core.py` covers exact-profile scoring, missing profiles, gesture mismatch, and persistence.
- `tests/test_effects.py` covers effect state and overlay handling.
- `run.sh` creates the isolated environment and downloads task models only when needed.

## Limits and honest framing

This is playful feedback, not identity verification, surveillance, or emotion recognition. Results vary with camera framing, lighting, hand visibility, and the quality of the taught pose. An anime card that never “matches” is usually asking for a better real-world demonstration, not proving that the original artwork was machine-readable.

## Repository

[View the source repository →](https://github.com/hakimshifat/meme-mirror-local)
