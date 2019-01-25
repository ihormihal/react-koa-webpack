"use strict"
const pkg = require('./package.json')
const CONFIG = pkg.config.mock

// const http = require('http')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
// const staticServer = require('koa-static-server')

const responseHandler = require('./mock/middlewares/responseHandler')
const errorHandler = require('./mock/middlewares/errorHandler')
const reactRouter = require('./mock/middlewares/reactRouter')
const router = require('./mock/routes')

const app = new Koa()

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

// app.use(staticServer({rootDir: 'dist', rootPath: '/' }))
// const server = http.createServer(app.callback())
// server.listen(3003)
app.listen(CONFIG.PORT)

