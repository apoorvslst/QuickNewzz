#include <bits/stdc++.h>
using namespace std;

int main() {
	// your code goes here
	int t;
	cin>>t;
	for(int i=0;i<t;i++){
	    int a,b;
	    cin>>a>>b;
	    if(a==0){
	        cout<<"No"<<endl;
	        continue;
	    }
	    if(a>0 && b%a==0){
	        cout<<"Yes"<<endl;
	        continue;
	    }
	}
	return 0;
}