# 扩展STL之rope
参考
[1](https://www.cnblogs.com/scx2015noip-as-php/p/rope.html)  [2](https://wenku.baidu.com/view/8a71420e76c66137ee061986.html)  [3](http://www.martinbroadhurst.com/stl/Rope.html)  [4](https://www.cnblogs.com/shenben/p/10327981.html)


[P4008 【NOI2003】文本编辑器](https://www.luogu.org/problem/P4008)
[1507: 【NOI2003】Editor](https://www.lydsy.com/JudgeOnline/problem.php?id=1507)

一些比较坑的地方，注意数组要开大。  
BZOJ和洛谷的数据有区别，洛谷的数据在windows下生成，换行有`\n\r`。  
注意添加字符串结束标志`\0`。  


```cpp
#include <bits/stdc++.h>
#include <bits/extc++.h>
using namespace std;
using namespace __gnu_cxx;
rope<char> r;
char s[3*1024*1024];
int main(){
    int T,p=0;
    scanf(" %d",&T);
    while(T--){
        char op[9];
        scanf(" %s",op);
        if(op[0]=='M'){
            scanf(" %d",&p);
        }else if(op[0]=='I'){
            int n;
            scanf(" %d",&n);
            for(int i=0;i<n;i++){
                s[i]=getchar();
                while(s[i]=='\n'||s[i]=='\r')s[i]=getchar();
            }
            s[n]=0;
            r.insert(p,s);
        }else if(op[0]=='D'){
            int n;
            scanf(" %d",&n);
            r.erase(p,n);
        }else if(op[0]=='G'){
            int n;
            scanf(" %d",&n);
            r.copy(p,n,s);
            s[n]=0;
            puts(s);
        }else if(op[0]=='P'){
            p--;
        }else if(op[0]=='N'){
            p++;
        }else{
            //Invalid
        }
    }
    return 0;
}
```
加强版：[P4567 [AHOI2006]文本编辑器](https://www.luogu.org/problem/P4567)