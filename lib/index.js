(function() {
  var User, amazon, app, cors, koa, logger, router;

  koa = require('koa');

  logger = require('koa-logger');

  router = require('koa-router');

  cors = require('koa-cors');

  User = require('./User');

  amazon = require('./amazon');

  app = koa();

  app.use(logger());

  app.use(cors());

  app.use(router(app));

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

  app.get('/amazon/:title', function*(next) {
    var dvds, error;
    try {
      dvds = yield amazon.itemSearch({
        keywords: this.params.title,
        searchIndex: 'DVD'
      });
      return this.body = dvds;
    } catch (_error) {
      error = _error;
      return this.body = error;
    }
  });

  app.listen(process.env.PORT || 5000);

}).call(this);
