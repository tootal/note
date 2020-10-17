# STL之map

> STL map 可以当作hash表使用    
> map采用红黑树实现，红黑树是平衡二叉树的一种    
> 插入、查询、删除 复杂度 均为 O(lgn)    
> 注意：    
> 	map中的值默认按升序排列    
>  	map的迭代器解引用的结果是得到一个 pair类型的对象。    
> 	pair有两个成员 first, second。first保存 key的值，second   保存value的值。  
>  	[k] 返回 map 中 Key 为 k的元素的value的引用 若key不存在   返回0  
>  	find	查找key 返回迭代器 k不存在则返回end    
>  	count	统计key	对于map其值为0或1    
>  	erase	删除key	返回删除个数    
>  	equal_range	以pair形式返回 (lower_bound,upper_bound)    



> STL unordered_map (C++11)  
> 以哈希表为底层的关联式容器 （开链法）  
> 在内部，unordered_map中的元素没有按照它们的键值或映射值的任何顺序排序  
> 而是根据它们的散列值组织成桶以允许通过它们的键值直接快速访问单个元素  
> 复杂度 O(1)	(最坏为线性，不过几乎不可能出现)  
> 注意：  
> 	使用基本和map相同  
>  	unordered_map的erase操作会缩容，导致元素重新映射，降低性能。  
> 	空间占用更多  
