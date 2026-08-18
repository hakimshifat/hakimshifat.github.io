---
title: "RABCTF 2026 Reverse Writeups"
description: "Writeups for RABCTF 2025 Reverse challenge category - Strings, Password Checker, XOR Baby"
pubDate: "2026-04-23"
tags: ["ctf", "reverse-engineering", "rabctf"]
type: writeup
featured: true
heroImage: "/images/blog/rabctf.png"
---

# Strings

**Description:**
Sometimes the answer is right in front of you. Can you find the flag hidden inside this binary?

Solution:
A basic binary is given. The first thing after getting a binary is *detecting* the *file type* and running basic commands like *strings* on the file. The main purpose of this problem was to introduce players to tools like that.
![](/images/blog/rabctf-rev-1.png)


# Strings 2

**Description:**
This file is huge! The flag is hidden somewhere in this haystack. Can you find it?


This problem is similar to the first one. But there are too much strings on this. So using **grep** command is a must on it. 
![](/images/blog/rabctf-rev-2.png)

Or you can use any capable text editor to search for the flag. Since file type says its just *ASCII*

# Password Checker


**Description:**
A tiny Linux password checker stands between you and the flag. Can you find the secret password and get the flag?

Now its Real deal.
![](/images/blog/rabctf-rev-3.png)

Lets run the binary and see.
![](/images/blog/rabctf-rev-4.png)

So basically its a *crackme*, When i run it, it asks for a password. If the password is right, you will get the flag. So need to learn the password.

From here one can take many paths. Use IDA or Ghidra to decompile and see whats inside.
But good practice is running some basic commands like *ltrace* and *strace*.
They shows the *system calls* that happens when running the binary.

![](/images/blog/rabctf-rev-5.png)

We can see  a string comparison happening. so the binary expects *leaderBangladesh* as input. And we can also see a fake flag which a lot of players submitted.

![](/images/blog/rabctf-rev-6.png)
And we get the flag.


# XOR Baby

**Description:** XOR is the bread and butter of cryptography and reverse engineering. Can you undo the XOR and find the flag?

![](/images/blog/rabctf-rev-8.png)

Running *ltrace*, *strace*, *strings* returns nothing. Lets open the *binary*

From *IDA

```c
__int64 __fastcall main(int a1, char **a2, char **a3)
{
  int i; // [rsp+8h] [rbp-28h]
  __int64 v5; // [rsp+10h] [rbp-20h]
  _QWORD v6[3]; // [rsp+18h] [rbp-18h]

  v6[2] = __readfsqword(0x28u);
  v5 = 0x200D4F07043D3E2DLL;
  v6[0] = 0x20060D4C09200C4ELL;
  *(_QWORD *)((char *)v6 + 6) = 0x21C4E0C1E1D2006LL;
  for ( i = 0; i < 22; ++i )
    *((_BYTE *)&v6[-1] + i) ^= 0x7Fu;
  printf("buffer check kor");
  return 0LL;
}
```

After cleaning up the code,

```c
#include <stdio.h>
#include <stdint.h>

int main(int argc, char **argv, char **envp)
{

    uint8_t encoded[22] = {
        0x4E, 0x0C, 0x20, 0x09, 0x4C, 0x0D, 0x06, 0x20,  // part of v6[0]
        0x06, 0x20, 0x1D, 0xE1, 0xC1, 0xE0, 0xC4, 0x21,  // from partial QWORD write
        0x2D, 0x3E, 0x3D, 0x04, 0x07, 0x4F, 0x0D, 0x20   // v5 and v6[2] high bits
    };

    for (int i = 0; i < 22; ++i) {
        encoded[i] ^= 0x7F;
    }
    printf("buffer check kor");
    return 0;
}
```


So basically some data is being **XOR**ed with key. And Since its little-endian
`

## `0x20060D4C09200C4E` → bytes `{0x4E, 0x0C, 0x20, 0x09, 0x4C, 0x0D, 0x06, 0x20}

so writing a solution 
```c
#include <stdint.h>
#include <stdio.h>

int main(void) {
  int encoded[] = {0x2d, 0x3e, 0x3d, 0x04, 0x07, 0x4f, 0x0d, 0x20,
                   0x4e, 0x0c, 0x20, 0x09, 0x4c, 0x0d, 0x06, 0x20,
                   0x1d, 0x1e, 0x0c, 0x4e, 0x1c, 0x02};

  for (int i = 0; i < sizeof(encoded); ++i) {
    encoded[i] ^= 0x7F;
  }

  for (int i = 0; i <= sizeof(encoded); i++) {
    putchar(encoded[i]);
  }
  putchar('\n');

  return 0;
}

```

![](/images/blog/rabctf-rev-9.png)

The main idea behind is *understanding* how the program works internally. Then work on it.
