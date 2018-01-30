---
先安装 nodejs

# debian安装
apt-get install nodejs npm

# 新建工程
mkdir webpacktest

cd webpacktest

npm init

一堆的问题回答

# 在工程添加webpack 依赖

npm install webpack --save-dev
npm i -D webpack
> 在Windows下正常,在debian下显示有文件找不到,正常情况会在package.json文件中留下一行开发依赖
> 这样只安装在工程中 

npm -g i webpack 在计算机范围内安装

npm view webpack versions --json

> 列出可用版本号

npm v webpack versions 

> 查版本号

npm i -D webpack@2.2.0

> 指定版本号的安装方式

# 使用webpack

在windows PATH环境变量中添加:
C:\Users\lpz\webpacktest\node_modules\.bin;
保证webpack能被调用到

```
webpack ./src/app.js ./dist/app.bundle.js  -p --watch
```
p参数压缩生成的app.bundle.js文件
watch 监控 app.js的变化

# webpack 配置文件webpack.config.js
webpack.config.js
```
module.exports = {
	entry: './src/app.js',
	output:{
		filename:'./dist/app.bundle.js'
	}
}
```

package.json
```
  "scripts": {
  在scripts标签中添加启动脚本
    "dev":"webpack -d --watch",
    "pro":"webpack -p --watch"
  },
  ```

npm run dev 启动项目自动监控
npm run pro 生产模式启动

# webpack 插件安装

npm i html-webpack-plugin --save-dev

webpack.config.js
```
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	/*output:{
		filename:'./dist/app.bundle.js'
	},*/
	output:{
		path: 'dist',
		filename:'app.bundle.js'
	},
	plugins:[new HtmlWebpackPlugin({
		title: '网页模版2',
		minify:{
			collapseWhitespace: true // 折叠生成的html代码
		},
		hash:true, // 生成js版本编号
		//template:'src/index.ejs' //ejs
		template:'src/index.html' //ejs
		})
	]
}
```
自动在dist文件夹中生成 index.html文件

```
src\index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  	<p>你好</p>
  </body>
</html>
```

# 使用css-loader

npm install css-loader --save-dev
npm install style-loader --save-dev

```
app.css

body{
	background-color: pink;
}
```

```
webpack.config.js
module:{
		rules:[
			//{test: /\.css$/,use:['style-loader','css-loader']} //指定文件后缀用style-loader,css-loader ,
			{test: /\.css$/,loaders:'style-loader!css-loader'} //指定文件后缀用style-loader!css-loader
			
		]
	},
```
	
```
app.js
const css = require('./app.css'); // 要包含的css文件
```


npm install sass-loader node-sass --save-dev

```
app.scss
body{
	background-color: black;
	p{
		color: red;
	}
}
```

```
webpack.config.js
{test: /\.scss$/,use:['style-loader','css-loader','sass-loader']} //指定文件后缀用css-loader
```

```
app.js
// const css = require('./app.css'); // 要包含的css文件
const css = require('./app.scss'); 
```


#  把生成的文本保存在一个文件中

npm install extract-text-webpack-plugin --save-dev

```
webpack.config.js
var ExtractTextPlugin = require("extract-text-webpack-plugin");
 {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: ['css-loader', 'sass-loader']/*,
                    publicPath: '/dist'*/
                })
                
                这里不能再用style-loader
                
                
                plugins: [
        new HtmlWebpackPlugin({
            title: '网页模版2',
            minify: {
                collapseWhitespace: true // 折叠生成的html代码
            },
            hash: true, // 生成js版本编号
            //template:'src/index.ejs' //ejs
            template: 'src/index.html' //html
        }),
        new ExtractTextPlugin(
           /* filename: */'app.css'/*,
            disabled: false,
            allChunks: true*/
        )
    ]
```

# webpack-dev-server

npm i webpack-dev-server@2.2.0 --save-dev

```
package.json
  "scripts": {
    "dev": "webpack-dev-server",
    "pro": "webpack -p --watch"
  },
```

网页内容改变浏览器自动刷新
webpack-dev-server 把网页数据加载到内存，快

