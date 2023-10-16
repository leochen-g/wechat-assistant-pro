import {WechatyBuilder} from 'wechaty'
import {WechatyWebPanelPlugin} from 'wechaty-web-panel'

const name = 'wechat-assistant-pro';
let bot = '';
let padLocalToken = '' // 如果申请了ipadlocal的token,可以直接填入
let workProToken = '' // 如果申请了企业微信的token 可以直接填入

if (process.env['PAD_LOCAL_TOKEN']) {
    console.log('读取到环境变量中的ipadLocalToken')
    padLocalToken = process.env['PAD_LOCAL_TOKEN']
}

if (process.env['WORK_PRO_TOKEN']) {
    console.log('读取到环境变量中的企微token')
    workProToken = process.env['WORK_PRO_TOKEN']
}

if (padLocalToken) {
    console.log('读取到环境变量中的ipad token 使用ipad协议启动')
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppetOptions: {
            token: padLocalToken
        }, puppet: 'wechaty-puppet-padlocal',
    });

} else if(workProToken) {
    console.log('读取到环境变量中的企微 token 使用企业微信协议启动')
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: 'wechaty-puppet-service',
        puppetOptions: {
            tls: { disable: true },
            token: workProToken
        },
    });
} else {
    console.log('默认使用wechat4u协议启动')
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: 'wechaty-puppet-wechat4u',
    });
}


bot.use(WechatyWebPanelPlugin({
    apiKey: '***', apiSecret: '****',
}))
bot.start()
    .catch((e) => console.error(e));
