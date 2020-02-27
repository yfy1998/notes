## nginx实现反向代理

### proxy_pass

所谓反向代理，很简单，其实就是修改nginx.conf在location这一段配置中的root替换成proxy_pass即可。root说明是静态资源，可以由Nginx进行返回；而proxy_pass说明是动态请求，需要进行转发，比如代理到Tomcat上。

反向代理，前面已经说了，过程是透明的，比如说request -> Nginx -> Tomcat，那么对于Tomcat而言，请求的IP地址就是Nginx的地址，而非真实的request地址，这一点需要注意。不过好在Nginx不仅仅可以反向代理请求，还可以由用户自定义设置**HTTP HEADER**。

```javascript
worker_processes 1;

events {

	worker_connections 1024;

}

http {

    server {

        listen:8080;

        server_name    localhost;

        location / {

        proxy_pass  http://10.10.10.10:20186;

    	}

	}

}
```

### nginx反向代理实现负载均衡【upstream】

上面的反向代理中，我们通过proxy_pass来指定Tomcat的地址，很显然我们只能指定一台Tomcat地址，那么我们如果想指定多台来达到负载均衡呢？

第一，通过upstream来定义一组Tomcat，并指定负载策略（IPHASH、加权论调、最少连接），健康检查策略（Nginx可以监控这一组Tomcat的状态）等。

第二，将proxy_pass替换成upstream指定的值即可。

```
worker_processes 1;

events {

worker_connections 1024;

}

http {

    server {

        listen:8080;

        upstream firstdemo {

            ip_hash;

            server 39.106.145.33;

            server 47.93.6.93;

        }

        location / {

            proxy_pass http://firstdemo;

        }

}

}
```

ip_hash的作用是如果第一次访问该服务器后就记录，之后再访问都是该服务器了，这样比如第一次访问是33服务器，那之后再访问也会分配为33服务器访问了