module:
...
devServer:{
    	contentBase:path.join(__dirname,"dist"),
    	compress:true,// gzip网页压缩方法
    	port:3000,
    	stats:"errors-only",//只显示错误
    	open:true // 自动打开一个浏览器窗口
},
plugins:
...


# 安装 react babel

npm i -D react react-dom
babel 用于支持es6 JS语法
npm i -D babel babel-preset-react babel-preset-es2015

```
.babelrc
{
	"presets":["es2015","react"]
}
```

```
app.js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
	<h1>Hello ,World!</h1>,
	document.getElementById('root')
);
```

```
index.html
<div id="root"></div>
```


用于处理js文件
npm i -D babel-loader babel-core

```
webpack.config.js
{
	test: /\.js$/,
	exclude: /node_module/,
	use: 'babel-loader'
}
```


# 指定index.html生成位置

```
new HtmlWebpackPlugin({
            title: '网页模版2',
            minify: {
                collapseWhitespace: true // 折叠生成的html代码
            },
            hash: true, // 生成js版本编号
            filename: './../index.html', // 指定index.html生成位置
            //template:'src/index.ejs' //ejs
            template: 'src/index.html' //html
        }),
```

npm run pro 这样运行才会生成文件


npm i -D rimraf
```
package.json
删除 dist所有文件
"pro": "npm run clean && webpack -p --watch",
"clean": "rimraf ./dist/*"
```

# 多模版
```
webpack.config.js
new HtmlWebpackPlugin({
            title: '联系人模版2',
            minify: {
                collapseWhitespace: true // 折叠生成的html代码
            },
            hash: true, // 生成js版本编号
            filename: 'contact.html', // 指定生成的文件名
            template: 'src/contact.html' //html
        }),
```
http://localhost:3000/contact.html
访问正常

```
contact.js
console.log('联系');
```

```
webpack.config.js
// entry: './src/app.js',
entry: {
	app:'./src/app.js',
	contact:'./src/contact.js'
},

output: {
    // path: 'C:/Users/lpz/webpacktest/dist/',
    path: path.resolve(__dirname, './dist'),
    // filename: 'app.bundle.js'
    filename: '[name].bundle.js'
},
定义两个网页模版
```

```
 new HtmlWebpackPlugin({
            title: '网页模版2',
            minify: {
                collapseWhitespace: true // 折叠生成的html代码
            },
            hash: true, // 生成js版本编号
            excludeChunks:['contact'],//不运行contact.js
            // filename: './../index.html',
            //template:'src/index.ejs' //ejs
            template: 'src/index.html' //html
        }),
        new HtmlWebpackPlugin({
            title: '联系人模版2',
            minify: {
                collapseWhitespace: true // 折叠生成的html代码
            },
            hash: true, // 生成js版本编号
            chunks: ['contact'],//运行contact.js
            filename: 'contact.html', // 指定生成的文件名
            template: 'src/contact.html' //html
        }),
```


# pug 模版引擎

npm i -D pug pug-html-loader
npm i -D html-loader

```
index.pug
doctype html
html(lang="en")
	head
		title= pageTitle
		script(type='text/javascript').
			if(foo) bar(1+5)
	body
	    include includes/header.pug
		h1 Pug - node template engine
		#container.col
			if youAreUsingPug
				p You are amazing
			else
				p Get on it!
			p.
				Pug is a terse and simple templating.
```

```
includes/header.pug
h1 hi from the include file
```
```
webpack.config.js
{
	test: /\.pug$/,
	use: ['html-loader','pug-html-loader']
}

new HtmlWebpackPlugin({
    title: '网页模版2',
    minify: {
        collapseWhitespace: true // 折叠生成的html代码
    },
    hash: true, // 生成js版本编号
    excludeChunks:['contact'],
    // filename: './../index.html',
    //template:'src/index.ejs' //ejs
    template: 'src/index.pug' //pug
}),


```

# 热加载CSS模块
```
webpack.config.js
plugins: [
...
new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        
        使用这个注意要停用extract-text-webpack-plugin
```

# 同时打开热加载和extract-text-webpack-plugin

# 在webpack中加载图片
npm i -D file-loader

