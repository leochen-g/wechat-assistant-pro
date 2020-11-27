const { Wechaty } = require('wechaty');
const WechatyWebPanelPlugin = require('wechaty-web-panel');
const name = 'wechat-assistant-pro';
const token = '';
let bot = '';
bot = new Wechaty({
  name, // generate xxxx.memory-card.json and save login data for the next login
});

bot
  .use(WechatyWebPanelPlugin())
  .start()
  .catch((e) => console.error(e));
