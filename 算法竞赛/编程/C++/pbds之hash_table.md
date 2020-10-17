# pbds之hash_table

用法与[map](STL之map.md)几乎一样  
速度与`unordered_map`相当 （可能更快）  
需要头文件 (若支持可以用 `bits/extc++.h` )  
`#include<ext/pb_ds/assoc_container.hpp>`  
`#include<ext/pb_ds/hash_policy.hpp>`  
**命名空间**  
`using namespace __gnu_pbds;`  
**声明方式**  
`cc_hash_table<string,double> mp1;`  
`gp_hash_table<string,double> mp2;`  

cc 是拉链法 （建议使用）  
gp 是查探法 空间占用更大 同时也许会更快  
