const path=require('path');

module.exports = {  
    entry: './test.jsmymy',  //入口文件
    output: {  //输出文件路径设置
        path: path.resolve(__dirname, 'dist'),  
        filename: 'app.bundle.js',  
    },  
    module: {       //模块的相关配置
        rules: [     //根据文件的后缀提供一个loader,解析规则
            {
                test: /\.js$/,  //es6 => es5 
                exclude: /node_modules/, 
                // exclude:[], 不匹配选项（优先级高于test和include）
                use: 'babel-loader'
            }
        ]                  
    }
}  
