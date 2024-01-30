import {WechatyBuilder} from '@juzi/wechaty'
import {WechatyWebPanelPlugin} from 'wechaty-web-panel'

/**
 * 启动企微服务
 * @param apiKey
 * @param apiSecret
 * @param token
 */

export function startWorker({apiKey = '', apiSecret = '', token}) {
    console.log('启动企微服务')
    const name = 'worker-assistant';
    const bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: '@juzi/wechaty-puppet-service',
        puppetOptions: {
            authority: 'token-service-discovery-test.juzibot.com',
            tls: { disable: true },
            token
        },
    });

    bot.use(WechatyWebPanelPlugin({
        apiKey: apiKey || '', apiSecret: apiSecret || '',
    }))
    bot.start()
        .catch((e) => console.error(e));
    return bot;
}

