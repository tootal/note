# Dijkstra算法
例题：[20C - 6](https://codeforces.com/contest/20/submission/67265021)

Dijkstra算法是单源最短路径算法，适用于无负边权的情况，堆优化下复杂度为$O(V^2+E)$。

部分代码来自[Codeforces@Emilan](https://codeforces.com/contest/20/submission/94618451)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false), cin.tie(0);
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, int>>> G(n);
    while (m--) {
        int u, v, w;
        cin >> u >> v >> w;
        u--, v--;
        G[u].emplace_back(v, w);
        G[v].emplace_back(u, w);
    }
    vector<long long> dis(n, 1ll<<60);
    vector<int> pre(n, -1);
    priority_queue<pair<long long, int>> Q;
    dis[0] = 0;
    Q.emplace(0, 0);
    while (!Q.empty()) {
        int u = Q.top().second;
        long long d = -Q.top().first;
        Q.pop();
        if (u == n - 1) break;
        if (d != dis[u]) continue;
        for (auto &e : G[u]) {
            int v = e.first, w = e.second;
            if (d + w < dis[v]) {
                dis[v] = d + w;
                pre[v] = u;
                Q.emplace(-(d + w), v);
            }
        }
    }
    if (~pre.back()) {
        vector<int> path{n - 1};
        for (int u = n - 1; u; u = pre[u]) {
            path.push_back(pre[u]);
        }
        for (int i = path.size() - 1; i >= 0; i--) {
            cout << path[i] + 1 << ' ';
        }
    } else cout << -1;
    return 0;
}
```

主要思路、注意点：

* 优先队列默认是大顶堆，即从大到小，而dijkstra算法要求每次选出距离最小的点。以下解决办法都可以：

1. （目前采用方法）存入距离相反数。`Q.emplace(-(d + w), v);`，一定要注意的是取出来的时候也要记得取相反数。`long long d = -Q.top().first;`
2. 手动设置为小顶堆。

```cpp
using pli=pair<long long, int>;
priority_queue<pli, vector<pli>, greater<pli>> Q;
```

3. 使用结构体也是可以，就不列出代码了。主要就是记录距离和序号、重载比较函数。

* 从优先队列中取出的点，即为已经求出最短路径的点。如果已知终点，即可提前退出了。
`if (u == n - 1) break;`

* 同一个点可能被先后多次加入队列，只有最后一个加入的才保持`d == dis[u]`。
`if (d != dis[u]) continue;`

## 题目记录
[20201003牛客国庆集训派对day3.md](../比赛/20201003牛客国庆集训派对day3.md)，B题。