# Manacher算法
每次遇到回文串的只能抄模板，这次一定要学会！！！

## 问题

问题：求出字符串中以每个字符为中心的最大回文串长度。
例如：`aaba`对应的结果如下表：

|  a  |  a  |  b  |  a  |
| --- | --- | --- | --- |
| 1   | 1   | 3   | 1   |

首先考虑一些简单的问题。回文串判断。

```cpp
bool is_palindrome(const string &s) {
    int n = (int)s.length();
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - i - 1]) return false;
    }
    return true;
}
```

以x为中心向两侧延申的最大回文串。

```cpp
int max_palindrome(const string &s, int x) {
    int n = (int)s.length();
    int r = min(x, n - x - 1);
    for (int i = 1; i <= r; i++) {
        if (s[x - i] != s[x + i]) return i - 1;
    }
    return r;
}
```

返回最大半径。
半径定义：中心点x半径为r的子串范围为`[x-r, x+r]`。
例如`aba`的半径为1.

这样可以写出一个`O(n^2)`的算法来。

## O(n^2)暴力

测试题目：[5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)


```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int max_palindrome(const string &s, int x) {
        int n = (int)s.length();
        int r = min(x, n - x - 1);
        for (int i = 1; i <= r; i++) {
            if (s[x - i] != s[x + i]) return i - 1;
        }
        return r;
    }
    string wrap(string s) {
        string x(1, '#');
        for (auto c : s) {
            x.append(1, c);
            x.append(1, '#');
        }
        return x;
    }
    string unwrap(string s) {
        string x;
        for (auto c : s) {
            if (c != '#') x.append(1, c);
        }
        return x;
    }
    string longestPalindrome(string s) {
        s = wrap(s);
        int n = (int)s.length();
        int maxi = 0, maxn = 0;
        for (int i = 0; i < n; i++) {
            int ans = max_palindrome(s, i);
            // cout << "i = " << i << ", ans = " << ans << '\n';
            if (ans > maxn) {
                maxn = ans;
                maxi = i;
            }
        }
        auto ret = s.substr(maxi - maxn, 2 * maxn + 1);
        return unwrap(ret);
    }
};

int main() {
    cout << Solution().longestPalindrome("cbbd") << '\n';
    return 0;
}
```

## 算法分析

首先对字符串进行填充，解决奇偶数的问题。

`baba`变成`#b#a#b#a#`，这样统一变成奇数来处理。

`f[i]`表示以i为中心的最大回文半径。

maxr记录i+f[i]最大的i值。

假设当前正在计算的下标为i，则maxr必定在i左边。

i关于maxr的对称点为2×maxr-i，这个对称点的f值是已经计算出来的了。

若i小于maxr+f[maxr]，根据对称性可以得到f[i]**至少**为min(f[2maxr-i], maxr+f[maxr]-i)


OK，代码写好了，复杂度应该是O(n)级别的。

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string wrap(string s) {
        string x(1, '#');
        for (auto c : s) {
            x.append(1, c);
            x.append(1, '#');
        }
        return x;
    }
    string unwrap(string s) {
        string x;
        for (auto c : s) {
            if (c != '#') x.append(1, c);
        }
        return x;
    }
    string longestPalindrome(string s) {
        s = wrap(s);
        int n = (int)s.length();
        vector<int> f(n);
        int maxi = 0, maxn = 0;
        int maxr = 0;
        for (int i = 1; i < n; i++) {
            if (i <= maxr + f[maxr]) {
                f[i] = min(f[2 * maxr - i], maxr + f[maxr] - i);
            }
            int r = min(i, n - i - 1);
            while (f[i] < r && s[i - f[i] - 1] == s[i + f[i] + 1]) f[i]++;
            if (i + f[i] > maxr + f[maxr]) maxr = i;
            if (f[i] > maxn) {
                maxn = f[i];
                maxi = i;
            }
        }
        auto ret = s.substr(maxi - maxn, 2 * maxn + 1);
        return unwrap(ret);
    }
};

int main() {
    cout << Solution().longestPalindrome("cbbd") << '\n';
    return 0;
}
```

