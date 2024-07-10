import {WechatyBuilder} from '@juzi/wechaty'
import {PuppetOA} from 'wechaty-puppet-official-account'



export function startOffice({appId, appSecret, appToken, appPort, isPerson}) {
    if(appId && appSecret && appToken) {
        console.log('读取到环境变量中的appId 使用公众号协议启动')
        const name = 'office-assistant-pro';
        let bot = '';
        const oa = new PuppetOA({
            appId,
            appSecret,
            token: appToken,
            personalMode: isPerson, // 如果你是个人订阅号或者未认证 请开启此项
            // port 和 webhookProxyUrl 自己选择一个
            port: appPort || 8077, // 有自己域名或者服务器 可以启用这个 服务启动的端口 自己映射好配到公众号后台机就行
            // webhookProxyUrl: 'https://****.loca.lt'  // 如果没有自己的域名可以直接用默认自带穿透代理服务localtunnel ***替换成随机字符串即可  这个域名记得配置到公众号后台
        })

        bot = WechatyBuilder.build({
            name, // generate xxxx.memory-card.json and save login data for the next login
            puppet: oa,
        });
        return bot;
    }
    console.log('缺少公众号启动所需参数，请仔细检查后重新启动')
    return null;
}



