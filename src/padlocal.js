import {WechatyBuilder} from 'wechaty'
import {WechatyWebPanelPlugin} from 'wechaty-web-panel'

/**
 * 启动ipad local服务
 * @param apiKey
 * @param apiSecret
 * @param token
 */

export function startPadLocal({apiKey = '', apiSecret = '', token}) {
    console.log('启动ipad个微服务')
    const name = 'padlocal-assistant';
    let bot = '';
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppetOptions: {
            token: token
        }, puppet: 'wechaty-puppet-padlocal',
    });

    bot.use(WechatyWebPanelPlugin({
        apiKey: apiKey || '', apiSecret: apiSecret || '',
    }))
    bot.start()
        .catch((e) => console.error(e));
}

