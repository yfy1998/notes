## webpack实现dll拆包

### 拆包与效果

所谓拆包，指将第三方依赖的包（如react、react-dom等）从打包后的main.js中拆分出来，减少main.js的体积，此时main.js只包含项目的逻辑代码，第三方依赖的包会经过dll压缩出一个js，在index.html中引入即可

效果：

查看效果需要勾选Disable cache,避免缓存对结果的影响

![image-20200227172448495](.\webpack实现dll拆包.assets\image-20200227172448495.png)

拆包前：

![image-20200227172613756](.\webpack实现dll拆包.assets\image-20200227172613756.png)

main.js **5.9MB**

拆包后：

![image-20200227173641244](.\webpack实现dll拆包.assets\image-20200227173641244.png)

main.chunk.js **1.1MB** + vendors.dll.js **600KB** 

体积明显减少

### 实现

1. 创建webpack.dll.js文件

   ```javascript
   const path = require('path')
   const webpack = require('webpack')
   module.exports = {
     mode: 'production',
     entry: {
       vendors: ['react', 'react-dom', 'moment', 'axios', 'mobx', 'mobx-react', 'js-cookie', 'react-router-dom']
     },
     output: {
       filename: '[name].dll.js',
       path: path.resolve(__dirname, '../dll'),
       library: '[name]'
     },
     plugins: [
       new webpack.DllPlugin({
         name: '[name]',
         path: path.resolve(__dirname, '../dll/[name].manifest.json')
       })
     ]
   }
   ```

   entry中的ventors指定需要拆分的第三方依赖的包名

   利用webpack.DllPlugin插件拆包到path指定的路径中

2. 运行webpack文件

   命令：`webpack --progress --profile --colors --config ./build/webpack.dll.js`

   得到dll文件：

   <img src=".\webpack实现dll拆包.assets\image-20200227175419848.png" alt="image-20200227175419848" style="zoom:33%;" />

3. dll中的js文件在index.html中用<scrpit>标签引用

4. dll中的json文件在生产环境的webpack配置中引用

   ```javascript
     plugins: [
       new webpack.DllReferencePlugin({
         manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
       })
     ]
   ```

   output中加入chunkFilename

   ![image-20200227181648639](.\webpack实现dll拆包.assets\image-20200227181648639.png)

