# STL之set
参考：

* [cppreference](https://en.cppreference.com/w/cpp/container/set)
* [STL map 和 set的实现](https://blog.csdn.net/heyutao007/article/details/6798802)

set是一个关联容器，可以包含一些互不相同且有序的数据（自动去重、排序），插入、删除、搜索均为log复杂度，通常实现为红黑树。
要求类型可以使用小于号比较。

