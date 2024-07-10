import {WechatyBuilder} from "@juzi/wechaty";


export function startWorkpro(workProToken) {
    const name = 'wechat-assistant-work-pro';
    let bot = '';
    console.log('读取到环境变量中的企微 token 使用企业微信协议启动')
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: '@juzi/wechaty-puppet-service',
        puppetOptions: {
            authority: 'token-service-discovery-test.juzibot.com',
            tls: {disable: true},
            token: workProToken
        },
    });
    return bot;
}