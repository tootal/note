# STL之bitset

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
