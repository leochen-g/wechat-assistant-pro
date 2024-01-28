import {WechatyBuilder} from 'wechaty'
import {WechatyWebPanelPlugin} from 'wechaty-web-panel'
import {startPadLocal} from "./padlocal.js";
import {startOffice} from "./office.js";
import {startWorker} from "./worker.js";
import {startEngine} from "./engine.js";
import {startWechat4u} from "./wechat4u.js";

const name = 'wechat-assistant-pro';

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

// 如果使用 windows engine 协议，需要填入以下参数

if (process.env['PAD_LOCAL_TOKEN'] || padLocalToken) {
    console.log('读取到padLocal token')
    startPadLocal({apiKey, apiSecret, token: padLocalToken || process.env['PAD_LOCAL_TOKEN']})
} else if (process.env['WORK_PRO_TOKEN'] || workProToken) {
    console.log('读取到企微token')
    startWorker({apiKey, apiSecret, token: workProToken || process.env['WORK_PRO_TOKEN']})
} else if (process.env['ENGINE']) {

} else {
    startWechat4u()
}
