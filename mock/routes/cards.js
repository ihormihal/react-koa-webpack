const cardDetails = require('./../fixtures/card-details.json')
const cardHistory = require('./../fixtures/card-history.json')

exports.getDetails = async (ctx) => {
    ctx.res.ok(cardDetails)
}
exports.getHistory = async (ctx) => {
    ctx.res.ok(cardHistory)
}