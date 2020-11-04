# KMP算法
KMP变化非常多，就不总结特定的模板了，用例子来解释比较好。

## [HDU1711-Number Sequence](http://acm.hdu.edu.cn/showproblem.php?pid=1711)
题意就是子串查找。

Next[i]的含义是前i个字符的最大前后缀匹配长度。

例如abcab的Next为2。

第一个字符的Next为特殊值0或-1



需要对模板进行简单修改。  

```cpp
#include <cstdio>
#include <cstring>
int pre(int *T,int n,int *P,int m,int *f){
    f[0]=0;
    int i=(T==P),j=0;
    for(;i<n;i++){
        while(j&&T[i]!=P[j])j=f[j-1];
        if(T[i]==P[j]){
            j++;
            if(T==P)f[i]=j;
        }else if(T==P)f[i]=0;
        if(T!=P&&j==m){
            return i-m+2;
        }
    }
    return -1;
}
const int N=1e6+5;
int a[N],b[N],f[N];
int main(){
    int T;
    scanf("%d",&T);
    while(T--){
        int n,m;
        scanf("%d%d",&n,&m);
        for(int i=0;i<n;i++){
            scanf("%d",&a[i]);
        }
        for(int i=0;i<m;i++){
            scanf("%d",&b[i]);
        }
        pre(b,m,b,m,f);
        printf("%d\n",pre(a,n,b,m,f));
    }
    return 0;
}
```
### [HDU2087-剪花布条](http://acm.hdu.edu.cn/showproblem.php?pid=2087)
统计模式串在文本串中出现了多少次（不可重叠）。  

