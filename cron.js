require('dotenv').config()
const cron = require('node-cron')
const scraping = require('./src/services/scraping')

const cronRunTime = process.env.CRON_RUN_TIME || '*/15 * * * * *'

cron.schedule(cronRunTime, async () => {
  scraping.getCodeData()
})
