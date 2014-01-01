koa = require 'koa'
logger = require 'koa-logger'
router = require 'koa-router'
cors = require 'koa-cors'
amazon = require './amazon'
schema = require './schema'
api = require 'koa-mongo-rest'

mongoUrl = process.env.MONGOLAB_URL

app = koa()

app.use logger()
app.use cors()
app.use router app
api app, schema, mongoUrl

app.get '/amazon/:index', (next) ->*
  try
    dvds = yield amazon.itemSearch
      keywords: @request.query.title
      searchIndex: @params.index
    @body = dvds
  catch error
    @body = error

app.listen process.env.PORT || 5000
