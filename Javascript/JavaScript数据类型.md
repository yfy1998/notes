---
title: JavaScript数据类型
date: 2019-02-22 14:30:49
categories: 学习笔记
tags: [JavaScript]
---

数值（number）：整数和小数（比如1和3.14）
字符串（string）：文本（比如Hello World）。
布尔值（boolean）：表示真伪的两个特殊值，即true（真）和false（假）
undefined：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值
null：表示空值，即此处的值为空。
对象（object）：各种值组成的集合。
es6新增：Symbol 模板字符串

null与undefined区别很小，因为历史原因才会出现这2种类型，甚至直接用===判断都会返回true
```
null === undefined // true
```

null与undefined的微小区别
```
Number(null) //0
Number(undefined) //NaN
```

具体区别可以看阮一峰老师的[null与undefined的区别](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)