const {Wechaty} = require('wechaty');
const {PuppetPadlocal} = require('wechaty-puppet-padlocal');

const WechatyWebPanelPlugin = require('wechaty-web-panel');

const name = 'wechat-assistant-pro';
let bot = '';
let padLocalToken = '' // 如果申请了ipadlocal的token,可以直接填入

if (process.env['PAD_LOCAL_TOKEN']) {
    console.log('读取到环境变量中的ipadLocalToken')
    padLocalToken = process.env['PAD_LOCAL_TOKEN']
}

if (padLocalToken) {
    console.log('读取到你已经配置ipadLocalToken，启用ipad协议')
    const puppet = new PuppetPadlocal({
        token: padLocalToken,
    });
    bot = new Wechaty({
        name,
        puppet,
    });
} else {
    console.log('默认使用web版微信协议，如无法登录，请检测自己的微信是否能登陆网页版协议')
    bot = new Wechaty({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: 'wechaty-puppet-wechat',
    });
}


bot
    .use(
        WechatyWebPanelPlugin({
            apiKey: '智能微秘书平台的apiKey',
            apiSecret: '智能微秘书平台的apiSecret',
        })
    )
    .start()
    .catch((e) => console.error(e));

