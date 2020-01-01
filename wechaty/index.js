const { Wechaty } = require('wechaty');
const onScan = require('./listeners/on-scan')
const onLogin = require('./listeners/on-login')
const onLogout = require('./listeners/on-logout')
const onFriend = require('./listeners/on-friend')
const onRoomjoin = require('./listeners/on-roomjoin')
const onMessage = require('./listeners/on-message')
const onReady = require('./listeners/on-ready')
const onHeartbeat = require('./listeners/on-heartbeat')
const onError = require('./listeners/on-error')
const onRoomtopic = require('./listeners/on-roomtopic')
const onRoomleave = require('./listeners/on-roomleave')

const bot = new Wechaty({ name: 'WechatEveryDay' });


bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('friendship', onFriend);
bot.on('room-join', onRoomjoin);
bot.on('room-topic', onRoomtopic);
bot.on('room-leave', onRoomleave);
bot.on('message', onMessage);
bot.on('ready', onReady);
bot.on('heartbeat', onHeartbeat)
bot.on('error', onError)


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
