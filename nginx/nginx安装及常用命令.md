## nginx安装

安装nginx

1. 进入homebrew官网，下载homebrew
2. `brew install nginx` 安装nginx
3. `nginx -v `显示版本号

进入nginx

​	`cd /usr/local/etc/nginx`

## nginx常用命令

1. 启动nginx
   - `nginx`
   - 访问localhost:8080(默认)

​	<img src=".\nginx安装及常用命令.assets\image-20200227144846296.png" alt="image-20200227144846296" style="zoom:33%;" />

2. 关闭nginx

   - `nginx -s stop`

3. 重启nginx

   - `nginx -s reload`
   - 每次修改完nginx.conf都需要重启

4. 检查配置

   - `nginx -t`

   - ![image-20200227145325265](.\nginx安装及常用命令.assets\image-20200227145054657.png)

     输入命令后出现这个表示配置正确
## 查看端口占用情况
- `sudo lsof -i:(端口号)` 如下图：

  <img src=".\nginx安装及常用命令.assets\image-20200227145649587.png" alt="image-20200227145649587" style="zoom:50%;" />

- `sudo kill (PID)`杀死进程
