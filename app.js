var koa = require('koa');
var logger = require ('koa-logger');
var app = module.exports = koa();

app.use(logger());

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
