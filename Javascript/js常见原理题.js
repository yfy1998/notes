//浅拷贝
function shallowcopy(obj){
    if(typeof obj !=='object') return ;
    let newobj=obj instanceof Array ? []:{};
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newobj[key]=obj[key];
        }
    }
    return newobj;
}

//深拷贝
function deepcopy(obj){
    if(typeof obj!=='object') return ;
    let newobj=obj instanceof Array? []:{};
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newobj[key]=typeof obj[key]==='object'?deepcopy(obj[key]):obj[key];
        }
    }
    return newobj;
}

//柯里化
function curry(fn,...args1){
    if(args1.length>=fn.length){
        return fn(...args1);
    }
    else{
        return function(...args2){
            return curry(fn,...args1,...args2);
        }
    }
}

//call实现
Function.prototype.call1=function(obj,...rest){
    var fn=this;
    obj.foo=fn;
    var res=obj.foo(...rest);
    delete obj.foo;
    return res;
}

//apply实现
Function.prototype.apply1=function(obj,arr){
    var fn=this;
    obj.foo=fn;
    var res;
    if(arr) res=obj.foo(...arr);
    else res=obj.foo();
    delete obj.foo;
    return res;
}

//bind实现
Function.prototype.bind1=function(obj,...rest){
    var fn=this;
    function foo(...rest1){
        if(this instanceof foo){
            return fn.call1(this,...rest,...rest1);
        }
        return fn.call1(obj,...rest,...rest1);
    }
    var temp=Object.create(fn.prototype);
    foo.prototype=temp;
    return foo;
}

//new 
function new1(fn,...rest){
    var obj=[];
    obj.__proto__=fn.prototype;
    var res=fn.call(obj,...rest);
    if(typeof res==='object') return res;
    return obj;
}



//instanceof
function instanceof1(A,B){
    var temp=A.__proto__;
    while(temp!==null&&temp!==B.prototype){
        temp=temp.__proto__;
    }
    if(temp===B.prototype) return true;
    return false;
}


//快排
//写法一
function quicksort(arr){
    if(arr.length<=1) return arr;
    let pivotindex=Math.floor(arr.length/2);
    let pivot=arr[pivotindex];
    arr.splice(pivotindex,1);
    let left=[];
    let right=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i]>=pivot){
            right.push(arr[i]);
        }
        else{
            left.push(arr[i]);
        }
    }
    return quicksort(left).concat([pivot],quicksort(right));
}

//写法二
function getindex(arr,start,end){
    let l=start,r=end;
    while(l<r){
        while(l<r&&arr[r]>=arr[l]){
            r--;
        }
        [arr[r],arr[l]]=[arr[l],arr[r]];
        while(l<r&&arr[l]<arr[r]){
            l++;
        }
        [arr[r],arr[l]]=[arr[l],arr[r]];
    }
    return r;
}

function quicksort2(arr,start,end){
    if(start>=end) return;
    let index=getindex(arr,start,end);
    quicksort2(arr,start,index-1);
    quicksort2(arr,index+1,end);
}


//promise实现
class promise1{
    constructor(fn){
        this.state='pending';
        this.value=undefined;
        this.reason=undefined;
        function resolve(value){
            if(this.state==='pending'){
                this.state='fulfilled';
                this.value=value;
            }
        }
        function reject(reason){
            if(this.state==='pending'){
                this.state='rejected';
                this.reason=reason;
            }
        }
        try{
            fn(resolve,reject);
        }
        catch(err){
            reject(err);
        }
    }
    then(onFulfilled,onRejected){
        Settimeout(function(){
            if(this.state==='fulfilled'){
                let value=onFulfilled(this.value);
                return new promise1((resolve)=>{
                    resolve(value);
                })
            }
            if(this.state==='rejected'){
                let reason=onRejected(this.reason);
                return new promise1((resolve,reject)=>{
                    reject(reason);
                })
            }
            if(this.state==='pending'){
                Settimeout(arguments.callee);
            }
        });
    }
}

//Promise.all
Promise.all1=function(promises){
    let index=0;
    let res=[];
    return new promise((resolve,reject)=>{
        if(promises.length===0) {
            resolve(res);
        }
        else{
            for(let i=0;i<promises.length;i++){
                Promise.resolve(promises[i]).then((value)=>{
                    res[i]=value;
                    index++;
                    if(index===promises.length){
                        resolve(res);
                    }
                },(err)=>{
                    reject(err);
                })
            }
        }
    })
}


//防抖（规定时间内未触发第二次，执行）
function debounce(fn,delay){
    var timer=null;
    return function(...rest){
        var context=this;

        if(timer) clearTimeout(timer);
        timer=Settimeout(function(){
            fn.apply(context,rest)
        },delay)
    }
}

//节流（规定时间内只触发一次）
function throttle(fn,delay){
    var context=this;
    var pre=Date.now();
    return function(...rest){
        var cur=Date.now();
        if(cur-pre>=delay){
            fn.apply(context,rest);
            pre=Date.now();
        }
    }
}






