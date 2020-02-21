const {sendHeartBeat} = require('../proxy/aibotk')

async function onHeartBeat(str) {
    if (!str) {
        sendHeartBeat('dead')
    }
    if (str.type === 'scan') {
        sendHeartBeat('scan')
    }
}

module.exports = onHeartBeat
