const common = require('../common/index');

/**
 * 准备好的事件
 */
async function onReady (){
    console.log(`所有数据准备完毕`)
    common.updateContactInfo(this)
}

module.exports = onReady