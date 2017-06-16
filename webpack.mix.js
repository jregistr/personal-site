const mix = require('laravel-mix');
const glob = require('glob');

mix.disableNotifications();
mix.options({ processCssUrls: false, publicPath : './public' });

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

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery', 'bootstrap-sass']
});

mix.copy('node_modules/bootstrap-sass/assets/fonts', './public/fonts');

glob.sync('./src/sass/*.sass').forEach(function (fn) {
    mix.sass(fn, './stylesheets');
});

mix.js('./src/common.js', './javascripts/common.js');
mix.js('./src/ts/main.ts', './javascripts/main.js');

mix.extract([
    'jquery',
    'bootstrap-sass'
], './public/javascripts/common-vendors.js');