# RSA加密与解密

## [HDU-RSA](http://acm.hdu.edu.cn/showproblem.php?pid=1211)
[POJ-RSA](http://poj.org/problem?id=2447)

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
ll exgcd(ll a,ll b,ll &x,ll &y){
	if(b==0){
		x=1,y=0;
		return a;
	}
	ll d=exgcd(b,a%b,y,x);
	y-=a/b*x;
	return d;
}
ll qpow(ll x,ll y,ll mod){
	ll ans=1;
	while(y){
		if(y&1)ans=ans*x%mod;
		x=x*x%mod;
		y>>=1;
	}
	return ans;
}
int main(){
	ll p,q,e,d,r,l,x,y;
	while(cin>>p>>q>>e>>l){
		r=(p-1)*(q-1);
		exgcd(e,r,x,y);
		d=(x%r+r)%r;
		for(int i=0;i<l;i++){
			int t;
			scanf("%d",&t);
			putchar(qpow(t,d,p*q));
		}
		putchar('\n');
	}
	return 0;
}
```

