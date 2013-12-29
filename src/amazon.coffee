amazonProductApi = require 'amazon-product-api'

awsTag = process.env.AWS_TAG
awsId = process.env.AWS_ID
awsSecret = process.env.AWS_SECRET

client = amazonProductApi.createClient
  awsTag: awsTag
  awsId: awsId
  awsSecret: awsSecret

module.exports = client
