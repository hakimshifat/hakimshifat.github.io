---
title: YTUI Music
description: A lightweight, keyboard-first terminal YouTube audio player with background search, inline thumbnails, mpv playback, and AUR packaging.
repo: https://github.com/hakimshifat/ytui_music
category: Open Source TUI
stack:
  - Python
  - Textual
  - mpv
  - yt-dlp
  - Arch Linux
featured: true
draft: false
---

## What it is

YTUI Music is a terminal-based YouTube audio player designed as a lightweight, keyboard-first alternative to browser-based listening. It searches YouTube, displays results with inline thumbnails, and plays selected audio through familiar controls.

## What I built

`yt.py` defines the Textual application and its interaction model. Search work runs through Textual workers so network activity does not freeze the interface. `utils/search.py` wraps yt-dlp search and video metadata extraction, while `player/audio.py` provides an mpv-backed audio-player abstraction for play, pause, stop, seek, duration, and volume.

The widget layer separates search-result rendering, thumbnail loading, and playback controls. Thumbnail URLs are cached by video ID for the session, reducing repeated requests while browsing results.

The application supports Vim-style navigation with `j`, `k`, `g`, and `G`, along with search submission, play/pause, stop, next/previous, seeking, and volume controls. The repository is also packaged for the Arch User Repository through `PKGBUILD` and `.SRCINFO`.

## Engineering decisions

The interface is keyboard-first and compact, allowing more results to remain visible in a terminal window. Search runs in the background, and playback is isolated behind an audio-player class so the Textual UI does not need to know mpv’s implementation details.

The README documents installation, requirements, keybindings, troubleshooting, and logging behavior. The project is therefore both a usable tool and a package-maintenance exercise.

## Why it matters

YTUI Music demonstrates product thinking in a constrained environment: identify a browser-free workflow, design a focused terminal interface, keep network work asynchronous, integrate an external player, and publish the result for Arch users.

## Evidence

- `yt.py` implements the Textual application, actions, keybindings, and background search workflow.
- `utils/search.py` uses yt-dlp for search and metadata extraction.
- `player/audio.py` wraps python-mpv playback operations.
- `widgets/search_result.py` and `widgets/thumbnail.py` render and cache result imagery.
- `PKGBUILD` and `.SRCINFO` support AUR distribution.
- The README documents controls, installation, troubleshooting, and logging.

## Limitations

YTUI Music requires Python, mpv, network access, and the relevant YouTube/yt-dlp behavior. It is a terminal client rather than a full music library or streaming service, and external service changes can affect search or playback.
