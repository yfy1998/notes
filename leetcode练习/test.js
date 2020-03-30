// function foo(l,r){
//     let number=(1+l)*l/2;
//     let count=0;
//     while(l>r){
//         (number%3===0)&&count++;
//         l++;
//         number+=l;
//     }
//         return count;
// }
        
// let res=foo(2,5);


let n=3,k=2;
let arr=[5,8,5];
let s,m;
let res=[];
for(let i=0;i<k+1;i++){
    let max=Math.max(...arr);
    let min=Math.min(...arr);
    if(i===k){
        s=max-min;
        m=k;
        break;
    }
    if(max-min<=1){
        s=max-min;
        m=i;
        break;
    }
    let maxindex=arr.indexOf(max);
    let minindex=arr.indexOf(min);
    res.push([maxindex+1,minindex+1]);
    arr[maxindex]--;
    arr[minindex]++;
}

console.log(s+' '+m);

for(let [a,b] of res){
    console.log(a+" "+b);
}