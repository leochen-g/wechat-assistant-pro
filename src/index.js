import {WechatyMessageRecordPlugin, WechatyWebPanelPlugin, WechatyMessageCallBackPlugin} from 'wechaty-web-panel'
import {startWorkpro} from "./workpro.js";
import {startPadlocal} from "./padlocal.js";
import {startWechat4u} from "./wechat4u.js";
import {startOffice} from "./office.js";
import {startMatrix} from "./matrix.js";

let bot = '';
let padLocalToken = '' // 如果申请了ipadlocal的token,可以直接填入
let matrixToken = '' // 如果申请了matrix的token,可以直接填入
let matrixBridgeId = '' // 代理id
let workProToken = '' // 如果申请了企业微信的token 可以直接填入

// 公众号相关配置
let officeAppId = '' // 公众号appId
let officeAppSecret = '公众号appSecret' // 公众号appSecret
let officeToken = '公众号加密token' // 公众号随机填写的加密token
let officePerson = '是否个人订阅号' // 是否是个人订阅号 如果是填写为true
let officePort = 8077 // 是否是个人订阅号 如果是填写为true

if (process.env['PAD_LOCAL_TOKEN']) {
    console.log('读取到环境变量中的ipadLocalToken')
    padLocalToken = process.env['PAD_LOCAL_TOKEN']
}

if (process.env['MATRIX_TOKEN']) {
    console.log('读取到环境变量中的ipad matrix token')
    matrixToken = process.env['MATRIX_TOKEN']
    matrixBridgeId = process.env['MATRIX_BRIDGE_ID']
}

if (process.env['WORK_PRO_TOKEN']) {
    console.log('读取到环境变量中的企微token')
    workProToken = process.env['WORK_PRO_TOKEN']
}

if (process.env['OFFICE_APPID']) {
    console.log('读取到环境变量的公众号appId')
    officeAppId = process.env['OFFICE_APPID']
    officeAppSecret = process.env['OFFICE_APPSECRET']
    officeToken = process.env['OFFICE_TOKEN']
    officePerson = !!(process.env['OFFICE_IS_PERSON'] && process.env['OFFICE_IS_PERSON'].toString() === 'true')
    officePort = process.env['OFFICE_PORT'] && parseInt(process.env['OFFICE_PORT']) || 8077
}

if (officeAppId) {
    bot = startOffice({
        appId: officeAppId,
        appSecret: officeAppSecret,
        appToken: officeToken,
        isPerson: officePerson,
        appPort: officePort
    })
} else if (padLocalToken) {
    bot = startPadlocal(padLocalToken)
}  else if (matrixToken) {
    bot = startMatrix(matrixToken, matrixBridgeId)
} else if(workProToken) {
    bot = startWorkpro(workProToken)
} else {
    bot = startWechat4u()
}


bot.use(WechatyWebPanelPlugin({
    apiKey: '填入微秘书平台apikey', apiSecret: '填入微秘书平台apisecret',
}))
bot.use(WechatyMessageRecordPlugin())
bot.use(WechatyMessageCallBackPlugin())
bot.start()
    .catch((e) => console.error(e));
