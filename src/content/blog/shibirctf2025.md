---
title: "ShibirCTF2025"
description: "Writeups from ShibirCTF 2025 covering reverse engineering challenges, steganography, and forensics."
pubDate: "2025-12-16"
tags: ["ctf", "reverse-engineering", "steganography", "forensics", "writeup"]
heroImage: "/images/blog/shibir.jpeg"
---

## Reverse Engineering

### Returing is Hard

Just patching the program to execute the print_flag function was enough.

![](/images/blog/2025-12-16_18-42.png)

![](/images/blog/Pasted%20image%2020251216184412.png)

### Slogran of July

![](/images/blog/Pasted%20image%2020251216193613.png)

### Wanna Hang Haxina

Using strings command:

![](/images/blog/Pasted%20image%2020251216192217.png)

This string appeared twice. So:

![](/images/blog/Pasted%20image%2020251216190314.png)

#### The file is a PNG image encrypted with ASCII Shift of +5

```python
try:
    with open("encrypted.file", "rb") as f:
        data = f.read()
    decrypted = bytes([(b - 5) % 256 for b in data])
    with open("flag.png", "wb") as f:
        f.write(decrypted)
    print("Success! Open flag.png to see the image.")
except Exception as e:
    print(e)
```

That gives an image with the flag:

![](/images/blog/Pasted%20image%2020251216190723.png)

## Steganography

### Unlimited Crack

![](/images/blog/Pasted%20image%2020251216193242.png)

![](/images/blog/Pasted%20image%2020251216193317.png)

![](/images/blog/Pasted%20image%2020251216193352.png)

## Forensics

### Forensics - 1

It said something about digital signature. So I tried it. Took a few attempts:

![](/images/blog/Pasted%20image%2020251216193933.png)

First thing I did was select all texts with `Control+A` then made all font color to *black*:

![](/images/blog/Pasted%20image%2020251216194117.png)

That gave the first flag:

![](/images/blog/Pasted%20image%2020251216194150.png)
