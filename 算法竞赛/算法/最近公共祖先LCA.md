# 最近公共祖先LCA
## 相关博客
[题解 P3379 【【模板】最近公共祖先（LCA）】](https://www.luogu.org/blog/morslin/solution-p3379)  
[Tarjan(离线)算法的基本思路及其算法实现](https://www.cnblogs.com/JVxie/p/4854719.html)  
[题解 P3379 【【模板】最近公共祖先（LCA）】](https://www.luogu.org/blog/Otto-Apocalypse/solution-p3379)  

## 倍增法
[【模板】最近公共祖先（LCA）](https://www.luogu.org/problem/P3379)  
容易写挂，注意要把$f[i][j]$的处理放在$dfs$里面，否则容易超时！

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N=5e5+5;
int n,m,s,d[N],lg[N],f[N][20];
vector<int> G[N];
bool vis[N];
void dfs(int x){
	for(auto i:G[x]){
		if(!vis[i]){
			vis[i]=true;
			d[i]=d[x]+1;
			f[i][0]=x;
			for(int j=1;(1<<j)<=d[i]-1;j++){
				f[i][j]=f[f[i][j-1]][j-1];
			}
			// printf("d[%d]=%d\n",i,d[i]);
			dfs(i);
		}
	}
}
int query(int x,int y){
	if(d[x]<d[y])swap(x,y);
	for(int i=lg[d[x]-d[y]];i>=0;i--){
		// printf("d[%d]=%d\n",f[x][i],d[f[x][i]]);
		if(d[f[x][i]]>=d[y]){
			x=f[x][i];
		}
	}
	if(x==y)return x;
	for(int i=lg[d[x]-1];i>=0;i--){
		if(f[x][i]!=f[y][i]){
			x=f[x][i];
			y=f[y][i];
		}
	}
	return f[x][0];
}
int main(){
	scanf("%d%d%d",&n,&m,&s);
	for(int i=1;i<n;i++){
		int u,v;
		scanf("%d%d",&u,&v);
		G[u].push_back(v);
		G[v].push_back(u);
	}
	d[s]=1;
	vis[s]=true;
	dfs(s);
	for(int i=2;i<=n;i++){
		lg[i]=lg[i-1]+(2<<lg[i-1]==i);
	}
	for(int i=1;i<=m;i++){
		int u,v;
		scanf("%d%d",&u,&v);
		printf("%d\n",query(u,v));
	}
	return 0;
}

```



