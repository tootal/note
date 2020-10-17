# 字典树Trie
## 参考博客
[Trie（前缀树/字典树）及其应用](https://www.cnblogs.com/justinh/p/7716421.html)  
[小白详解 Trie 树](https://segmentfault.com/a/1190000008877595)  
[字典树（Trie树）模板以及简单的入门题总结](https://blog.csdn.net/qq_38891827/article/details/80532462)  


[#1014 : Trie树](https://hihocoder.com/problemset/problem/1014)  
吐槽一下，题目里明明写的是$10^5$，结果我数组开$10^5$就$Runtime\ Error$，要开$10^6$才能过。  

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N=1e6+5;
const int M=26;
int ch[N][M],v[N],sz;
void insert(char *s){
    int p=0,n=strlen(s);
    for(int i=0;i<n;i++){
        int c=s[i]-'a';
        if(!ch[p][c]){
            v[sz]=0;
            ch[p][c]=sz++;
        }
        p=ch[p][c];
        v[p]++;
    }
}
int query(char *s){
    int p=0,n=strlen(s);
    for(int i=0;i<n;i++){
        int c=s[i]-'a';
        if(!ch[p][c])return 0;
        p=ch[p][c];
    }
    return v[p];
}
int main(){
    sz=1;
    int n,m;
    char s[12];
    scanf("%d",&n);
    for(int i=0;i<n;i++){
        scanf(" %s",s);
        insert(s);
    }
    scanf("%d",&m);
    for(int i=0;i<m;i++){
        scanf(" %s",s);
        printf("%d\n",query(s));
    }
    return 0;
}
```

[统计难题](http://acm.hdu.edu.cn/showproblem.php?pid=1251)  
