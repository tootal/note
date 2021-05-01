# C++输入输出加速
## getchar读入
适用**整数**  
```cpp
template<typename T>
inline bool read(T &x){
	static char c=getchar();
	while(c!='-'&&!isdigit(c))c=getchar();
	if(c==EOF)return false;
	bool sgn=false;
	if(c=='-')sgn=true,c=getchar();
	for(x=0;isdigit(c);c=getchar())x=x*10+c-'0';
	if(sgn)x=-x;
	return true;
}
```
## fread读入
适用整数、使用前务必计算好**缓冲区大小、空间限制**。  
注意思考是否存在**不需要读入所有数据**的方法。（例如[Triangle](http://acm.hdu.edu.cn/showproblem.php?pid=6512)）  
用法：先 fast::begin(); 再用 fast::read(x);读入  
注意：使用后无法交互输入，可用文件输入。  

```cpp
namespace fast{
    const int sz=50*1024*1024; //缓冲区大小
    char buf[sz];
    int ptr,iosz;
    void begin(){
        ptr=0;
        iosz=fread(buf,1,sz,stdin);
    }
    template<typename T>
    inline bool read(T &t){
        while(ptr<iosz && buf[ptr]!='-' && (buf[ptr]<'0'||buf[ptr]>'9'))ptr++;
        if(ptr>=iosz)return false;
        bool sgn=false;
        if(buf[ptr]=='-')sgn=true,ptr++;
        for(t=0;ptr<iosz && '0'<=buf[ptr] && buf[ptr]<='9';ptr++)
            t=t*10+buf[ptr]-'0';
        if(sgn)t=-t;
        return true; 
    }
}
```
