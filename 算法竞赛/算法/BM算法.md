# BM算法
## 参考博客
[算法 - 齐次线性递推求解和优化及 BM 算法 ](https://zerol.me/2018/02/06/linearly-recurrent-sequence/)  
[Berlekamp–Massey algorithm](https://en.wikipedia.org/wiki/Berlekamp–Massey_algorithm)  
[HDU - 6172:Array Challenge (BM线性递推)](https://www.cnblogs.com/hua-dong/p/9886167.html)  
[BM算法求线性递推式模板](https://www.haoyuan.info/?p=300)  
[BM求线性递推模板（杜教版）](https://www.cnblogs.com/zhgyki/p/9671855.html)  
## 写在前面
注意不是所有矩阵快速幂的题都能用BM线性递推，反而基本上能用BM线性递推的式子都可用矩阵快速幂解，就是速度比较慢而已。类似[这种](https://ac.nowcoder.com/acm/contest/105/G)公式：$F(i)=F(i-1)+F(i-2)+i^3+i^2+i+1$不是线性递推式！无法用BM算法求解。  


在模意义下，可以把取模后的值放进初始值中递推。  
这意味甚至可以进行**分数的线性递推**。即可以把逆元代入。     
参考[这题](https://ac.nowcoder.com/acm/contest/882/B)。  

## 模板
### 计算公式
已知一列数是线性递推数列，已知前几项，求通项公式。(关联项要尽可能少）例如：  
输入：  
> 9  
> 1 2 3 4 5 6 7 8 9  

输出：
> 2 -1  

说明：
> 表示 $a_n=2a_{n-1}+a_{n-2}$  


代码（来自 Metowolf）  

```cpp
#include <bits/stdc++.h>
using namespace std;
const double eps=1e-7;
const int N=1e5+5;
vector<double> ps[N];
int fail[N];
double x[N],delta[N];
int n,pn;
int main(){
	while(~scanf("%d",&n)&&n){
		pn=0;
		for(int i=1;i<=n;i++)scanf("%lf",x+i);
		for(int i=1;i<=n;i++){
			double dt=-x[i];
			for(int j=0;j<ps[pn].size();j++)dt+=x[i-j-1]*ps[pn][j];
			delta[i]=dt;
			if(fabs(dt)<=eps)continue;
			fail[pn]=i;
			if(!pn){ps[++pn].resize(1);continue;}
			vector<double> &ls=ps[pn-1];
			double k=-dt/delta[fail[pn-1]];
			vector<double> cur;
			cur.resize(i-fail[pn-1]-1);
			cur.push_back(-k);
			for(int j=0;j<ls.size();j++)cur.push_back(ls[j]*k);
			if(cur.size()<ps[pn].size())cur.resize(ps[pn].size());
			for(int j=0;j<ps[pn].size();j++)cur[j]+=ps[pn][j];
			ps[++pn]=cur;
		}
		int len=(int)ps[pn].size();
		for(int i=0;i<len;i++)
			printf("%g%c",ps[pn][i]," \n"[i==len-1]);
	}
	return 0;
}
```

### 求第n项
已知一列数是线性递推数列，已知前几项，求第n项。(关联项要尽可能少）  
说明：  例如求斐波那契数列第n项，调用`gao(n-1,vint{1,1,2,3,5,8})`即可。  
复杂度 $O(k^2\lg n)$  其中$k$为关联项数。  

代码  （来自杜教）  
```cpp
#include<bits/stdc++.h>
using namespace std;
typedef vector<int> vint;
typedef long long ll;
const ll mod=1000000007;
const int N=10010;
ll n,res[N],base[N],_c[N],_md[N];
vint Md;
ll qpow(ll a,ll b){
	ll res=1;
	a%=mod;
	while(b){
		if(b&1)res=res*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return res;
}
void mul(ll *a,ll *b,int k){
    for(int i=0;i<k+k;i++)_c[i]=0;
    for(int i=0;i<k;i++)if(a[i])
    	for(int j=0;j<k;j++)_c[i+j]=(_c[i+j]+a[i]*b[j])%mod;
    for (int i=k+k-1;i>=k;i--)if(_c[i])
        for(int j=0;j<Md.size();j++)
        	_c[i-k+Md[j]]=(_c[i-k+Md[j]]-_c[i]*_md[Md[j]])%mod;
    for(int i=0;i<k;i++)a[i]=_c[i];
}
int solve(ll n,vint a,vint b){
    ll ans=0,pnt=0;
    int k=a.size();
    for(int i=0;i<k;i++)_md[k-1-i]=-a[i];_md[k]=1;
    Md.clear();
    for(int i=0;i<k;i++)if(_md[i]!=0)Md.push_back(i);
    for(int i=0;i<k;i++)res[i]=base[i]=0;
    res[0]=1;
    while((1ll<<pnt)<=n)pnt++;
    for (int p=pnt;p>=0;p--){
        mul(res,res,k);
        if((n>>p)&1){
            for (int i=k-1;i>=0;i--) res[i+1]=res[i];res[0]=0;
            for(int j=0;j<Md.size();j++)res[Md[j]]=(res[Md[j]]-res[k]*_md[Md[j]])%mod;
        }
    }
    for(int i=0;i<k;i++)ans=(ans+res[i]*b[i])%mod;
    if(ans<0) ans+=mod;
    return ans;
}
vint BM(vint s){
    vint C(1,1),B(1,1);
    int L=0,m=1,b=1;
    for(int n=0;n<s.size();n++){
        ll d=0;
        for(int i=0;i<L+1;i++)d=(d+(ll)C[i]*s[n-i])%mod;
        if(d==0) ++m;
        else if(2*L<=n){
            vint T=C;
            ll c=mod-d*qpow(b,mod-2)%mod;
            while (C.size()<B.size()+m) C.push_back(0);
            for(int i=0;i<B.size();i++)C[i+m]=(C[i+m]+c*B[i])%mod;
            L=n+1-L; B=T; b=d; m=1;
        }else{
            ll c=mod-d*qpow(b,mod-2)%mod;
            while (C.size()<B.size()+m) C.push_back(0);
            for(int i=0;i<B.size();i++)C[i+m]=(C[i+m]+c*B[i])%mod;
            ++m;
        }
    }
    return C;
}
int gao(ll n,vint a){
    vint c=BM(a);
    c.erase(c.begin());
    for(int i=0;i<c.size();i++)c[i]=(mod-c[i])%mod;
    return solve(n,c,vint(a.begin(),a.begin()+c.size()));
}

int main(){
    int T;
    scanf("%d",&T);
    while(T--){
        scanf("%lld",&n);
        printf("%lld\n",gao(n-1,vint{1,1,2,3,5,8}));
    }
}
```

## 例题
### [Fibonacci](https://vjudge.net/problem/POJ-3070)

容易看出是矩阵快速幂的裸题，这里试一下用BM线性递推。  

I failed 。。。  

暂时归类到毒瘤题。  

### [Array Challenge ](https://vjudge.net/problem/HDU-6172)  

看到这么复杂的公式，先打表找规律。。。  

```py
from math import *
def h(n):
	if n<3:
		return [2,3,6][n]
	else:
		return 4*h(n-1)+17*h(n-2)-12*h(n-3)-16
def b(n):
	return 3*h(n+1)*h(n)+9*h(n+1)*h(n-1)+9*h(n)*h(n)+27*h(n)*h(n-1)-18*h(n+1)-126*h(n)-81*h(n-1)+192
def a(n):
	return b(n)+4**n
for i in range(2,20):
	print(int(sqrt(a(i)))%(10**9+7),end=',')
```

然而完全看不出什么，胡乱猜想可能是线性递推，$h(n)$是线性递推，把打表数据套进BM板子里，AC。  

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef vector<int> vint;
typedef long long ll;
const ll mod=1e9+7;
const int N=10010;
ll n,res[N],base[N],_c[N],_md[N];
vint Md;
ll qpow(ll a,ll b){
	ll res=1;
	a%=mod;
	while(b){
		if(b&1)res=res*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return res;
}
void mul(ll *a,ll *b,int k){
    for(int i=0;i<k+k;i++)_c[i]=0;
    for(int i=0;i<k;i++)if(a[i])
    	for(int j=0;j<k;j++)_c[i+j]=(_c[i+j]+a[i]*b[j])%mod;
    for (int i=k+k-1;i>=k;i--)if(_c[i])
        for(int j=0;j<Md.size();j++)
        	_c[i-k+Md[j]]=(_c[i-k+Md[j]]-_c[i]*_md[Md[j]])%mod;
    for(int i=0;i<k;i++)a[i]=_c[i];
}
int solve(ll n,vint a,vint b){
    ll ans=0,pnt=0;
    int k=a.size();
    for(int i=0;i<k;i++)_md[k-1-i]=-a[i];_md[k]=1;
    Md.clear();
    for(int i=0;i<k;i++)if(_md[i]!=0)Md.push_back(i);
    for(int i=0;i<k;i++)res[i]=base[i]=0;
    res[0]=1;
    while((1ll<<pnt)<=n)pnt++;
    for (int p=pnt;p>=0;p--){
        mul(res,res,k);
        if((n>>p)&1){
            for (int i=k-1;i>=0;i--) res[i+1]=res[i];res[0]=0;
            for(int j=0;j<Md.size();j++)res[Md[j]]=(res[Md[j]]-res[k]*_md[Md[j]])%mod;
        }
    }
    for(int i=0;i<k;i++)ans=(ans+res[i]*b[i])%mod;
    if(ans<0) ans+=mod;
    return ans;
}
vint BM(vint s){
    vint C(1,1),B(1,1);
    int L=0,m=1,b=1;
    for(int n=0;n<s.size();n++){
        ll d=0;
        for(int i=0;i<L+1;i++)d=(d+(ll)C[i]*s[n-i])%mod;
        if(d==0) ++m;
        else if(2*L<=n){
            vint T=C;
            ll c=mod-d*qpow(b,mod-2)%mod;
            while (C.size()<B.size()+m) C.push_back(0);
            for(int i=0;i<B.size();i++)C[i+m]=(C[i+m]+c*B[i])%mod;
            L=n+1-L; B=T; b=d; m=1;
        }else{
            ll c=mod-d*qpow(b,mod-2)%mod;
            while (C.size()<B.size()+m) C.push_back(0);
            for(int i=0;i<B.size();i++)C[i+m]=(C[i+m]+c*B[i])%mod;
            ++m;
        }
    }
    return C;
}
int gao(ll n,vint a){
    vint c=BM(a);
    c.erase(c.begin());
    for(int i=0;i<c.size();i++)c[i]=(mod-c[i])%mod;
    return solve(n,c,vint(a.begin(),a.begin()+c.size()));
}

int main(){
    int T;
    scanf("%d",&T);
    while(T--){
    	scanf("%lld",&n);
        printf("%lld\n",gao(n-2,vint{31,197,1255,7997,50959,324725,2069239,13185773,84023455,535421093,411853810,741292298,541630825,826246583,617202760,15432981,639219848,412806984}));
    }
}
```

交完后再把数据套进BM公式板子里得到：

$$
f_n= \lfloor \sqrt{a_n}\rfloor \\
f_n= 7f_{n-1} - 4f_{n-2}
$$


看来需要深厚的数学功力才能推出呢(⊙﹏⊙)  


### [Poor God Water](https://nanti.jisuanke.com/t/A2022)  
看了一遍题，发现是个组合数学问题，硬着头皮推了一下公式最后还是放弃了。暴力程序跑出15以内的数据。  
```py
u=[[0,0,0],[1,1,1],[2,2,2],[0,2,1],[1,2,0],[2,0,2],[2,1,2]]
for n in range(3,16):
	ans=0
	for i in range(3**n):
		a=[]
		while i!=0 or len(a)<n:
			a+=[i%3]
			i//=3
		# print(a)
		for j in range(n-2):
			if a[j:j+3] in u:
				ans+=1
				break
	print(3**n-ans,end=",")
```

放进BM板子里交了。  
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef vector<int> vint;
typedef long long ll;
const ll mod=1e9+7;
const int N=10010;
ll n,res[N],base[N],_c[N],_md[N];
vint Md;
ll qpow(ll a,ll b){
	ll res=1;
	a%=mod;
	while(b){
		if(b&1)res=res*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return res;
}
void mul(ll *a,ll *b,int k){
    for(int i=0;i<k+k;i++)_c[i]=0;
    for(int i=0;i<k;i++)if(a[i])
    	for(int j=0;j<k;j++)_c[i+j]=(_c[i+j]+a[i]*b[j])%mod;
    for (int i=k+k-1;i>=k;i--)if(_c[i])
        for(int j=0;j<Md.size();j++)
        	_c[i-k+Md[j]]=(_c[i-k+Md[j]]-_c[i]*_md[Md[j]])%mod;
    for(int i=0;i<k;i++)a[i]=_c[i];
}
int solve(ll n,vint a,vint b){
    ll ans=0,pnt=0;
    int k=a.size();
    for(int i=0;i<k;i++)_md[k-1-i]=-a[i];_md[k]=1;
    Md.clear();
    for(int i=0;i<k;i++)if(_md[i]!=0)Md.push_back(i);
    for(int i=0;i<k;i++)res[i]=base[i]=0;
    res[0]=1;
    while((1ll<<pnt)<=n)pnt++;
    for (int p=pnt;p>=0;p--){
        mul(res,res,k);
        if((n>>p)&1){
            for (int i=k-1;i>=0;i--) res[i+1]=res[i];res[0]=0;
            for(int j=0;j<Md.size();j++)res[Md[j]]=(res[Md[j]]-res[k]*_md[Md[j]])%mod;
        }
    }
    for(int i=0;i<k;i++)ans=(ans+res[i]*b[i])%mod;
    if(ans<0) ans+=mod;
    return ans;
}
vint BM(vint s){
    vint C(1,1),B(1,1);
    int L=0,m=1,b=1;
    for(int n=0;n<s.size();n++){
        ll d=0;
        for(int i=0;i<L+1;i++)d=(d+(ll)C[i]*s[n-i])%mod;
        if(d==0) ++m;
        else if(2*L<=n){
            vint T=C;
            ll c=mod-d*qpow(b,mod-2)%mod;
            while (C.size()<B.size()+m) C.push_back(0);
            for(int i=0;i<B.size();i++)C[i+m]=(C[i+m]+c*B[i])%mod;
            L=n+1-L; B=T; b=d; m=1;
        }else{
            ll c=mod-d*qpow(b,mod-2)%mod;
            while (C.size()<B.size()+m) C.push_back(0);
            for(int i=0;i<B.size();i++)C[i+m]=(C[i+m]+c*B[i])%mod;
            ++m;
        }
    }
    return C;
}
int gao(ll n,vint a){
    vint c=BM(a);
    c.erase(c.begin());
    for(int i=0;i<c.size();i++)c[i]=(mod-c[i])%mod;
    return solve(n,c,vint(a.begin(),a.begin()+c.size()));
}

int main(){
    int T;
    scanf("%d",&T);
    while(T--){
    	scanf("%lld",&n);
    	int t[]={0,3,9};
        printf("%lld\n",n<3?t[n]:gao(n-3,vint{20,46,106,244,560,1286,2956,6794,15610,35866,82416,189384,435170}));
    }
}
```

本题递推式：  

$$
a_n=2a_{n-1}-a_{n-2}+3a_{n-3}+2a_{n-4}
$$