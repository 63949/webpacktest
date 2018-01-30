var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

var isProd = process.env.NODE_ENV=='production';
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback:'style-loader',
    loader:['css-loader','sass-loader'],
    publicPath: '/dist'
});

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    // entry: './src/app.js',
    entry: {
    	app:'./src/app.js',
    	contact:'./src/contact.js'
    },
    /*output:{
    	filename:'./dist/app.bundle.js'
    },*/
    output: {
        // path: 'C:/Users/lpz/webpacktest/dist/',
        path: path.resolve(__dirname, './dist'),
        // filename: 'app.bundle.js'
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            // {test: /\.scss$/,use:['style-loader','css-loader','sass-loader']}, //指定文件后缀用css-loader
            {
                test: /\.scss$/,
                use: cssConfig
            } ,
            //指定文件后缀用css-loader
            //{test: /\.scss$/,loaders:'style-loader!css-loader'} //指定文件后缀用css-loader
            {
            	test: /\.js$/,
            	exclude: /node_module/,
            	use: 'babel-loader'
            },
            {
            	test: /\.pug$/,
            	use: ['html-loader','pug-html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },
    devServer:{
    	contentBase:path.join(__dirname,"dist"),
    	compress:true,
    	port:3000,
    	hot:true,
    	stats:"errors-only",
    	open:true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '网页模版2',
            hash: true, // 生成js版本编号
            excludeChunks:['contact'],
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
            include: ['contact'],
            filename: 'contact.html', // 指定生成的文件名
            template: 'src/contact.html' //html
        }),
        new ExtractTextPlugin({
        	filename:'app.css',
        	disable:!isProd,
        	allChunks:true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

    ]
}