# pbds库
官方文档：[Policy-Based Data Structures](https://gcc.gnu.org/onlinedocs/libstdc++/ext/pb_ds/)

TODO

```cpp
#include <bits/stdc++.h>
#include <bits/extc++.h>
using namespace std;
using namespace __gnu_pbds;

typedef long long ll;
tree<ll, null_type, less<ll>, splay_tree_tag, 
    tree_order_statistics_node_update> st;

int main() {
    int m;
    cin >> m;
    for (int i = 0; i < m; i++) {
        ll x, y;
        cin >> x >> y;
        if (x == 1) st.insert((y<<20) + i);
    }
    return 0;
}
```