
安装:
npm install 即可
使用
nodemon index.js
锋子
2015年8月22日 08:28:17

##升级记录:
2015年8月22日 06:57:05
用node index.js或nodemon index.js启动
然后访问:127.0.0.1:10086即可

2015年8月22日 07:50:42
把ejs模板改成jqtpl模板渲染,提高可读性.

2015年8月22日 08:19:09
加入布局文件layout.html

引入新模块
npm install crypto --save

node -v
6.2

2016年12月9日 15:01:08
后端渲染
http://127.0.0.1:10086/test/index
对应控制器
controller/test.js中的index方法

2016年12月9日 15:11:59
目前网页部分的数据只走ajax,不是直接调用数据库的,
所以,可以直接打包成离线apk包,以客户端形式安装在手机上吆.