```cpp
#include <bits/stdc++.h>
using namespace std;
int pre(char *T,int n,char *P,int m,int *f){
    f[0]=0;
    int ans=0,i=(T==P),j=0;
    for(;i<n;i++){
        while(j&&T[i]!=P[j])j=f[j-1];
        if(T[i]==P[j]){
            j++;
            if(T==P)f[i]=j;
        }else if(T==P)f[i]=0;
        if(j==m)ans++,j=0;//pos=i-m+1
    }
    return ans;
}
const int N=1005;
char a[N],b[N];
int f[N];
int main(){
    for(;;){
        scanf(" %s",a);
        if(a[0]=='#')break;
        scanf(" %s",b);
        int n=strlen(a),m=strlen(b);
        pre(b,m,b,m,f);
        printf("%d\n",pre(a,n,b,m,f));
    }
    return 0;
}
```

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N=1005;
char a[N],b[N];
int f[N];
int main(){
    for(;;){
        scanf(" %s",a);
        if(a[0]=='#')break;
        scanf(" %s",b);
        int n=strlen(a),m=strlen(b);
        f[0]=0;
        for(int i=1;i<m;i++){
            int j=f[i-1];
            while(j&&b[i]!=b[j])j=f[j-1];
            if(b[i]==b[j])f[i]=j+1;
            else f[i]=0;
        }
        int ans=0;
        for(int i=0,j=0;i<n;i++){
            while(j&&a[i]!=b[j])j=f[j-1];
            if(a[i]==b[j])j++;
            if(j==m){
                ans++;
                j=0;
            }
        }
        printf("%d\n",ans);
    }
    return 0;
}
```

### [HDU1686-Oulipo](http://acm.hdu.edu.cn/showproblem.php?pid=1686)
统计模式串在文本串中出现了多少次（可重叠）。   
只要把模板中匹配成功的`j=0`改成`j=f[j-1]`即可。  

```cpp
#include <bits/stdc++.h>
using namespace std;
int pre(char *T,int n,char *P,int m,int *f){
    f[0]=0;
    int ans=0,i=(T==P),j=0;
    for(;i<n;i++){
        while(j&&T[i]!=P[j])j=f[j-1];
        if(T[i]==P[j]){
            j++;
            if(T==P)f[i]=j;
        }else if(T==P)f[i]=0;
        if(j==m)ans++,j=f[j-1];//pos=i-m+1
    }
    return ans;
}
const int N=1e6+5;
char a[N],b[N];
int f[N];
int main(){
    int T;
    scanf("%d",&T);
    while(T--){
        scanf(" %s",a);
        scanf(" %s",b);
        int n=strlen(a),m=strlen(b);
        pre(a,n,a,n,f);
        printf("%d\n",pre(b,m,a,n,f));
    }
    return 0;
}
```
### [POJ2752-Seek the Name, Seek the Fame](http://poj.org/problem?id=2752)
即从小到大输出**前后缀相同子串**长度的可能值。  
利用next数组加速。  

```cpp
#include <cstdio>
#include <cstring>
using namespace std;
int pre(char *T,int n,char *P,int m,int *f){
    f[0]=0;
    int ans=0,i=(T==P),j=0;
    for(;i<n;i++){
        while(j&&T[i]!=P[j])j=f[j-1];
        if(T[i]==P[j]){
            j++;
            if(T==P)f[i]=j;
        }else if(T==P)f[i]=0;
        if(j==m)ans++,j=0;//pos=i-m+1
    }
    return ans;
}
const int N=4e5+5;
char s[N];
int f[N],a[N],ta=0;
int main(){
    while(~scanf(" %s",s)){
        int n=strlen(s);
        pre(s,n,s,n,f);
        ta=0;
        a[ta++]=n;
        int j=f[n-1];
        while(j){
            a[ta++]=j;
            j=f[j-1];
        }
        for(int i=ta-1;i>=0;i--){
            printf("%d%c",a[i]," \n"[i==0]);
        }
    }
    return 0;
}
```

```cpp
#include <cstdio>
#include <cstring>
const int N=4e5+5;
char s[N];
int f[N],ans[N];
int main(){
    while(~scanf(" %s",s)){
        int n=strlen(s);
        f[0]=0;
        for(int i=1;i<n;i++){
            int j=f[i-1];
            while(j&&s[i]!=s[j])j=f[j-1];
            if(s[i]==s[j])f[i]=j+1;
            else f[i]=0;
        }
        int j=f[n-1],ta=0;
        ans[ta++]=n;
        while(j){
            ans[ta++]=j;
            j=f[j-1];
        }
        for(int i=ta-1;i>=0;i--){
            printf("%d%c",ans[i]," \n"[i==0]);
        }
    }
    return 0;
}
```

### [POJ2406-Power Strings](http://poj.org/problem?id=2406)
用到了$next$数组的一个[性质](https://www.cnblogs.com/wuwangchuxin0924/p/5977503.html)，可以用来判断最小循环节。  

```cpp
#include <cstdio>
#include <cstring>
int pre(char *T,int n,char *P,int m,int *f){
    f[0]=0;
    int ans=0,i=(T==P),j=0;
    for(;i<n;i++){
        while(j&&T[i]!=P[j])j=f[j-1];
        if(T[i]==P[j]){
            j++;
            if(T==P)f[i]=j;
        }else if(T==P)f[i]=0;
        if(j==m)ans++,j=0;//pos=i-m+1
    }
    return ans;
}
const int N=1e6+5;
char s[N];
int f[N];
int main(){
    while(true){
        scanf(" %s",s);
        if(s[0]=='.')break;
        int n=strlen(s);
        pre(s,n,s,n,f);
        if(n%(n-f[n-1]))puts("1");
        else printf("%d\n",n/(n-f[n-1]));
    }
    return 0;
}
```

```cpp
#include <cstdio>
#include <cstring>
const int N=1e6+5;
char s[N];
int f[N];
int main(){
    while(true){
        scanf(" %s",s);
        if(s[0]=='.')break;
        int n=strlen(s);
        f[0]=0;
        for(int i=1;i<n;i++){
            int j=f[i-1];
            while(j&&s[i]!=s[j])j=f[j-1];
            if(s[i]==s[j])f[i]=j+1;
            else f[i]=0;
        }
        if(n%(n-f[n-1]))puts("1");
        else printf("%d\n",n/(n-f[n-1]));
    }
    return 0;
}
```
