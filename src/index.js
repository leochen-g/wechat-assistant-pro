const { WechatyBuilder } = require('wechaty')
const WechatyWebPanelPlugin = require('wechaty-web-panel');

const name = 'wechat-assistant-pro';
let bot = '';


console.log('默认使用web版微信协议，如无法登录，请检测自己的微信是否能登陆网页版协议，如需ipad协议登录，请查看https://github.com/leochen-g/wechat-assistant-pro-ipad')
bot = WechatyBuilder.build({
    name, // generate xxxx.memory-card.json and save login data for the next login
    puppet: 'wechaty-puppet-wechat',
});


bot.use(
        WechatyWebPanelPlugin({
            apiKey: 'e05752bb8ec1038e221a63bd35165cdec8177d3a',
            apiSecret: 'd20f55ca1fc8b88f32313353ed8fcdc15fb7a279',
        })
    )
bot.start()
    .catch((e) => console.error(e));

