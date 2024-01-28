import {WechatyBuilder} from '@juzi/wechaty'
import { PuppetWhatsapp } from '@juzi/wechaty-puppet-whatsapp'
import {WechatyWebPanelPlugin} from 'wechaty-web-panel'

/**
 * 启动企微服务
 * @param apiKey
 * @param apiSecret
 * @param token
 */

export function startWhatsApp({apiKey = '', apiSecret = ''}) {
    console.log('启动WhatsApp服务')
    const name = 'whatsapp-assistant';
    let bot = '';
    const puppet  = new PuppetWhatsapp()
    bot = WechatyBuilder.build({
        name,
        puppet
    });

    bot.use(WechatyWebPanelPlugin({
        apiKey: apiKey || '', apiSecret: apiSecret || '',
    }))
    bot.start()
        .catch((e) => console.error(e));
}

