#include <iostream>
using namespace std;
void array_mix(int firstArray[], int secondArray[]);
int main() {
  int firstArray[8];
  int secondArray[6];
  
  cout << "Enter  Array One:";

  //taking first array input
  for(int i=0;i<8;i++){
    int x;
    cin >> x;
    if(x<0 || x==0){
      cout << "Numbers should be greater than 0";
      break;
    }else{
      firstArray[i]=x;
    }
  }

  cout <<endl << "Enter Array Two:";
  //taking second array input
  for(int i=0;i<6;i++){
    int x;
    cin >> x;
    if(x<0 || x==0){
      cout << "Numbers should be greater than 0";
      break;
    }else{
      secondArray[i]=x;
    }
  }
  
  array_mix(firstArray,secondArray);
  
  return 0;
}

void array_mix(int firstArray[], int arrayTwo[]){
    int newArray[14];
 
    int newArrayPosition=0;
    
    //keeping odd first for first array
    for(int i=0;i<8;i++){
         if(firstArray[i]%2 == 0){
             continue;
         }else{
             newArray[newArrayPosition]=firstArray[i];
             newArrayPosition++;
         }
    }
    
    //keeping even second for first array
    for(int i=0;i<8;i++){
         if(firstArray[i]%2 == 0){
             newArray[newArrayPosition]=firstArray[i];
             newArrayPosition++;
         }
    }
    
    //keeping even first for second array
    for(int i=0;i<6;i++){
         if(secondArray[i]%2 == 0){
             newArray[newArrayPosition]=secondArray[i];
             newArrayPosition++;
         }
    }
    
    int last = 13;
    // keeping odd from last for second array
      for(int i=0;i<6;i++){
         if(secondArray[i]%2 == 0){
            continue;
         }
         else{
    
             newArray[last]=secondArray[i];
             last--;
         }
    }

 
    for(int i=0;i<14;i++){
      cout << newArray[i] << endl;
  }
    
 
}
