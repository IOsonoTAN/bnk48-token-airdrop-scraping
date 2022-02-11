const debug = require('debug')('app:services:line')
const axios = require('axios').default

const config = {
  groupId: process.env.LINE_GROUP_ID,
  accessToken: process.env.LINE_ACCESS_TOKEN,
}

const getBotInfo = async () => {
  return await axios
    .get('https://api.line.me/v2/bot/info',
    {
      headers: {
        authorization: `Bearer ${config.accessToken}`
      }
    })
    .then(response => response.data)
}

const pushMessage = async (messages = []) => {
  debug('push_message: %o', messages)
  return await axios
    .post('https://api.line.me/v2/bot/message/push', {
      to: config.groupId,
      messages,
    }, {
      headers: {
        authorization: `Bearer ${config.accessToken}`
      }
    })
    .then(response => response.data)
}

module.exports = {
  getBotInfo,
  pushMessage
}