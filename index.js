require('dotenv').config()
const debug = require('debug')('server')
const buildApp = require('./src/app')

const app = buildApp()

const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', () => {
  debug('app is listening on %d', port)
})