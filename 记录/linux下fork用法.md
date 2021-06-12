# linux下fork用法

```c
#include <stdio.h>
#include <unistd.h>
int main() {
    pid_t st = fork();
    if (st < 0) {
        fprintf(stderr, "create process error!");
    } else if (st== 0) { // 子进程
        for (int i = 0; i < 10; i++) {
            puts("hello, child!");
            sleep(1);
        }
    } else { // 父进程
        for (int i = 0; i < 10; i++) {
            puts("hello, parent!");
            sleep(1);
        }
    }
}
```
运行结果：

```c
tootal@DESKTOP-TOOTAL:~/os$ cd "/home/tootal/os/" && gcc p21.c -o p21 && "/home/tootal/os/"p21hello, parent!
hello, child!
hello, child!
hello, parent!
hello, child!
hello, parent!
hello, parent!
hello, child!
hello, child!
hello, parent!
hello, child!
hello, parent!
hello, parent!
hello, child!
hello, child!
hello, parent!
hello, child!
hello, parent!
hello, child!
hello, parent!
```

## 循环创建进程

```c
#include <stdio.h>
#include <unistd.h>
int main() {
    int n;
    scanf("%d", &n);
    int i;
    for (i = 1; i <= n; i++) {
        pid_t status = fork();
        if (status == -1) {
            puts("create process error!");
            break;
        }
        printf("i = %d, status = %d\n", i, status);
    }
    return 0;
}
```

参考输出：

```
3
i = 1, status = 470
i = 1, status = 0
i = 2, status = 471
i = 2, status = 472
i = 2, status = 0
i = 3, status = 473
i = 2, status = 0
i = 3, status = 474
i = 3, status = 0
i = 3, status = 475
i = 3, status = 0
i = 3, status = 0
i = 3, status = 476
i = 3, status = 0
```


## 创建n个进程

```c
#include <stdio.h>
#include <unistd.h>
int main() {
    int n;
    scanf("%d", &n);
    int i;
    for (i = 1; i <= n; i++) {
        pid_t status = fork();
        if (status == -1) {
            puts("create process error!");
            break;
        }
        if (status == 0) break;
        printf("i = %d, status = %d\n", i, status);
    }
    return 0;
}
```

参考输出：

```
3
i = 1, status = 485
i = 2, status = 486
i = 3, status = 487
```

子进程跳出循环。



