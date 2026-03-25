---
title: "Nice - The Priority Scheduling Modification"
description: "Understanding Linux nice values and priority scheduling for process management."
pubDate: "2026-01-15"
tags: ["linux", "process-management", "scheduling"]
heroImage: "/media/linux1.png"
---

From documentation:

## nice - run a program with modified scheduling priority

The flags:

```sh
-n, --adjustment=N
```

The command goes like:

```sh
nice -n 19 dms run --session 
```

This starts my DMS shell in least priority. It just means Linux will give any process higher priority. In consequence maybe it will update less since it's my bar.

### Values of n: 

-20 (most favorable to the process) to 19 (least favorable to the process).
