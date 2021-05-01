# [C++11：using 的各种作用](https://www.cnblogs.com/wishchin/p/9199835.html)

C++11中using关键字的主要作用是：为一个模板库定义一个别名。

文章链接：派生类中[使用using别名改变基类成员的访问](https://blog.csdn.net/lfw19891101/article/details/4783217)权限   

## 一、《Effective Modern C++》里有比较完整的解释

各个作用
```cpp
/*定义别名*/
 template<class T>
 using Tlist = std::list<T>;
 
 using Tlist = std::list<char>;
 Tlist listChar;
 
 //typedef void (*df)()
  using  df = void(*)();
 /*使用外部构造*/
 using A::A;

 /*引用外部类型*/
using typename A;

```

## 二、Using 关键字的作用：重载父类函数

### 1.在当前文件中引入命名空间这是我们最熟悉的用法，例如：using namespace std;

### 2.在子类中使用 using 声明引入基类成员名称（参见C++ primer）

在private或者protected继承时，基类成员的访问级别在派生类中更受限：
```cpp
class Base {
public:
std::size_t size() const { return n; }
protected:
std::size_t n;
};
class Derived : private Base { . . . };
```
在这一继承层次中，成员函数 size 在 Base 中为 public，但在 Derived 中为 private。为了使 size 在 Derived 中成为 public，可以在 Derived 的 public  
部分增加一个 using 声明。如下这样改变 Derived 的定义，可以使 size 成员能够被用户访问，并使 n 能够被 Derived的派生类访问：
```cpp
class Derived : private Base {
public:
using Base::size;
protected:
using Base::n;
// ...
};
```
另外，当子类中的成员函数和基类同名时，子类中重定义的成员函数将隐藏基类中的版本，即使函数原型不同也是如此（隐藏条件见下面）。

如果基类中成员函数有多个重载版本，派生类可以重定义所继承的 0 个或多个版本，但是通过派生类型只能访问派生类中重定义的那些版本，所以如果派生类想通过自身类型使用所有的重载版本，则派生类必须要么重定义所有重载版本，要么一个也不重定义。有时类需要仅仅重定义一个重载集中某些版本的行为，并且想要继承其他版本的含义，在这种情况下，为了重定义需要特化的某个版本而不得不重定义每一个基类版本，可能会令人厌烦。可以在派生类中为重载成员名称提供 using 声明（为基类成员函数名称而作的 using 声明将该函数的所有重载实例加到派生类的作用域），使派生类不用重定义所继承的每一个基类版本。一个 using 声明只能指定一个名字，不能指定形参表，使用using声明将名字加入作用域之后，派生类只需要重定义本类型确实必须定义的那些函数，对其他版本可以使用继承的定义。

“隐藏”是指派生类的函数屏蔽了与其同名的基类函数，规则如下：

1、如果派生类的函数与基类的函数同名，但是参数不同。此时，不论有无virtual关键字，基类的函数将被隐藏（注意别与重载混淆）

2、如果派生类的函数与基类的函数同名，并且参数也相同，但是基类函数没有virtual关键字。此时，基类的函数被隐藏（注意别与覆盖混淆）
```cpp
#include "StdAfx.h"
#include <iostream>
using namespace std;
class Base
{
public:    
   void menfcn()
  {
     cout<<"Base function"<<endl; 
  }
    void menfcn(int n)
    {
     cout<< cout<<"Base function with int"<<endl; 
    }
};

class Derived : Base
{
public:    
using Base::menfcn;//using声明只能指定一个名字，不能带形参表    
int menfcn(int)
{ cout<< cout<<"Derived function with int"<<endl; }
};
int main()
{    Base b; 
     Derived d;   
  b.menfcn();   
  d.menfcn();//如果去掉Derived类中的using声明，会出现错误：error C2660: 'Derived::menfcn' : function does not take 0 arguments    std::cin.ignore(std::cin.gcount()+1);//清空缓冲区    std::cin.get();//暂停程序执行  
}
```
  

## 三、需要注意的情况

子类中using引入基类函数时需要注意的情况  
```cpp
class base{
public:
 void test(){
  cout << "base::test()" << endl;
 }
 void test(int){
  cout << "base::test(int)" << endl;
 }
};
class derived : public base{
public:
 void test(){
  cout << "derived::test()" << endl;
 }
};
```
  

此时derived::test()会隐藏（hide）父类中的两个test重载函数（base::test()和base::test(int)），因此我们为子类中加上一个using声明：  

```cpp
class derived : public base{
public:
 void test(){
  cout << "derived::test()" << endl;
 }
 using base::test;//此声明放在test前面和后面效果都一样
};
```
  

现在会不会出现下面所述的情况呢？  

既然using base::test将父类中的两个test函数都引入子类，则子类中就相当于有了一个void test()函数，所以我们在子类中重新定义的void test()函数将会和从父类中引入的void test()函数发生冲突，进而出现“重定义”错误。  

答案是：不会！  
此时，子类中重新定义的void test()函数将“顶替”从父类中引入的void test()函数。  
（PS:从父类中引入的另外一个void test(int)函数则没有发生变化（仍然是父类中的函数实现）。）

类似的另外一种情况如下，此时加入了virtual:  
```cpp
class base{
public:
 virtual void test(){
  cout << "base::test()" << endl;
 }
 virtual void test(double){
  cout << "base::test(double)" << endl;
 }
 void test(int){
  cout << "base::test(int)" << endl;
 }
};
class derived : public base{
public:
 void test(){
  cout << "derived::test()" << endl;
 }
};
```
  
此时derived::test()虽然重写（override）了base::test()，但是同时也隐藏（hide）父类中的两个test重载函数（一个virtual函数base::test(double)和一个nonvirtual函数base::test(int)）。现在，我们为子类中加上一个using声明：  
```cpp
class derived : public base{
public:
 void test(){
  cout << "derived::test()" << endl;
 }
 using base::test;//此声明放在test前面和后面效果都一样
};
```
  
与上面的类似，此时derived::test()“仍然重写”了父类的base::test()，并且与父类中的base::test(double)和base::test(int)\[在子类的域\]中形成重载集合。

  
最后，留一个思考题目，如下：  
```cpp
class base{
public:
 virtual void test(){
  cout << "base::test()" << endl;
 }
 virtual void test(double){
  cout << "base::test(double)" << endl;
 }
 void test(int){
  cout << "base::test(int)" << endl;
 }
};
class derived : public base{
public:
 void test(){
  cout << "derived::test()" << endl;
 }
 //using base::test;
};
class A : public derived{
public:
 void test(double){
  cout << "A::test(double)" << endl;
 }
};
int main(int argc, char argv){
 base *pb = new A;
 pb->test(2.4);
 return 0;
}
```
  

问题：derived中的using base::test加上与否，对程序的结果有什么影响？  
答：没有影响。（关键点：名字解析是编译时期的事情，而virtual函数动态绑定是运行时期的事情。）  
(PS：但是将main函数改成“derived *pd = new A; pd->test(2.4);”，则有区别了：如果将using base::test去掉，则编译失败。)