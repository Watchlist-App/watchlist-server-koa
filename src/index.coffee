koa = require 'koa'
logger = require 'koa-logger'
router = require 'koa-router'
mongoose = require 'mongoose'
User = require './User'

app = koa()


app.use logger()
app.use router app

app.get '/user', (next) ->*
  users = yield User.find({}).exec()
  @body = users

app.get '/user/:id', (next) ->*
  user = yield User.findOne({_id: @params.id}).exec()
  @body = user

app.listen 3000
