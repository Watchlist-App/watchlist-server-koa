(function() {
  var User, app, koa, logger, router;

  koa = require('koa');

  logger = require('koa-logger');

  router = require('koa-router');

  router = require('koa-cors');

  User = require('./User');

  app = koa();

  app.use(logger());

  app.use(router(app));

  app.use(cors());

  app.get('/user', function*(next) {
    var users;
    users = yield User.find({}).exec();
    return this.body = users;
  });

  app.get('/user/:id', function*(next) {
    var user;
    user = yield User.findOne({
      _id: this.params.id
    }).exec();
    return this.body = user;
  });

  app.listen(process.env.PORT || 5000);

}).call(this);
