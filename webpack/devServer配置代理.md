## devServer配置代理

webpack中dev-server配置中的proxy可以实现代理

dev-server使用了非常强大的http-proxy-middleware包，更多详细用法可以参考[官方文档](https://github.com/chimurai/http-proxy-middleware#options)

下面是参考[webpack官方文档](https://webpack.docschina.org/configuration/dev-server/#devserver-proxy)的配置

启动webpack代理需要配置webpack.config.js文件

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
```

上面实现了请求/api/users会被代理到请求[http://localhost:3000/api/users](http://localhost:3000/api/users.)



如果不想始终传递/api，则可以重写路径：

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
};
```

请求到 /api/xxx 现在会被代理到请求 `http://localhost:3000/xxx`, 例如 /api/user 现在会被代理到请求 `http://localhost:3000/user`



默认情况下，不接受运行在HTTPS上，且使用了无效的后端服务器。如果你要接受，修改配置secure：false，如下：

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false
      }
    }
  }
};
```



有时你不想代理所有的请求。可以基于一个函数的返回值绕过代理。

在函数中你可以访问请求体、响应体和代理选项。必须返回 `false` 或路径，来跳过代理请求。

例如：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理。你可以这样做：

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        }
      }
    }
  }
};
```



跨域配置

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000',
      changeOrigin: true
    }
  }
};
```

