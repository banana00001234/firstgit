package com.graduate.springboot;

public class shelllsort {

        public void shsort(){
            int [] originarray={23,3,55,12,11,34,25,76,89,64};
            int n=originarray.length;
            int gap=n/2;
            int i=gap;
            for(gap=n/2;gap>=0;gap=gap/2){
                for(int j=i;j<n;j++){
                    int preindex=j-gap;
                    int temp=originarray[j];
                    while(preindex>=0&&originarray[preindex]>originarray[j]){

                        originarray[i]=originarray[preindex];
                        preindex-=gap;
                    }
                    originarray[preindex+gap]=temp;
                }
            }
            System.out.println("shellsort");
            for(int h=0;h<n;h++){
                System.out.println(originarray[h]);
            }

        }

}
