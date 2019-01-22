"use strict"
const env = process.env.NODE_ENV || 'production'

const http = require('http')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const staticServer = require('koa-static-server')

// const webpack = require('webpack')
// const koaWebpack = require('koa-webpack')
// const webpackConfig = require('./webpack.config')

const responseHandler = require('./mock/middlewares/responseHandler')
const errorHandler = require('./mock/middlewares/errorHandler')
const reactRouter = require('./mock/middlewares/reactRouter')
const router = require('./mock/routes')


async function setup () {
  const app = new Koa()
  // const compiler = webpack(webpackConfig)
  // const webpackMiddleware = await koaWebpack(compiler)

  // app.use(webpackMiddleware)

  app.use(
    bodyParser({
      enableTypes: ['json', 'form'],
      formLimit: '10mb',
      jsonLimit: '10mb'
    })
  )
  
  app.use(reactRouter())
  app.use(responseHandler())
  app.use(errorHandler())
  app.use(router.routes())
  app.use(router.allowedMethods())

  app.use(staticServer({rootDir: 'dist', rootPath: '/' }))

  const server = http.createServer(app.callback())
  server.listen(3003)
  // app.listen(3003)

}


setup()