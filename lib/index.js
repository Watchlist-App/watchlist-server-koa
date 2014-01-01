(function() {
  var amazon, api, app, cors, koa, logger, mongoUrl, router, schema;

  koa = require('koa');

  logger = require('koa-logger');

  router = require('koa-router');

  cors = require('koa-cors');

  amazon = require('./amazon');

  schema = require('./schema');

  api = require('koa-mongo-rest');

  mongoUrl = process.env.MONGOLAB_URL;

  app = koa();

  app.use(logger());

  app.use(cors());

  app.use(router(app));

  api(app, schema, mongoUrl);

  app.get('/amazon/:index', function*(next) {
    var dvds, error;
    try {
      dvds = yield amazon.itemSearch({
        keywords: this.request.query.title,
        searchIndex: this.params.index
      });
      return this.body = dvds;
    } catch (_error) {
      error = _error;
      return this.body = error;
    }
  });

  app.listen(process.env.PORT || 5000);

}).call(this);
