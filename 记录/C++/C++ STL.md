# C++ STL
需要C++11特性支持！  

## rope
参考
[1](https://www.cnblogs.com/scx2015noip-as-php/p/rope.html)  [2](https://wenku.baidu.com/view/8a71420e76c66137ee061986.html)  [3](http://www.martinbroadhurst.com/stl/Rope.html)  [4](https://www.cnblogs.com/shenben/p/10327981.html)


[P4008 [NOI2003]文本编辑器](https://www.luogu.org/problem/P4008)
[1507: [NOI2003]Editor](https://www.lydsy.com/JudgeOnline/problem.php?id=1507)

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
## unordered_map

## set

## vector

## list
## bitset

> bitset用法  
> 类似数组，每个元素只占用1bit空间  
> 可以从整数和01字符串构造，不足前面补零，溢出整数截尾，字符串取前  
> 如果要使用动态长度bitset，请使用`vector<bool>` 同样占用1bit  

[Coding Problem](http://acm.hdu.edu.cn/showproblem.php?pid=6515)  
输入一个长度为3*n的字符串，把每一个字符转换为ASCII码的二进制后反转，  
再每6个二进制位转换成整数输出，每个整数后接一个空格  

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N=1e5+5;
typedef bitset<8> BS;
int i,len;
string s,ts,str;
int main(){
	cin>>str;
	for(auto c:str){
		ts=BS(int(c)).to_string();
		reverse(ts.begin(),ts.end());
		s+=ts;
	}
	// cout<<s<<endl;
	len=s.length();
	for(i=0;i<len;i+=6)
		cout<<BS(s,i,6).to_ulong()<<" ";
	return 0;
}
```

# C++ Algorithm
## permutation
> STL中全排列函数的使用  

> `next_permutation(start,end,cmp)`  
> `prev_permutation(start,end,cmp)`  
> 需要包含头文件 `<algorithm>`   
> 序列的前后为字典序的前后  
> 当所求序列不存在时,返回false,否则为true  
> 注意先按升序排序  
> 复杂度 $O(n)$  

## shuffle
> `random_shuffle(start,end)`  
> 对序列进行随机重排 使用默认的随机数生成器 如`rand()`  
> 确保每种情况是等可能的  
> 复杂度 $O(n)$  


## lower_bound/upper_bound
在**排好序**的数组里二分查找，返回值为地址，若不存在返回end。
`lower_bound`：找第一个大于或等于x的数。
`upper_bound`：找第一个大于x的数。
数组中x的位置为`[lower_bound,upper_bound)`。