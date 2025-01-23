import {WechatyMessageRecordPlugin, WechatyWebPanelPlugin, WechatyMessageCallBackPlugin} from 'wechaty-web-panel'
import {startWorkpro} from "./workpro.js";
import {startPadlocal} from "./padlocal.js";
import {startWechat4u} from "./wechat4u.js";
import {startOffice} from "./office.js";
import {startMatrix} from "./matrix.js";

let bot = '';
let needWeb = ''; // 是否默认强制开启网页版协议登录
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

if(process.env['NEED_WEB']) {
    console.log('你已选择强制开启默认网页版协议登录，可能导致的封号结果自行负责！')
    needWeb = true
}
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
    if(needWeb) {
        bot = startWechat4u()
    }
    console.log('由于默认免费网页版协议，最近封号严重，基本登录必封！为了用户的账号安全，暂时不再提供默认免费版协议登录，可以加群联系购买获取稳定版个微协议或企微协议！')
}

if(bot) {
    bot.use(WechatyWebPanelPlugin({
        apiKey: '填入微秘书平台apikey', apiSecret: '填入微秘书平台apisecret',
    }))
    bot.use(WechatyMessageRecordPlugin())
    bot.use(WechatyMessageCallBackPlugin())
    bot.start()
        .catch((e) => console.error(e));
}

