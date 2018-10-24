const Router = require('koa-router')
const cards = require('./cards')
const countries = require('./countries')
const config = require('./../../config.json')[process.env.NODE_ENV]

const router = new Router()
router.get('/api/card/:id', cards.getDetails)
router.get('/api/card/:id/history', cards.getHistory)

router.get('/api/countries', countries.search)
router.get('/api/country/:id', countries.get)

module.exports = router