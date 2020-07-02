const { Wechaty } = require('wechaty');
const { PuppetPadplus } = require('wechaty-puppet-padplus');
const WechatyWebPanelPlugin = require('wechaty-web-panel');
const token = '';
const puppet = new PuppetPadplus({
  token,
});
const name = 'wechat-assistant-pro';
const bot = new Wechaty({
  puppet,
  name, // generate xxxx.memory-card.json and save login data for the next login
});

bot
  .use(WechatyWebPanelPlugin())
  .start()
  .catch((e) => console.error(e));
