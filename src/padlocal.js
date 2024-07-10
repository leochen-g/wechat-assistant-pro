import {WechatyBuilder} from "@juzi/wechaty";


export function startPadlocal(padLocalToken,) {
    const name = 'wechat-assistant-pad-pro';
    let bot = '';
    console.log('读取到环境变量中的ipad token 使用ipad协议启动')
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppetOptions: {
            token: padLocalToken
        }, puppet: 'wechaty-puppet-padlocal',
    });

    return bot
}