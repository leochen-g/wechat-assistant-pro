const { Wechaty } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const WechatyWebPanelPlugin = require('wechaty-web-panel');

const name = 'wechat-assistant-pro';
let bot = '';
// 1、如果没有token请使用以下代码
bot = new Wechaty({
    name, // generate xxxx.memory-card.json and save login data for the next login
    puppet: 'wechaty-puppet-wechat',
});

// 2、如果有token请使用一下配置
// const puppet = new PuppetPadlocal({
//     token: '**************',
// });
// bot = new Wechaty({
//     name,
//     puppet,
// });

bot
    .use(
        WechatyWebPanelPlugin({
            apiKey: 'a08e618017855bbf35dc6401124dacf7c8de4174',
            apiSecret: '1176c0260ed32a95824abed7a340e44d51bf91fb',
        })
    )
    .start()
    .catch((e) => console.error(e));

