const { WechatyBuilder } = require('wechaty')
const WechatyWebPanelPlugin = require('wechaty-web-panel');

const name = 'wechat-assistant-pro';
let bot = '';


console.log('默认使用web版微信协议，如无法登录，请检测自己的微信是否能登陆网页版协议')
bot = WechatyBuilder.build({
    name, // generate xxxx.memory-card.json and save login data for the next login
    puppet: 'wechaty-puppet-wechat',
});


bot.use(
        WechatyWebPanelPlugin({
            apiKey: '智能微秘书平台的apiKey',
            apiSecret: '智能微秘书平台的apiSecret',
        })
    )
bot.start()
    .catch((e) => console.error(e));

