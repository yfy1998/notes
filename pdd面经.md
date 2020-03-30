1、fetch和settimeout实现请求超时 （用Promise.race(）实现)

2、阻止标签默认行为（原生js可以直接return false，react中用e.preventDefault()）


3、funcA.bind(B).call(C) 
bind绑定this之后不会再变了
最后this指向B，而不是C

4.load和DOMcontentloaded
DOMcontentloaded在DOM解析完就执行
load在DOM解析完和资源请求完才执行

5.兼容性
webpack配置 postcss-loader + autoprefixer插件

6.继承属性（color，font-size）
子元素定义的继承属性总会覆盖父元素的继承属性
如：父{color：red 	！important}
       子{color：black}
最终color：black会生效

7.正则表达式中插入变量
不能使用字面量定义正则的方式插入，即//；
要用new RegExp() 的方式创建正则，利用第一个参数是字符串，利用字符串连接将变量连接进去即可。
如：
let s='aaa';
let v='a';
console.log(s.match(new RegExp(''+v,'g')));

8.react中实现对话框控制出现，消失（条件渲染） 
   原生js实现用classlist.add（），classlist.remove（）控制样式（display：none）

9.解析url参数
URLSearchparams API

10.基本数据类型和复杂数据类型的区别为:
内存的分配不同
基本数据类型存储在栈中。

复杂数据类型存储在堆中，栈中存储的变量，是指向堆中的引用地址。

11.作用域链是函数创建时所在父作用域链加上函数运行时创建的变量对象。

12. 10.toString()结果
结果会报错，因为小数点歧义，. 既可以解释为数字的小数点，也可以解释为方法的调用
解决：(10).toString()或10.0.toString()
字符串不会 "abc".toString() 因为此时小数点只能解释为方法调用。

13.尾递归(用递归保存变量，不用栈)

14.不用props和rudex实现通信（ref,context）

15.301永久重定向谁解决的

16.dpr移动端

17.解决浏览器最小字体12px
.font-6px{
  transform: scale(0.5);
  font-size: 12px;
}


