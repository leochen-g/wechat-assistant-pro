import {startPadLocal} from "./padlocal.js";
import {startOffice} from "./office.js";
import {startWorker} from "./worker.js";
import {startWechat4u} from "./wechat4u.js";
import {startWhatsApp} from "./whatsapp.js";

/**
 * 必填项
 * @type {string}
 */

let apiKey = '' // 微秘书平台 apiKey
let apiSecret = '' // 微秘书平台 apiSecret


/**
 * 选填项，根据自己想要使用的协议使用
 * @type {string}
 */

// 如果申请了padLocal的token,可以直接填入
let padLocalToken = ''

// 如果申请了企业微信的token 可以直接填入
let workProToken = ''

// 如果使用公众号 协议，需要填入以下参数

let appId = '' // 公众号 appid
let appSecret = '' // 公众号 appsecret
let appToken = '' //  公众号加密token
let personalMode = 0 // 是否是个人号或者没有认证 如果是 改为 1
let outPort = 8077 // 对外暴露的端口号

// 如果使用 whatsapp 协议
let isWhatsApp = 0 // 启用 WhatsApp，把此项改为 true

if (process.env['PAD_LOCAL_TOKEN'] || padLocalToken) {
    console.log('读取到padLocal token')
    startPadLocal({apiKey, apiSecret, token: padLocalToken || process.env['PAD_LOCAL_TOKEN']})
} else if (process.env['WORK_PRO_TOKEN'] || workProToken) {
    console.log('读取到企微token')
    startWorker({apiKey, apiSecret, token: workProToken || process.env['WORK_PRO_TOKEN']})
} else if (process.env['AIBOTK_APP_ID'] || appId) {
    console.log('读取到公众号 appId')
    startOffice({
        apiKey,
        apiSecret,
        appId: process.env['AIBOTK_APP_ID'] || appId,
        appSecret: process.env['AIBOTK_APP_SECRET'] || appSecret,
        appToken: process.env['AIBOTK_APP_TOKEN'] || appToken,
        personalMode: process.env['AIBOTK_PERSONAL_MOD'] ? parseInt(process.env['AIBOTK_PERSONAL_MOD']) : personalMode,
        port: process.env['AIBOTK_OUT_PORT'] || outPort
    })
} else if (process.env['AIBOTK_IS_WHATSAPP'] ? parseInt(process.env['AIBOTK_IS_WHATSAPP']) : isWhatsApp) {
    console.log('读取到启动 WhatsApp的设置')
    startWhatsApp({apiKey, apiSecret})
} else {
    startWechat4u({apiKey, apiSecret})
}
