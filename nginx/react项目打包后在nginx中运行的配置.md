## react项目打包后在nginx中运行的配置

```
worker_processes 1;

events {

    worker_connections 1024;

}

http {

    server {
            listen 8090 default_server;
            listen [::]:8090 default_server;

            server_name localhost;

            location / {
                root html;
                index index.html index.htm;
                try_files $uri /index.html =404;
            }
			
			//以/api开头的请求代理到指定API服务器
            location ^~ /api {
                proxy_pass http://10.10.10.10:20000; //API接口服务器
            }
        }

}
```

try_files 按照顺序查找文件，如果找到就返回，否则进入下一个路径查找，最后=404兜底

$uri 表示当前location匹配到的完整路径

[try_files文档](http://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)