import { WechatyBuilder } from 'wechaty'
import { WechatyWebPanelPlugin } from 'wechaty-web-panel'
import { diceBot } from 'wechaty-dice-king'
import { WechatyFaceCartonPlugin } from 'wechaty-face-carton'


const name = 'wechat-assistant-pro';
let bot = '';
// 1、如果没有token请使用以下代码
bot = WechatyBuilder.build({
    name, // generate xxxx.memory-card.json and save login data for the next login
    puppetOptions: {
        uos: false
    },
    puppet: 'wechaty-puppet-wechat',
});

bot
    .use(
        WechatyWebPanelPlugin({
            apiKey: '',
            apiSecret: '',
            ignoreMessages: [
                {type: 'include', word: '{robotname}'},
                {type: 'include', word: '迷失'},
                {type: 'start', word: '.'},
                {type: 'start', word: '。'},
                {type: 'start', word: 'f'},
                {type: 'equal', word: '0'},
                {type: 'equal', word: '1'},
                {type: 'equal', word: '2'},
                {type: 'equal', word: '3'},
                {type: 'equal', word: '卡通'}]
        })
    )
bot.use(diceBot({quickModel: false}))
bot
    .use(
        WechatyFaceCartonPlugin({
            maxuser: 10, // 支持最多多少人进行对话，建议不要设置太多，否则占用内存会增加
            secretId: '', // 腾讯secretId
            secretKey: '', // 腾讯secretKey
            allowUser: [], // 允许哪些好友使用人像漫画化功能，为空[]代表所有人开启
            allowRoom: ['Wechaty卡通人像插件交流'], // 允许哪些群使用人像漫画化功能，为空[]代表不开启任何一个群
            quickModel: true, // 快速体验模式 默认关闭 开启后可直接生成二维码扫描体验，如果自己代码有登录逻辑可以不配置此项
            tipsword: '卡通', // 私聊发送消息，触发照片卡通化提示 如果直接发送图片，默认进入图片卡通化功能，不填则当用户初次发送文字消息时不做任何处理
        })
    )
bot.start()
    .catch((e) => console.error(e));
