#include <bits/stdc++.h>
template <typename T>
struct forward_list{
    struct node{
        T data;
        node *next;
    };
    node *head,*tail;
    forward_list():head(nullptr),tail(nullptr){}
    bool empty(){ return head==nullptr; }
    void append(T x){
        node *tmp=new node{x,nullptr};
        if(empty()){
            tail=head=tmp;
        }else{
            tail->next=tmp;
            tail=tmp;
        }
    }
    void reverse(){
        node *prev=head,*curr=head->next;
        while(curr!=nullptr){
            node *next=curr->next;
            curr->next=prev;
            prev=curr;
            curr=next;
        }
        head->next=nullptr;
        curr=head;head=tail;tail=curr;
    }
    void out(){
        node *cur=head;
        while(cur!=nullptr){
            std::cout<<(cur->data);
            cur=cur->next;
        }
    }
};

int main(){
    int T;
    std::cin>>T;
    while(T--){
        std::string s;
        std::cin>>s;
        forward_list<char> list;
        for(auto c:s){
            list.append(c);
        }
        list.reverse();
        list.out();
        std::cout<<'\n';
    }
    return 0;
}


