const { Wechaty } = require('wechaty');
const WechatyWebPanelPlugin = require('wechaty-web-panel');
const name = 'wechat-assistant-pro';
let bot = '';
// 1、如果没有token请使用以下代码
bot = new Wechaty({
  name, // generate xxxx.memory-card.json and save login data for the next login
});
//
// // 2、如果有token请使用一下配置
// bot = new Wechaty(
//     {
//       name,
//       puppet: 'wechaty-puppet-hostie',
//       puppetOptions: {
//         token: '配置你获取的token'
//       }
//     }
// )

bot
  .use(WechatyWebPanelPlugin({apiKey: '配置配置微秘书平台APIKEY', apiSecret:'配置配置微秘书平台APISECRET'}))
  .start()
  .catch((e) => console.error(e));
