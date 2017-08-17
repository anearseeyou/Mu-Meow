var utils = require('./utils');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';
var pxtorem = require('postcss-pxtorem');

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction
            ? config.build.productionSourceMap
            : config.dev.cssSourceMap,
        extract: isProduction
    }),
    postcss: [
        require('autoprefixer')({
            browsers: ['last 2 versions']
        }),
        pxtorem({
            rootValue: 75,
            propWhiteList: []
        })
    ],
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
