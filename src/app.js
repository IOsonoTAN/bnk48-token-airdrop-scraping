const debug = require('debug')('app')
const fastify = require('fastify')
require('./services/scraping')

const buildApp = (options = {}) => {
  const app = new fastify(options)

  app.get('/', async () => {
    return 'OK'
  })

  app.post('/line/webhook', (request) => {
    const { events } = request.body
    debug('events: %o', events)
    return 'OK'
  })

  return app
}

module.exports = buildApp