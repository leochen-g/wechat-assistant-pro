const { Wechaty } = require('wechaty');
const onScan = require('./listeners/on-scan')
const onLogin = require('./listeners/on-login')
const onLogout = require('./listeners/on-logout')
const onFriend = require('./listeners/on-friend')
const onRoomjoin = require('./listeners/on-roomjoin')
const onMessage = require('./listeners/on-message')
const onReady = require('./listeners/on-ready')

const bot = new Wechaty({ name: 'WechatEveryDay' });


bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('friendship', onFriend);
bot.on('room-join', onRoomjoin);
bot.on('message', onMessage);
bot.on('ready', onReady);


bot
  .start()
  .then(() => {
    console.log('开始登陆微信');
  })
  .catch(async function(e) {
    console.log(`初始化失败: ${e}.`)
    await bot.stop()
    process.exit(1)
  });
