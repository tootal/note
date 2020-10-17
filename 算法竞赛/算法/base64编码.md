# base64编码

> base64 编码转换  
> 编码方法为：每三个字符分为1组，不足补k个0x00  
> 按顺序写出该组的三个字符对应 ASCII 码的二进制  
> 把这 24 位按每 6 位分成 4 段，每段分别转回十进制  
> 在 Base64 码表中查得这 4 个数对应的字符，依次写下  
> 实际常常根据需要更改码表最后两个字符  

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef bitset<8> BS8;
typedef bitset<6> BS6;
const char bc[65]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
int cb(char x){
    if(x>='A'&&x<='Z')return x-'A';
    if(x>='a'&&x<='z')return x-'a'+26;
    if(x>='0'&&x<='9')return x-'0'+52;
    if(x=='+')return 62;
    if(x=='/')return 63;
    return 0;
}
string& encode(string &cipher){
    string plain(cipher);
    int len=plain.length();
    int k=(3-len%3)%3;
    plain.append(k,0);
    cipher.clear();
    for(int i=0;i<len;i+=3){
        string tb=BS8(plain[i]).to_string()+
                  BS8(plain[i+1]).to_string()+
                  BS8(plain[i+2]).to_string();
        cipher+=bc[BS6(tb,0,6).to_ulong()];
        cipher+=bc[BS6(tb,6,6).to_ulong()];
        cipher+=bc[BS6(tb,12,6).to_ulong()];
        cipher+=bc[BS6(tb,18,6).to_ulong()];
    }
    if(k>0)cipher[(len+k)/3*4-1]='=';
    if(k>1)cipher[(len+k)/3*4-2]='=';
    return cipher;
}
string& decode(string &plain){
    string cipher(plain);
    int len=cipher.length();
    if(cipher[len-1]=='=')cipher[len-1]=0;
    if(cipher[len-2]=='=')cipher[len-2]=0;
    plain.clear();
    for(int i=0;i<len;i+=4){
        string tb=BS6(cb(cipher[i])).to_string()+
                  BS6(cb(cipher[i+1])).to_string()+
                  BS6(cb(cipher[i+2])).to_string()+
                  BS6(cb(cipher[i+3])).to_string();
        plain+=char(BS8(tb,0,8).to_ulong());
        int temp=BS8(tb,8,8).to_ulong();
        if(temp)plain+=char(temp);
        temp=BS8(tb,16,8).to_ulong();
        if(temp)plain+=char(temp);
    }
    return plain;
}

```