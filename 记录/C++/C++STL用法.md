# C++STL用法
注意：若示例代码不完整，则默认包含在以下代码块中。同一小节中的代码片段前后具有关联性。  
```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){
	// code here
	return 0;
}
```
## 概览
* set、multiset、map、multimap内部均采用红黑树实现，但也有采用哈希表实现的（加`unordered_`前缀）。

## 线性表
### vector
### queue
### list
### stack
### priority_queue

## set/map系列
### set
### map
### multiset
### multimap
multimap可以插入相同key的pair，默认按key升序排列，key相同的按插入顺序排列。  
注意multimap没有重载`[]`运算符。  
插入及遍历元素：    
```cpp
multimap<int,int> f;
f.insert(make_pair(1,3));
f.insert(make_pair(2,3));
f.insert(make_pair(1,2));
for(auto i:f){
	printf("%d->%d\n",i.first,i.second);
}
```
输出：  
```
1->3
1->2
2->3
```
查找统计key为1的元素：  
```cpp
auto p1=f.find(1);
int c1=f.count(1);
for(int i=0;i<c1;i++){
	printf("1->%d\n",p1->second);
	p1++;
}
```
### unordered_set
### unordered_map
### unordered_multiset
### unordered_multimap
