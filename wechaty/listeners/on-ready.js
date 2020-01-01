const common = require('../common/index');
const {setQrCode, sendHeartBeat} = require('../proxy/aibotk')

/**
 * 准备好的事件
 */
async function onReady (){
    console.log(`所有数据准备完毕`)
    await setQrCode('', '3')
    await sendHeartBeat('live')
    // common.updateContactInfo(this)
}

module.exports = onReady
