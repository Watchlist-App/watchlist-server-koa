koa = require 'koa'
logger = require 'koa-logger'
router = require 'koa-router'
cors = require 'koa-cors'
User = require './User'
amazon = require './amazon'

app = koa()

app.use logger()
app.use cors()
app.use router app

app.get '/user', (next) ->*
  users = yield User.find(@request.query).exec()
  @body = users

app.get '/user/:id', (next) ->*
  user = yield User.findOne({_id: @params.id}).exec()
  @body = user

app.get '/amazon/:index', (next) ->*
  try
    dvds = yield amazon.itemSearch
      keywords: @request.query.title
      searchIndex: @params.index
    @body = dvds
  catch error
    @body = error

app.listen process.env.PORT || 5000
