# Tarjan算法

算法复杂度O(n+m)

## 强连通分量

::: alert-warning
强连通分量是**有向图**中的概念，无向图中求连通分量不需要Tarjan算法，直接dfs或者并查集即可。
:::

[OI-Wiki](https://oi-wiki.org/graph/scc/)
我们考虑 DFS 生成树与强连通分量之间的关系。

如果结点u是某个强连通分量在搜索树中遇到的第一个结点，那么这个强连通分量的其余结点肯定是在搜索树中以u为根的子树中。u被称为这个强连通分量的根。

在 Tarjan 算法中为每个结点u维护了以下几个变量：

如果只是统计连通块的个数，
dfn[u]表示dfs的时间顺序，通常dfn还充当vis的作用，判断这个结点是否访问过。
low[u]表示追溯值，记录以当前结点为根搜索时能访问的最小dfn值。（不通过父结点）

一个结点的子树内结点的 dfn 都大于该结点的 dfn。
从根开始的一条路径上的 dfn 严格递增，low 严格非降。

按照深度优先搜索算法搜索的次序对图中所有的结点进行搜索。在搜索过程中，对于结点u和与其相邻的结点v（v 不是 u 的父节点）考虑 3 种情况：

v未被访问：继续对v进行深度搜索。在回溯过程中，用low[v]更新low[u]  。因为存在从 u 到 v 的直接路径，所以 v 能够回溯到的已经在栈中的结点，  u也一定能够回溯到。
 v被访问过，已经在栈中：即已经被访问过，根据 low 值的定义（能够回溯到的最早的已经在栈中的结点），则用 dfn[v] 更新 low[u] 。
 v被访问过，已不在在栈中：说明 v 已搜索完毕，其所在连通分量已被处理，所以不用对其做操作。

上述算法写成C++代码如下所示（未测试）

```cpp
int cnt = 0;
vector<int> dfn(n), low(n);
stack<int> st;
vector<bool> inst(n);
function<void(int)> dfs = [&](int u) {
    dfn[u] = low[u] = ++cnt;
    st.push(u);
    inst[u] = true;
    for (auto v : G[u]) {
        if (!dfn[v]) {
            dfs(v);
            low[u] = min(low[u], low[v]);
        } else if (inst[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }
};
```

对于一个连通分量图，我们很容易想到，在该连通图中有且仅有一个dfn[u]=low[u]  。该结点一定是在深度遍历的过程中，该连通分量中第一个被访问过的结点，因为它的 DFN 值和 LOW 值最小，不会被该连通分量中的其他结点所影响。

因此，在回溯的过程中，判定 dfn[u]=low[u] 的条件是否成立，如果成立，则栈中从 u 后面的结点构成一个 SCC。

使用变量scc记录连通分量个数，每个结点的belong数组记录该结点属于哪个连通分量。

```cpp
int cnt = 0, scc = 0;
vector<int> dfn(n), low(n), belong(n);
stack<int> st;
vector<bool> inst(n);
function<void(int)> dfs = [&](int u) {
    dfn[u] = low[u] = ++cnt;
    st.push(u);
    inst[u] = true;
    for (auto v : G[u]) {
        if (!dfn[v]) {
            dfs(v);
            low[u] = min(low[u], low[v]);
        } else if (inst[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }
    if (low[u] == dfn[u]) {
        int v;
        do {
            v = st.top();
            st.pop();
            inst[v] = false;
            belong[v] = scc;
        } while (v != u);
        scc++;
    }
};
```


## 割点
[参考](https://www.luogu.com.cn/blog/user15232/solution-p3388)
[参考](https://www.luogu.com.cn/blog/taoran/solution-p3388)
[参考](https://www.luogu.com.cn/blog/zty-qwq/solution-p3388)

::: alert-info
注意：求连通分量的Tarjan算法与求割点的Tarjan算法类似但**不完全相同**。
:::


> 对于一个无向图，如果把一个点删除后这个图的极大连通分量数增加了，那么这个点就是这个图的割点。

首先选定一个根节点，从该根节点开始遍历整个图（按之前方法使用DFS）。

对于根节点，判断是不是割点很简单——计算其子树数量，如果有2棵及以上的子树，就是割点。因为如果去掉这个点，这两棵子树就不能互相到达。

对于非根节点，判断是否是割点的根据是：对于某个顶点 u ，如果存在至少一个顶点  v（ u 的儿子），使得 low[v] >= dfn[u] ，即不能回到祖先，那么 u 点为割点。

[P3388 【模板】割点（割顶）](https://www.luogu.com.cn/problem/P3388)
[提交记录](https://www.luogu.com.cn/record/40539304)

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> G(n);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        u--, v--;
        G[u].push_back(v);
        G[v].push_back(u);
    }
    int cnt = 0;
    vector<int> dfn(n), low(n);
    vector<bool> cut(n);
    function<void(int, bool)> dfs = [&](int u, bool is_root) {
        // fprintf(stderr, "dfs(%d)\n", u+1);
        dfn[u] = low[u] = ++cnt;
        int children = 0;
        for (auto v : G[u]) {
            if (dfn[v]) {
                low[u] = min(low[u], dfn[v]);
            } else {
                dfs(v, false);
                low[u] = min(low[u], low[v]);
                if (dfn[u] <= low[v]) {
                    cut[u] = true;
                    children++;
                }
            }
        }
        if (is_root && children == 1) cut[u] = false;
    };
    for (int i = 0; i < n; i++) {
        if (!dfn[i]) {
            dfs(i, true);
        }
    }
    vector<int> ans;
    for (int i = 0; i < n; i++) {
        if (cut[i]) ans.push_back(i);
    }
    cout << ans.size() << '\n'; 
    for (auto a : ans) {
        cout << (a+1) << ' ';
    }
    cout << '\n';
    return 0;
}
```

注意这句`if (dfn[u] <= low[v])`，可能有多个子节点v多次更新u，标记u为割点，如果只是单纯求割点，那这个次数只在判断根结点是否为割点时有用，但如果要求删去每个割点后的连通分量数，这个次数就可以记录下来。表示新增的连通分量数目，注意根节点相比其他的割点会少一，因为根节点本身作为连通分量只有一个点。

## 桥
[OI-Wiki](https://oi-wiki.org/graph/cut/#_4)

> 对于一个无向图，如果删掉一条边后图中的连通分量数增加了，则称这条边为桥或者割边。

理解了上面的两种，求桥应该很简单了。对于一条边u->v，如果low[v]<=dfn[u]，说明v可以不通过u的情况下访问到u本身或其祖先结点，那么u->v显然就不是桥。反之low[v]>dfn[u]，说明u->v是桥。


[Caocao's Bridges](http://acm.hdu.edu.cn/showproblem.php?pid=4738)
差不多是求桥的最小边权，但有一些实际意义，因此多了一些坑点。

* 注意**重边**处理。
* 最小边权为0时，输出1
* 如果原本图不连通，就不需要派人。

通过写桥的代码发现了之前的好多问题，比如父节点不能更新子节点的low值！！

等会把上面的改一改再交一下，不要误导了后面的代码。

注意这里重边的处理，使用了一个特殊值INF，相当于不参与桥的计算（不会使得答案更优）
不能直接删去这些重边！！

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
bool solve() {
    int n, m;
    cin >> n >> m;
    if (n == 0 && m == 0) return false;
    vector<vector<pair<int, int>>> G(n);
    const int INF = 1e5;
    auto add_edge = [&](int u, int v, int w) {
        for (auto &e : G[u]) {
            if (e.first == v) {
                e.second = INF;
                return ;
            }
        }
        G[u].emplace_back(v, w);
    };
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        u--, v--;
        add_edge(u, v, w);
        add_edge(v, u, w);
    }
    int cnt = 0, ans = INF;
    vector<int> dfn(n), low(n);
    function<void(int, int)> dfs = [&](int u, int fa) {
        dfn[u] = low[u] = ++cnt;
        for (auto e : G[u]) {
            int v = e.first, w = e.second;
            if (!dfn[v]) {
                dfs(v, u);
                low[u] = min(low[u], low[v]);
                if (low[v] > dfn[u]) {
                    ans = min(ans, w);
                }
            } else if (v != fa) {
                low[u] = min(low[u], dfn[v]);
            }
        }
    };
    int scc = 0;
    for (int i = 0; i < n; i++) {
        if (!dfn[i]) {
            scc++;
            dfs(i, -1);
        }
    }
    int res = ans;
    if (scc > 1) res = 0;
    else if (ans == INF) res = -1;
    else if (ans == 0) res = 1;
    cout << res << '\n';
    return true;
}
int main() {
    while (solve()) ;
    return 0;
}
```