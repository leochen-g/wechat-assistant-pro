import {WechatyBuilder}  from 'wechaty'
import {WechatyWebPanelPlugin}  from 'wechaty-web-panel'
import {PuppetEngine} from 'wechaty-puppet-engine'


const name = 'wechat-assistant-engine';
let bot = ''
console.log('使用puppet-engine协议启动，默认使用大恩wxhook，请在windows 环境下使用')

bot = WechatyBuilder.build({
    name,
    puppet: new PuppetEngine({
        port: '8089', // 对应注入器中的 callBackUrl=http://localhost:8089/wechat/
        httpServer: 'http://127.0.0.1:8055', // 对应注入器参数port=8055
        runLocal: true
    })
});

bot.use(WechatyWebPanelPlugin({
    apiKey: '填入微秘书平台apikey', apiSecret: '填入微秘书平台apisecret',
}))
bot.start()
    .catch((e) => console.error(e));