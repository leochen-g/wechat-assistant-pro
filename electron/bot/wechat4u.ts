import {WechatyBuilder} from 'wechaty'
import {WechatyWebPanelPlugin} from 'wechaty-web-panel'

/**
 * 启动web协议服务
 * @param apiKey
 * @param apiSecret
 */

export function startWechat4u({apiKey = '', apiSecret = ''}) {
    console.log('启动web协议个微服务')
    const name = 'wechat4u-assistant';
    const bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: 'wechaty-puppet-wechat4u',
    });

    bot.use(WechatyWebPanelPlugin({
        apiKey: apiKey || '', apiSecret: apiSecret || '',
    }))
    bot.start()
        .catch((e) => console.error(e));
    return bot
}

