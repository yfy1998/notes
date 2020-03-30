---
title: JavaScript之函数柯里化
date: 2019-07-02 17:02:07
categories: 学习笔记
tags: [函数式编程,柯里化]
---

### curry实现
函数柯里化即类似
`sum(a,b,c)=sum(a)(b)(c)`

现在实现一个curry函数，该函数可以将其他函数柯里化
```
    var sum=function(a,b,c){
        return a+b+c;
    }
    var newsum=curry(sum);
    newsum(a)(b)(c)=newsum(a,b,c)
    //newsum(a,b)(c) newsum(a)(b,c) 柯里化后参数可以任意搭配
```

实现思路：递归
如果传入参数数量比原函数预期传入参数少，则返回一个接收剩余参数的函数，函数内部递归
如果传入参数数量比原函数预期传入参数等或多，则执行原函数并返回结果
```
    function curry(fn,...arg1){
        if(arg1.length<fn.length){
            return function(...arg2){
                return curry(fn,...arg1,...arg2);
            }
        }
        else{
            return fn(...arg1);
        }
    }
```

### 应用场景
-参数复用
    绑定参数，和bind类似
-延迟执行
    在前端开发中，一个常见的场景就是为标签绑定 onClick 事件，同时考虑为绑定的方法传递参数。
    1.通过 data 属性
    `<div data-name="name" onClick={handleOnClick} /> `
    2.通过bind方法
    `<div onClick={handleOnClick.bind(null, data)} /> `
    3.箭头函数
    `<div onClick={() => handleOnClick(data))} /> `
    4.通过curry
    `<div onClick={curry(handleOnClick, data)} /> `

    性能对比：箭头函数>bind>curry
    currying 函数相比 bind 函数，其原理相似，但是性能相差巨大，其原因是 bind 由浏览器实现，运行效率有加成。