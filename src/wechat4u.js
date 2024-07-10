import {WechatyBuilder} from "@juzi/wechaty";


export function startWechat4u() {
    console.log('默认使用wechat4u协议启动')
    const name = 'wechat-assistant-web-pro';
    let bot = '';
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: 'wechaty-puppet-wechat4u',
    });

    return bot
}