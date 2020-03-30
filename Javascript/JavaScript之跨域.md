---
title: JavaScript之跨域
date: 2019-07-02 23:37:17
categories: 学习笔记    
tags: [跨域,Jsonp,CORS,同源政策]
---
### 同源政策
浏览器同源政策可以保证用户信息的安全，防止恶意网站盗取信息。
#### 同源
    - 协议
    - 域名
    - 端口
  三者均相同，才叫同源
#### 不同源的限制
    - 无法访问非同源的cookie，localstorage
    - 无法访问非同源的DOM
    - 无法向非同源地址发AJAX请求（可以发送，但浏览器会拒绝接受响应）

### 跨域
跨域即解除浏览器同源政策的限制，实现非同源网页之间的通信。
跨域方法有document.domain,postMessage API,代理，Jsonp,websocket,CORS

#### document.domain
当2个网页的二级域名相同时，如**a.lee.com**,**b.lee.com**，我们可以设置2个网页
```
    document.domain='lee.com';
```
这样可以解除2个网页之间的同源限制

#### postMessage
postMessage API可以完成一个网页父窗口和iframe子窗口之间的通信，还可以互相读取localstorage。

#### 代理
将跨域请求发送给一个代理服务器，代理服务器经过处理完成跨域。

#### Jsonp
Jsonp通过动态添加**Script**标签实现跨域请求，只能发送GET请求

#### websocket
websocket通信不受同源政策的限制

#### CORS
CORS即“跨源资源共享”（Cross-origin resource sharing）
需要浏览器和服务器同时支持，CORS请求分为简单请求和非简单请求
##### 简单请求
请求方式：HEAD,GET,POST
请求头：
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type：只限于三个值application/x-www-form-urlencoded、 multipart/form-data、text/plain

网页发送一个CORS请求会自动带上Origin字段，服务器收到后判断Origin是否在白名单内，在的话就同意跨域，会在response头中加上**Access-Control-Allow-Origin**等字段，浏览器收到包检查是否有**Access-Control-Allow-Origin**，有就请求成功，没有就会报错。

##### 非简单请求
超过简单请求的请求方式和请求头的都叫非简单请求，如请求方式为PUT,DELETE等

预检请求
非简单请求先会发送一个预检请求询问服务器是否接收Origin源的CORS请求以及服务器支持的请求头,预检请求的请求方式为OPTIONS，表示询问。
```
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

服务器收到后，回应
```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```
浏览器会检查源是否在Access-Control-Allow-Origin字段中，上面请求http://api.bob.com在，表示同意

若不在，如
```
OPTIONS http://api.bob.com HTTP/1.1
Status: 200
Access-Control-Allow-Origin: https://notyourdomain.com
Access-Control-Allow-Method: POST
```
则浏览器就会认为服务器不同意当前CORS请求，就会触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获

```
Access-Control-Max-Age
```
表示预检请求的有效期

若预检请求通过，则在预检请求有效期内，当前源发送CORS请求就不会再发送预检请求，其步骤和简单请求一样。

##### CORS和Jsonp的比较
CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。JSONP 只支持GET请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

