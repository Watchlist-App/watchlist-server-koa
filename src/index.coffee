koa = require 'koa'
logger = require 'koa-logger'
router = require 'koa-router'
cors = require 'koa-cors'
User = require './User'
amazon = require './amazon'

app = koa()

app.use logger()
app.use router app
app.use cors()

app.get '/user', (next) ->*
  users = yield User.find({}).exec()
  @body = users

app.get '/user/:id', (next) ->*
  user = yield User.findOne({_id: @params.id}).exec()
  @body = user

app.get '/amazon/:title', (next) ->*
  try
    dvds = yield amazon.itemSearch
      keywords: @params.title
      searchIndex: 'DVD'
    @body = dvds
  catch error
    @body = error

app.listen process.env.PORT || 5000
