koa = require 'koa'
logger = require 'koa-logger'
app = module.exports = koa()

app.use logger()

app.use ->*
  @body = 'Hello World'

app.listen 3000
