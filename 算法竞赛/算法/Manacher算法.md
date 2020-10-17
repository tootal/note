# Manacher算法
参考链接：

* [Manacher 算法 - Segmentfault](https://segmentfault.com/a/1190000008484167)
* [Manacher - OI-Wiki](https://oi-wiki.org/string/manacher/)
* [有什么浅显易懂的Manacher Algorithm讲解？ - C加加编程思想的回答 - 知乎](https://www.zhihu.com/question/37289584/answer/370848679)


Manacher算法可以在$O(n)$的时间复杂度内求出以第i个字符为中心的最长回文子串的长度。

模板（来自kuangbin）

```cpp
int manacher(string &s) {
    int n = s.length(), m = n * 2 + 2;
    string t(m, '#');
    for (int i = 0; i < n; i++)
        t[i * 2 + 2] = s[i];
    t[0] = '$';
    vector<int> p(m);
    int mx = 0, id = 0;
    for (int i = 0; i < m; i++) {
        p[i] = mx > i ? min(p[2 * id - i], mx - i) : 1;
        while (t[i + p[i]] == t[i - p[i]]) p[i]++;
        if (i + p[i] > mx) mx = i + p[i], id = i;
    }
    return *max_element(p.begin(), p.end()) - 1;
}
```

测试题目：[P3805 【模板】manacher算法](https://www.luogu.com.cn/problem/P3805)

添加冗余字符的方法，在每个字符后添加一个`#`，最后在前面添加`$#`，总长度变为2n+2，n为原始字符串长度。
p[i]表示以i为中心的最长回文子串的半径（包括自身）。

例如：`abba`变成`$#a#b#b#a#`，最后p数组的值为`[1, 1, 2, 1, 2, 5, 2, 1, 2, 1]`，最长回文串的长度是p中最大值减一。