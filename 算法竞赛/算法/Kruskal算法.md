# Kruskal算法

用于求最小生成树。

基于贪心的思想得到的。首先我们把所有的边按照权值先从小到大排列，接着按照顺序选取每条边，如果这条边的两个端点不属于同一集合，那么就将它们合并，直到所有的点都属于同一个集合为止。

集合通过[并查集](并查集.md)维护。

## 模板

```cpp
struct dsu {
    vector<int> p;
    dsu(int n) {
        p.resize(n);
        iota(p.begin(), p.end(), 0);
    }
    int find(int x) {
        return (x == p[x] ? x : p[x] = find(x));
    }
    bool unite(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false;
        p[x] = y;
        return true;
    }
};

struct edge {
    int u, v, w;
};

int kruskal(vector<edge> &edges, int n) {
    sort(edges.begin(), edges.end(), [](edge a, edge b) {
        return a.w < b.w;
    });
    dsu d(n);
    int ans = 0;
    for (edge &e : edges) {
        if (d.unite(e.u, e.v)) ans += e.w;
    }
    return ans;
}

```

