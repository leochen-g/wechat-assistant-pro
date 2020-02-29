const Qrterminal = require('qrcode-terminal')
const {throttle} =require('../lib/index')
const {setQrCode} = require('../proxy/aibotk')

/**
 * 扫描登录，显示二维码
 */
async function onScan(qrcode, status) {
    Qrterminal.generate(qrcode)
    console.log('扫描状态', status)
    throttle(setQrCode(qrcode,status), 30000)
    const qrImgUrl = ['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode)].join('')
    console.log(qrImgUrl)
}

module.exports = onScan
