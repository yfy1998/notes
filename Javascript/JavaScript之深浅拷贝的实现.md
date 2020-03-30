---
title: JavaScript之深浅拷贝的实现
date: 2019-04-07 12:00:29
categories: 学习笔记
tags: [JavaScript,深浅拷贝]
---
## 深浅拷贝
我们把复制引用的拷贝方法称之为浅拷贝，与之对应的就是深拷贝，深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。

## 数据的浅拷贝
我们可以利用数组的slice、concat方法返回一个新数组的特性来实现浅拷贝。
比如用concat方法
```
var arr = ['old', 1, true, null, undefined];

var new_arr = arr.concat();

new_arr[0] = 'new';

console.log(arr) // ["old", 1, true, null, undefined]
console.log(new_arr) // ["new", 1, true, null, undefined]
```
如果数组嵌套了对象或者数组的话
```
var arr = [{old: 'old'}, ['old']];

var new_arr = arr.concat();

arr[0].old = 'new';
arr[1][0] = 'new';

console.log(arr) // [{old: 'new'}, ['new']]
console.log(new_arr) // [{old: 'new'}, ['new']]
```
可以看到concat方法仅仅拷贝了对象的引用，只是浅拷贝。
用slice方法这样写
`var new_arr = arr.slice();`

## 深拷贝的简便方法
`JSON.parse(JSON.stringify(obj))`是深拷贝简单粗暴的一个方法，但是它无法拷贝函数
**JSON.stringify**方法用于将一个值转为 JSON 字符串。该字符串符合 JSON 格式，并且可以被**JSON.parse**方法还原。
如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify过滤。
```
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"
```
如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null。
```
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"
```

## 浅拷贝的实现
```
var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```

## 深拷贝的实现
我们在拷贝的时候判断一下属性值的类型，如果是对象，我们递归调用深拷贝函数
```
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```


