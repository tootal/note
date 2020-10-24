# 树形dp
[OI-Wiki](https://oi-wiki.org/dp/tree/)

## [P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 6e3 + 5;
struct Edge {
    int v, next;
} edge[N];
int n, cnt, r[N], head[N];
int f[N][2];
bool is_root[N];
void add_edge(int u, int v) {
    edge[cnt].v = v;
    edge[cnt].next = head[u];
    head[u] = cnt;
    cnt++;
}
void dfs(int u) {
    for (int i = head[u]; i != -1; i = edge[i].next) {
        int v = edge[i].v;
        dfs(v);
        f[u][0] += max(f[v][0], f[v][1]);
        f[u][1] += f[v][0];
    }
    f[u][1] += r[u];
}
int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        head[i] = -1;
        is_root[i] = true;
        scanf("%d", &r[i]);
    }
    for (int i = 1; i < n; i++) {
        int l, k;
        scanf("%d%d", &l, &k);
        add_edge(k, l);
        is_root[l] = false;
    }
    int root;
    for (int i = 1; i <= n; i++) {
        if (is_root[i]) {
            root = i;
            dfs(i);
        }
    }
    printf("%d\n", max(f[root][0], f[root][1]));
    return 0;
}
```