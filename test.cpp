#include<bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin>>t;
    for(int i=0;i<t;i++){
        int n;
        cin>>n;
        string s;
        cin>>s;
        if(n==1){
            cout<<s[0]-'0'<<endl;
            continue;
        }
        long long sum=0;
        for(int i=0;i<n;i++){
            sum+=s[i]-'0';
        }
        sum=sum*2;
        sum=sum+(s[0]-'0')+(s[n-1]-'0');
        cout<<sum<<endl;
    }
    return 0;
}