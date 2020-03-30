---
title: ES6之let和const
date: 2019-06-24 16:35:47
categories: 学习笔记    
tags: [ES6]
---
### let
ES6新增了let命令，用于声明变量。使用类似于var，但是let命令会形成块级作用域。
#### 特点
1.不存在变量提升
```
    // var 的情况
    console.log(foo); // 输出undefined
    var foo = 2;

    // let 的情况
    console.log(bar); // 报错ReferenceError
    let bar = 2;
```

2.暂时性死区
块级作用域内使用let声明的变量会被封锁在作用域内，不受外部影响，块级作用域内部无法访问外部作用域的同名变量。
```
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```
上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
```
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```
上面代码中，在let命令声明变量tmp之前，都属于变量tmp的“死区”。

3.不能重复声明
let不允许在相同作用域内重复声明同一变量。

### const
const声明一个只读的常量。一旦声明，常量的值就不能改变。声明时必须初始化。
值不能改变的本质是变量的地址不能改变，如果是简单类型（数值、字符串、bool），地址存的就是值，等同于常量；如果是复杂类型（对象、数组），地址存的是引用对象的指针，也就是说不能改变指针的指向，但是对象内部可以改变。
```
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

特点和let一样
