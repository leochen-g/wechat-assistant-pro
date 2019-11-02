const {Friendship} = require('wechaty')
const lib = require('../lib')
const config = require('../../wechat.config');
/**
 * 好友添加
 */
async function onFriend(friendship) {
  let logMsg,hello;
  try {
    name = friendship.contact().name()
    hello = friendship.hello()
    logMsg = name + '，发送了好友请求';
    console.log(logMsg);
    switch (friendship.type()) {
      case Friendship.Type.Receive:
        if (config.ACCEPTFRIEND.length == 0) {
          console.log('无认证关键词,30秒后将会自动通过好友请求')
          await lib.delay(30000);
          await friendship.accept();
        } else if (config.ACCEPTFRIEND.length>0&&config.ACCEPTFRIEND.includes(hello)) {
          console.log(`触发关键词${hello},30秒后自动通过好友请求`)
          await lib.delay(3000); 
          await friendship.accept();
        }
        break;
      case Friendship.Type.Confirm:
        logMsg = '已确认添加好友：' + name;
        console.log(logMsg)
        break;
    }
  } catch (e) {
    logMsg = e
    console.log('添加好友出错：',logMsg)
  }
}

module.exports = onFriend;
