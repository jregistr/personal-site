var del = require('delete');

const cleanPaths = [
    '../public/mix.js',
    '../public/mix-manifest.json',
    '../public/stylesheets',
    '../public/javascripts',
    '../public/fonts',
    '../public/cool.txt'
];

del(cleanPaths, {force: true}, function (err, deleted) {
    console.log(deleted);
});