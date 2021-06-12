# C++vector-back错误写法记录
之前有一题一直RE，今天调试了一下终于发现了问题：

```cpp
bigint operator-(const bigint &x, const bigint &y) {
    if (x.sign) return -(-x + y);
    if (y.sign) return x + (-y);
    if (x < y) return -(y - x);
    bigint ans(x);
    for (int i = 0; i < y.size(); i++) {
        if (ans[i] < y[i]) ans[i + 1]--, ans[i] += bigint::BASE;
        ans[i] -= y[i];
    }
    while (ans.back() == 0) ans.pop_back();
    if (ans.empty()) ans = 0;
    return ans;
}
```

问题就出在`while (ans.back() == 0) ans.pop_back();`这一句。

要修改元素同时要访问元素的时候，一定要检查容器是否为空！！！

