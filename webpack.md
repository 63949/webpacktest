---
�Ȱ�װ nodejs

# debian��װ
apt-get install nodejs npm

# �½�����
mkdir webpacktest

cd webpacktest

npm init

һ�ѵ�����ش�

# �ڹ������webpack ����

npm install webpack --save-dev
npm i -D webpack
> ��Windows������,��debian����ʾ���ļ��Ҳ���,�����������package.json�ļ�������һ�п�������
> ����ֻ��װ�ڹ����� 

npm -g i webpack �ڼ������Χ�ڰ�װ

npm view webpack versions --json

> �г����ð汾��

npm v webpack versions 

> ��汾��

npm i -D webpack@2.2.0

> ָ���汾�ŵİ�װ��ʽ

# ʹ��webpack

��windows PATH�������������:
C:\Users\lpz\webpacktest\node_modules\.bin;
��֤webpack�ܱ����õ�

```
webpack ./src/app.js ./dist/app.bundle.js  -p --watch
```
p����ѹ�����ɵ�app.bundle.js�ļ�
watch ��� app.js�ı仯

# webpack �����ļ�webpack.config.js
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
  ��scripts��ǩ����������ű�
    "dev":"webpack -d --watch",
    "pro":"webpack -p --watch"
  },
  ```

npm run dev ������Ŀ�Զ����
npm run pro ����ģʽ����

# webpack �����װ

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
		title: '��ҳģ��2',
		minify:{
			collapseWhitespace: true // �۵����ɵ�html����
		},
		hash:true, // ����js�汾���
		//template:'src/index.ejs' //ejs
		template:'src/index.html' //ejs
		})
	]
}
```
�Զ���dist�ļ��������� index.html�ļ�

```
src\index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  	<p>���</p>
  </body>
</html>
```

# ʹ��css-loader

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
			//{test: /\.css$/,use:['style-loader','css-loader']} //ָ���ļ���׺��style-loader,css-loader ,
			{test: /\.css$/,loaders:'style-loader!css-loader'} //ָ���ļ���׺��style-loader!css-loader
			
		]
	},
```
	
```
app.js
const css = require('./app.css'); // Ҫ������css�ļ�
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
{test: /\.scss$/,use:['style-loader','css-loader','sass-loader']} //ָ���ļ���׺��css-loader
```

```
app.js
// const css = require('./app.css'); // Ҫ������css�ļ�
const css = require('./app.scss'); 
```


#  �����ɵ��ı�������һ���ļ���

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
                
                ���ﲻ������style-loader
                
                
                plugins: [
        new HtmlWebpackPlugin({
            title: '��ҳģ��2',
            minify: {
                collapseWhitespace: true // �۵����ɵ�html����
            },
            hash: true, // ����js�汾���
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

��ҳ���ݸı�������Զ�ˢ��
webpack-dev-server ����ҳ���ݼ��ص��ڴ棬��

module:
...
devServer:{
    	contentBase:path.join(__dirname,"dist"),
    	compress:true,// gzip��ҳѹ������
    	port:3000,
    	stats:"errors-only",//ֻ��ʾ����
    	open:true // �Զ���һ�����������
},
plugins:
...


# ��װ react babel

npm i -D react react-dom
babel ����֧��es6 JS�﷨
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


���ڴ���js�ļ�
npm i -D babel-loader babel-core

```
webpack.config.js
{
	test: /\.js$/,
	exclude: /node_module/,
	use: 'babel-loader'
}
```


# ָ��index.html����λ��

```
new HtmlWebpackPlugin({
            title: '��ҳģ��2',
            minify: {
                collapseWhitespace: true // �۵����ɵ�html����
            },
            hash: true, // ����js�汾���
            filename: './../index.html', // ָ��index.html����λ��
            //template:'src/index.ejs' //ejs
            template: 'src/index.html' //html
        }),
```

npm run pro �������вŻ������ļ�


npm i -D rimraf
```
package.json
ɾ�� dist�����ļ�
"pro": "npm run clean && webpack -p --watch",
"clean": "rimraf ./dist/*"
```

# ��ģ��
```
webpack.config.js
new HtmlWebpackPlugin({
            title: '��ϵ��ģ��2',
            minify: {
                collapseWhitespace: true // �۵����ɵ�html����
            },
            hash: true, // ����js�汾���
            filename: 'contact.html', // ָ�����ɵ��ļ���
            template: 'src/contact.html' //html
        }),
```
http://localhost:3000/contact.html
��������

```
contact.js
console.log('��ϵ');
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
����������ҳģ��
```

```
 new HtmlWebpackPlugin({
            title: '��ҳģ��2',
            minify: {
                collapseWhitespace: true // �۵����ɵ�html����
            },
            hash: true, // ����js�汾���
            excludeChunks:['contact'],//������contact.js
            // filename: './../index.html',
            //template:'src/index.ejs' //ejs
            template: 'src/index.html' //html
        }),
        new HtmlWebpackPlugin({
            title: '��ϵ��ģ��2',
            minify: {
                collapseWhitespace: true // �۵����ɵ�html����
            },
            hash: true, // ����js�汾���
            chunks: ['contact'],//����contact.js
            filename: 'contact.html', // ָ�����ɵ��ļ���
            template: 'src/contact.html' //html
        }),
```


# pug ģ������

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
    title: '��ҳģ��2',
    minify: {
        collapseWhitespace: true // �۵����ɵ�html����
    },
    hash: true, // ����js�汾���
    excludeChunks:['contact'],
    // filename: './../index.html',
    //template:'src/index.ejs' //ejs
    template: 'src/index.pug' //pug
}),


```

# �ȼ���CSSģ��
```
webpack.config.js
plugins: [
...
new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        
        ʹ�����ע��Ҫͣ��extract-text-webpack-plugin
```

# ͬʱ���ȼ��غ�extract-text-webpack-plugin

# ��webpack�м���ͼƬ
npm i -D file-loader

