import {WechatyBuilder} from 'wechaty'
import {WechatyWebPanelPlugin} from 'wechaty-web-panel'
import {PuppetEngine} from 'wechaty-puppet-engine'

/**
 * 启动 windows engine协议
 * @url 具体使用地址 https://help.aibotk.com/?plugin=czw_emDoc&post=8
 * @param apiKey
 * @param apiSecret
 * @param port
 * @param httpServer
 */

const name = 'windows-assistant';
let bot = ''
console.log('使用windows协议启动，请在windows 环境下使用')

bot = WechatyBuilder.build({
    name,
    puppet: new PuppetEngine({
        port: '8089', // 对应注入器中的 callBackUrl=http://localhost:8089/wechat/
        httpServer: 'http://127.0.0.1:8055', // 对应注入器参数port=8055
        runLocal: true
    })
});

bot.use(WechatyWebPanelPlugin({
    apiKey: '微秘书 apiKey', apiSecret: '微秘书 apiSecret',
}))
bot.start()
    .catch((e) => console.error(e));
