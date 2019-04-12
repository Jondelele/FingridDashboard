// app.js Käynnistää serverin ja ottaa expressin käyttöön lukemalla sen muuttujaan app
// 
const config = require('./config');
const api = require('./routes/api');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const path = require("path")

const request = require('request');
var express = require('express');

var app = express();

var livereload = require('easy-livereload');
var file_type_map = {
  jade: 'html', // `index.jade` maps to `index.html`
  html: 'html',
  js: 'js',
  styl: 'css', // `styles/site.styl` maps to `styles/site.css`
  scss: 'css', // `styles/site.scss` maps to `styles/site.css`
  sass: 'css', // `styles/site.scss` maps to `styles/site.css`
  less: 'css' // `styles/site.scss` maps to `styles/site.css`
  // add the file type being edited and what you want it to be mapped to.
};

// store the generated regex of the object keys
var file_type_regex = new RegExp('\\.(' + Object.keys(file_type_map).join('|') + ')$');

app.use(livereload({
  watchDirs: [
    path.join(__dirname, 'public'),
  ],
  checkFunc: function(file) {
    return file_type_regex.test(file);
  },
  renameFunc: function(file) {
    // remap extention of the file path to one of the extentions in `file_type_map`
    return file.replace(file_type_regex, function(extention) {
      return '.' + file_type_map[extention.slice(1)];
    });
  },
  port: process.env.LIVERELOAD_PORT || 35729
}));


// Use ottaa middlewaren käyttöön.
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// Pitaa olla ennen api:a koska muuten ei näy sinne
app.use(cookieParser())
app.use(api);



app.listen(config.httpPort, function () {
  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 8000;
  }
  app.listen(port);
  console.log('Example app listening on port ' + config.httpPort);
});