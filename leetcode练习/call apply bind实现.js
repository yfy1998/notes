//call的模拟实现
Function.prototype.call1=function(obj){
    var obj=obj || window;   //对象默认值为window
    var fn=this;            //取函数
    obj.foo=fn;             //将函数加入到对象的属性中
    var arr=[];             
    for(var i=1;i<arguments.length;i++){
        arr.push('arguments['+i+']');
    }                                      //取剩余参数
    var res=eval('obj.foo('+arr+')');       //执行函数，保存返回值
    delete obj.foo;                         //将函数从对象属性中删除
    return res;                 //return
}

var obj={
    a:1,
    b:2
}
function fa(c){
    return [this.a,this.b,c];
}

console.log(fa.call1(obj,3));
//Array(3)[1,2,3]



//apply的模拟实现
Function.prototype.apply1=function(obj,arr){
    var obj= obj || window;
    var fn=this;
    obj.foo=fn;
    var res;
    if(!arr){
        res= obj.foo();
    }
    else{
        var args=[];
        for(var i=0;i<arr.length;i++){
            args.push('arr['+i+']');
        }
        res=eval('obj.foo('+args+')');
    }
    delete obj.foo;
    return res;
}

var obj={
    a:1
}
function fa(b,c){
    return [this.a,b,c];
}

console.log(fa.apply1(obj,[2,3]));
//Array(3)[1,2,3]


//bind的模拟实现   考虑bind函数作为构造函数会导致this失效
Function.prototype.bind1=function(obj){
    var obj=obj || window;
    var fn=this;
    var arr=[].slice.call(arguments,1);
    function fbound(){
        var arr1=[].slice.call(arguments);
        var tolarr=arr.concat(arr1);

        return fn.apply(this instanceof fbound?this:obj,tolarr);
    }
    var fnp=Object.create(fn.prototype);        //继承原函数属性
    fbound.prototype=fnp;
    return fbound;
}