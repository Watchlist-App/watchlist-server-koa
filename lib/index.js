(function() {
  var amazon, api, app, cors, ebayAppName, koa, logger, mongoUrl, request, router, schema, tmdbApiKey, utils;

  koa = require('koa');

  logger = require('koa-logger');

  router = require('koa-router');

  cors = require('koa-cors');

  request = require('cogent');

  amazon = require('./amazon');

  schema = require('./schema');

  utils = require('./utils');

  api = require('koa-mongo-rest');

  mongoUrl = process.env.MONGOLAB_URL;

  tmdbApiKey = process.env.TMDB_API_KEY;

  ebayAppName = process.env.EBAY_APP_NAME;

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
        searchIndex: this.params.index,
        responseGroup: 'ItemAttributes,Offers,Images'
      });
      return this.body = dvds;
    } catch (_error) {
      error = _error;
      return this.body = error;
    }
  });

  app.get('/tmdb/*', function*(next) {
    var error, resp, uri;
    try {
      uri = this.request.url.replace(/^\/tmdb/, 'http://api.themoviedb.org');
      uri += utils.isEmpty(this.request.query) ? '?api_key=' : '&api_key=';
      uri += tmdbApiKey;
      resp = yield* request(uri, true);
      return this.body = resp.body;
    } catch (_error) {
      error = _error;
      return this.body = error;
    }
  });

  app.get('/ebay', function*(next) {
    var error, resp, uri;
    try {
      uri = this.request.url.replace(/^\/ebay/, 'http://svcs.ebay.com/services/search/FindingService/v1');
      uri += '&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&SECURITY-APPNAME=' + ebayAppName;
      resp = yield* request(uri, true);
      return this.body = resp.body;
    } catch (_error) {
      error = _error;
      return this.body = error;
    }
  });

  app.listen(process.env.PORT || 5000);

}).call(this);
