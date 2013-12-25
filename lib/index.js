(function() {
  var app, koa, logger;

  koa = require('koa');

  logger = require('koa-logger');

  app = module.exports = koa();

  app.use(logger());

  app.use(function*() {
    return this.body = 'Hello World';
  });

  app.listen(3000);

}).call(this);
