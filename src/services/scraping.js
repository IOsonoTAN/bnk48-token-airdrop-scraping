const debug = require('debug')('app:services:scraping')
const fs = require('fs')
const axios = require('axios').default
const { JSDOM } = require('jsdom')
const line = require('./line')

const defaultUrl = 'https://www.bnk48.com/bnktokenairdrop'
const cacheFile = './cache'

const getCodeTextInCacheFile = () => {
  return fs.readFileSync(cacheFile, 'utf8')
}

const saveCodeTextInCacheFile = (codeText) => {
  return fs.writeFileSync(cacheFile, codeText)
}

const validateCacheFile = () => {
  if (!fs.existsSync(cacheFile)) {
    return saveCodeTextInCacheFile('')
  }
  return true
}

const storeCodeTextInCache = (codeText) => {
  validateCacheFile()

  if (getCodeTextInCacheFile() !== codeText) {
    saveCodeTextInCacheFile(codeText)
    return true
  }
  return false
}

const getCodeData = async (url = defaultUrl) => {
  const code = await axios
    .get(`${url}?timestamp=${new Date().getTime()}`, {
      timeout: 2 * 1000
    })
    .then(response => {
      const dom = new JSDOM(response.data)
      return dom.window.document.querySelector("input#code-text").getAttribute('value')
    })
    .catch(error => {
      debug('error: %s', error.message)
      return null
    })

    if (!code) {
      return false
    }

  debug('code: %s', code)
  if (storeCodeTextInCache(code)) {
    debug('code_push_message: %s', code)
    await line.pushMessage([
      {
        type: "text",
        text: code
      }
    ])
  }
  return true
}

module.exports = {
  storeCodeTextInCache,
  getCodeData
}
