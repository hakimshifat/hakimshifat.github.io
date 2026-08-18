---
title: "Pwnable 1 - File Descriptor"
description: "\"Introduction to Linux file descriptor\""
pubDate: "2026-05-01"
tags: ["ctf", "pwn", "linux"]
type: writeup
featured: true
heroImage: "/images/blog/pwnable-1-file-descriptor/Pasted%20image%2020260501122824.png"
---
![[public/images/blog/pwnable-1-file-descriptor/Pasted image 20260501122824.png]]


After SSHing into the server:

> [!TIP]
> The key idea is to make `fd` equal to `0`, which points `read()` at standard input. Since the program subtracts `0x1234`, the required argument is `0x1234` in decimal: `4660`.

![[public/images/blog/pwnable-1-file-descriptor/Pasted image 20260501122948.png]]


![[public/images/blog/pwnable-1-file-descriptor/Pasted image 20260501123005.png]]

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char buf[32];
int main(int argc, char* argv[], char* envp[]){
        if(argc<2){
                printf("pass argv[1] a number\n");
                return 0;
        }
        int fd = atoi( argv[1] ) - 0x1234;
        int len = 0;
        len = read(fd, buf, 32);
        if(!strcmp("LETMEWIN\n", buf)){
                printf("good job :)\n");
                setregid(getegid(), getegid());
                system("/bin/cat flag");
                exit(0);
        }
        printf("learn about Linux file IO\n");
        return 0;

}
```


Let us analyze it. The first check is **argc**, the **argument count**, which must be at least `2`. That means we must provide one argument when running the `fd` binary. Next 
```C
 int fd = atoi( argv[1] ) - 0x1234;
```

So *fd* is initialized with *the first argument* - *0x1234*
But what does `atoi()` do?
![[public/images/blog/pwnable-1-file-descriptor/Pasted image 20260501123343.png]]

Now that is clear, let us move on to the next step.
```C
        int len = 0;
        len = read(fd, buf, 32);
```

A variable *len* is initialized. Then **read** function is used to read input to buffer of exactly 32 bytes. But what is `fd` doing here? Let us look at the manual page for `read()`.
![[public/images/blog/pwnable-1-file-descriptor/Pasted image 20260501123538.png]]

So basically fd says from which **File Descriptor** should the read function take input from

fd = 0 means **Standard Input**
fd = 1 means **Standard Output**
fd = 2 means **Standard Error**

Next, 

```C
        if(!strcmp("LETMEWIN\n", buf)){
                printf("good job :)\n");
                setregid(getegid(), getegid());
                system("/bin/cat flag");
                exit(0);
        }
```

Then `strcmp()` compares the input stored in `buf` with `LETMEWIN\n`. If we want to provide that input through standard input, we must set `fd = 0`.
For that, 
![[public/images/blog/pwnable-1-file-descriptor/Pasted image 20260501123952.png]]

0x1234 is hex form, converting it to decimal gives 4660.
![[public/images/blog/pwnable-1-file-descriptor/Pasted image 20260501124048.png]]
And that gives the flag.