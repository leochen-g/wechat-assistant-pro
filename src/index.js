import {WechatyBuilder} from 'wechaty'
import {WechatyWebPanelPlugin} from 'wechaty-web-panel'

const name = 'wechat-assistant-pro';
let bot = '';
let padLocalToken = '' // 如果申请了ipadlocal的token,可以直接填入

if (process.env['PAD_LOCAL_TOKEN']) {
    console.log('读取到环境变量中的ipadLocalToken')
    padLocalToken = process.env['PAD_LOCAL_TOKEN']
}

if (padLocalToken) {
    console.log('读取到环境变量中的ipad token 使用ipad协议启动')
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppetOptions: {
            token: padLocalToken
        }, puppet: 'wechaty-puppet-padlocal',
    });

} else {
    console.log('默认使用uos web协议启动')
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppetOptions: {
            uos: true
        }, puppet: 'wechaty-puppet-wechat',
    });
}


bot.use(WechatyWebPanelPlugin({
    apiKey: '***', apiSecret: '****',
}))
bot.start()
    .catch((e) => console.error(e));