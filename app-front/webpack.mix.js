//noinspection JSAnnotator
const {mix} = require('laravel-mix');
//noinspection JSAnnotator
const {glob} = require('glob');
const Clean = require('clean-webpack-plugin');

mix.disableNotifications();
mix.options({ publicPath : '../public' });

mix.webpackConfig({
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
});

mix.webpackConfig({
    plugins: [
        new Clean([
            './mix.js',
            './mix-manifest.json',
            '../public/javascripts',
            '../public/stylesheets'
        ], {verbose: false})
    ]
});

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery']
});

glob.sync('./src/sass/*.sass').forEach(function (fn) {
    mix.sass(fn, '../public/stylesheets');
});

mix.js('./src/ts/main.ts', '../public/javascripts/main.js');

mix.extract([
    'jquery',
    'bootstrap-sass'
], '../public/javascripts/common-vendors.js');