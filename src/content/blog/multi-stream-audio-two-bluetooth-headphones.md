---
title: "Multi-Stream Audio: Connect Two Bluetooth Headphones on Arch Linux"
description: "A guide to routing audio to two Bluetooth headphones simultaneously on Arch Linux using PipeWire, qjackctl, and pavucontrol."
pubDate: "2026-01-10"
tags: ["linux", "arch-linux", "pipewire", "bluetooth", "audio"]
heroImage: "/media/arch1.png"
---

If you've ever tried to watch a movie with a friend on a laptop, you've probably faced the "one earbud each" struggle. Yesterday, my friend and I wanted the full cinematic experience without sharing earpieces. Since I'm using **Arch Linux** (btw), I knew there had to be a way to route audio to two Bluetooth devices simultaneously.

PipeWire makes this surprisingly simple once you visualize the "patchbay." Here is how I did it.

## Prerequisites

First, you'll need to install the necessary tools to interface with PipeWire via the JACK API and a visual controller.

```sh
sudo pacman -S pipewire-jack qjackctl pavucontrol
```

## The Setup

### 1. Connect your Hardware

Pair and connect both Bluetooth headphones to your system as you normally would via `bluetui` or your GUI manager.

### 2. Launch the Patchbay

We use `qjackctl` as a visual bridge. Since we are using PipeWire, we need to run it through the `pw-jack` wrapper so it sees your modern audio nodes:

```sh
pw-jack qjackctl &
```

![](/images/blog/Pasted%20image%2020260110095402.png)

---

### 3. Routing the Audio

The magic happens in the **Graph** (or Patchbay) window.

1. In `qjackctl`, click the **Graph** button.
2. Look for your **Bluetooth internal playback** nodes. These represent your system's audio output.
3. Identify your two headphones (they usually appear as `playback_FL` and `playback_FR` under the device name).
4. **The Link:** Simply click and drag a line from your system's `output_FL/FR` to the `playback` ports of _both_ devices.

### 4. Level Matching

Open `pavucontrol` (PulseAudio Volume Control) to adjust the individual volumes of each headset, as one friend might prefer it louder than the other.

![](/images/blog/Pasted%20image%2020260107225026.png)
