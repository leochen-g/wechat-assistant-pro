const {sendError} = require('../proxy/aibotk')

async function onError(error) {
    console.log('错误', error)
    await sendError(error.message.replace(/\ +/g, '').replace(/[\r\n]/g, '').replace('Error:type(){returnthis._type;}', ''))
}

module.exports = onError
