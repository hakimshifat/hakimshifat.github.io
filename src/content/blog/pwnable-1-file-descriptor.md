---
title: "Pwnable 1 - File Descriptor"
description: "\"Introduction to Linux file descriptor\""
pubDate: "2026-05-01"
tags: ["ctf", "pwn", "linux"]
type: writeup
featured: true
---
![](/images/blog/pwnable-1-file-descriptor/Pasted%20image%2020260501122824.png)


After *ssh*ing into ther server

![](/images/blog/pwnable-1-file-descriptor/Pasted%20image%2020260501122948.png)


![](/images/blog/pwnable-1-file-descriptor/Pasted%20image%2020260501123005.png)

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


Let us analyze it, First check is **argc**, that is **argument count**, which must be greater than 2.
That means while running the *fd* binary, we must provide an argument with it.
Next 
```C
 int fd = atoi( argv[1] ) - 0x1234;
```

So *fd* is initialized with *the first argument* - *0x1234*
But what does *atoi* does.
![](/images/blog/pwnable-1-file-descriptor/Pasted%20image%2020260501123343.png)

Now, that clear and out of the way.
Next
```C
        int len = 0;
        len = read(fd, buf, 32);
```

A variable *len* is initialized. Then **read** function is used to read input to buffer of exactly 32 bytes. But whats *fd* doing here ? Lets look at the manual page of *read*
![](/images/blog/pwnable-1-file-descriptor/Pasted%20image%2020260501123538.png)

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

Then *strcmp* compares the input stored at buf with "LETMEWIN\n", So if we want to give input by standard input, we must set fd = 0,
For that, 
![](/images/blog/pwnable-1-file-descriptor/Pasted%20image%2020260501123952.png)

0x1234 is hex form, converting it to decimal gives 4660.
![](/images/blog/pwnable-1-file-descriptor/Pasted%20image%2020260501124048.png)
And that gives the flag.