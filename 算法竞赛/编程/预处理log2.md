# 预处理log2

> log2(x)是浮点数,一般情况下要用到的是(int)log2(x)
> 因为是int,所以只看x的二进制的最高位1
> x&(x-1)==0的时候说明x是2的整数次幂
> 那么x-1不是2的整数次幂,两者最高位相差一位,因此lg2[x]=lg2[x-1]+1



```cpp
int n;
cin >> n;
vector<int> lg2(n);
for (int i = 2; i < n; i++) {
    lg2[i] = lg2[i-1] + ((i&(i-1)) == 0);
    cout << "log2(" << i << ")=" << lg2[i] << '\n';
}
```