---
title: "Gaming on Linux"
description: "A step-by-step guide to setting up gaming on Arch Linux using Lutris, Wine, and GE-Proton for running Windows games."
pubDate: "2025-12-28"
tags: ["linux", "gaming", "arch-linux", "lutris", "proton"]
heroImage: "/media/arch1.png"
---

# For Arch Linux Only

1. Install Lutris
2. Install Necessary Dependencies

```bash
sudo pacman -S --needed lutris wine-staging giflib lib32-giflib \
  libpng lib32-libpng libldap lib32-libldap gnutls lib32-gnutls \
  mpg123 lib32-mpg123 openal lib32-openal v4l-utils lib32-v4l-utils \
  libpulse lib32-libpulse libgpg-error lib32-libgpg-error \
  alsa-plugins lib32-alsa-plugins alsa-lib lib32-alsa-lib \
  libjpeg-turbo lib32-libjpeg-turbo sqlite lib32-sqlite \
  libxcomposite lib32-libxcomposite libxinerama lib32-libxinerama \
  ncurses lib32-ncurses libva lib32-libva vulkan-intel lib32-vulkan-intel \
  mesa lib32-mesa lib32-libx11 lib32-libxss
```

![](/images/blog/Pasted%20image%2020251228184750.png)

![](/images/blog/Pasted%20image%2020251228184938.png)
![](/images/blog/Pasted%20image%2020251228185129.png)

Make sure you have GE-Proton (Latest) selected:

![](/images/blog/Pasted%20image%2020251228185247.png)

All set. Now only need to run the setup file.

![](/images/blog/Pasted%20image%2020251228185445.png)

Give a name. That will be the name of the prefix aka your Windows system folder name that will contain the game.

![](/images/blog/Pasted%20image%2020251228185537.png)

Go through Install -> Continue and then select setup file for your game. After it's done, right click on the game and click on *configure*. Then:

![](/images/blog/Pasted%20image%2020251228185837.png)

Go to *Game options* where you need to select the executable runner of the game.
