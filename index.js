const { Wechaty } = require('wechaty');
const { PuppetPadplus } = require('wechaty-puppet-padplus');
const WechatyWebPanelPlugin = require('wechaty-web-panel');
const name = 'wechat-assistant-pro';
const token = '';
let bot = '';
if (token) {
  const puppet = new PuppetPadplus({
    token,
  });
  bot = new Wechaty({
    puppet,
    name, // generate xxxx.memory-card.json and save login data for the next login
  });
} else {
  bot = new Wechaty({
    name, // generate xxxx.memory-card.json and save login data for the next login
  });
}

bot
  .use(WechatyWebPanelPlugin())
  .start()
  .catch((e) => console.error(e));
