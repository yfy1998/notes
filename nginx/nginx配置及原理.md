## nginx配置及原理

### nginx配置

nginx通过nginx.conf文件进行配置

nginx.conf是典型的分段配置文件

```
worker_processes 1;

events {

    worker_connections 1024;

}

http {

    server {

        listen:8080;

        server_name    localhost;

        location / {

        root html;

        index index.html index.htm;

    	}

	}

}

```

上面这个就是简单配置一个在localhost：8080上面一个nginx服务，location中的root说明返回nginx中的静态文件index.html

- worker_processes
  - 工作进程数
- worker_connections
  - 每个worker的最大连接数
- server模块
  - listen监听端口号
  - server_name 服务器名
  - location/{}访问根路径
  - root 指定nginx返回的静态文件（替换为proxy_pass可转发实现反向代理）

### nginx的Master-Worker模式

命令：`ps aux | grep nginx`

查看nginx进程，如下图（一个master主进程，一个worker进程）

![image-20200227152529019](.\nginx配置及原理.assets\image-20200227152529019.png)

默认配置woker进程数为一个

<img src=".\nginx配置及原理.assets\image-20200227152550821.png" alt="image-20200227152550821" style="zoom:33%;" />

启动Nginx后，其实就是在8080端口启动了Socket服务进行监听，如下图所示，Nginx涉及Master进程和Worker进程。

<img src=".\nginx配置及原理.assets\image-20200227152729533.png" alt="image-20200227152729533" style="zoom:50%;" />

**master主进程作用**

​	读取并验证配置文件nginx.conf;管理worker进程

**worker进程作用**

​	每一个worker进程都维护一个线程，处理连接和请求；注意worker进程的个数由配置文件决定，一般与	CPU个数有关，配置几个就有几个worker进程

### nginx如何处理高并发

当nginx面对BIO/NIO/AIO、异步/同步、阻塞/非阻塞...

nginx采用了linux的epoll模型，epoll模型基于事件驱动机制，它可以监控多个事件是否准备完毕，如果ok，那么放入epoll队列，这个过程是异步的。

worker只需要从epoll队列循环处理即可。