/**
 * Created by yanghuan on 17/9/3.
 */

module.exports = {
    entry: ['babel-polyfill', './18.js'],

    output: {
        filename: 'bundle.js',
        publicPath: ''
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
}
