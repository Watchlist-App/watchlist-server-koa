koa     = require 'koa'
logger  = require 'koa-logger'
router  = require 'koa-router'
cors    = require 'koa-cors'
request = require 'cogent'
amazon  = require './amazon'
schema  = require './schema'
utils   = require './utils'
api     = require 'koa-mongo-rest'

mongoUrl    = process.env.MONGOLAB_URL
tmdbApiKey  = process.env.TMDB_API_KEY
ebayAppName = process.env.EBAY_APP_NAME

app = koa()

app.use logger()
app.use cors()
app.use router app

#watchlist app REST api
api app, schema, mongoUrl

#amazon JSON wrapper
app.get '/amazon/:index', (next) ->*
  try
    dvds = yield amazon.itemSearch
      keywords      : @request.query.title
      searchIndex   : @params.index
      responseGroup : 'ItemAttributes,Offers,Images'
    @body = dvds
  catch error
    @body = error

#themoviedb proxy
app.get '/tmdb/*', (next) ->*
  try
    uri   = @request.url.replace /^\/tmdb/, 'http://api.themoviedb.org'
    uri   += if utils.isEmpty @request.query then '?api_key=' else '&api_key='
    uri   += tmdbApiKey
    resp  = yield* request uri, true
    @body = resp.body
  catch error
    @body     = error

#ebay proxy
app.get '/ebay', (next) ->*
  try
    uri   = @request.url.replace /^\/ebay/, 'http://svcs.ebay.com/services/search/FindingService/v1'
    uri  += '&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&SECURITY-APPNAME=' + ebayAppName
    resp  = yield* request uri, true
    @body = resp.body
  catch error
    @body     = error

app.listen process.env.PORT || 5000
