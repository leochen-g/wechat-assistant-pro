const api = require('../proxy/api');
const lib = require('../lib');

/**
 * 根据事件名称分配不同的api处理，并获取返回内容
 * @param {string} eName 事件名称
 * @param {string} msg 消息内容
 * @returns {string} 内容
 */
async function dispatchEventContent(eName, msg,name,id,avatar) {
  let content;
  switch (eName) {
    case 'rubbish':
      content = await api.getRubbishType(msg);
      break;
    case 'mingyan':
      content = await api.getMingYan();
      break;
    case 'star':
      let xing = lib.getConstellation(msg)
      content = await api.getStar(xing);
      break;
    case 'xing':
      content = await api.getXing(msg);
      break;
    case 'skl':
      content = await api.getSkl(msg);
      break;
    case 'lunar':
      content = await api.getLunar(msg);
      break;
    case 'goldreply':
      content = await api.getGoldReply(msg);
      break;
    case 'xhy':
      content = await api.getXhy(msg);
      break;
    case 'rkl':
      content = await api.getRkl(msg);
      break;
    case 'avatar':
      let base64Text =  await avatar.toBase64()
      let ava = await api.getAvatar(base64Text)
      content = {
        type:'fileBox',
        src: ava
      }
      break;
    case 'emo':
      let emo = await api.getEmo(msg)
      content = {
        type:'fileBox',
        src: emo
      }
      break;
    case 'meinv':
      let meinv = await api.getMeiNv()
      content = {
        type:'fileBox',
        src: meinv
      }
      break;
    case 'updateConfig':
      let updateConfig = await api.getConfig()
      content = '更新成功，请稍等两分钟后生效'
      break;
    case 'restart':
      let restart = await api.restart()
      content = '更新成功，请稍等两分钟后生效'
      break;
    default:
      break;
  }
  return content;
}

/**
 * 派发不同的机器人处理回复内容
 * @param {*} bot 机器人类别 0 天行机器人 1 天行的图灵机器人 2 图灵机器人
 * @param {*} msg 消息内容
 * @param {*} name 发消息人
 * @param {*} id 发消息人id
 */
async function dispatchAiBot(bot, msg, name, id) {
  let res;
  switch (bot) {
    case 0:
      res = await api.getResByTX(msg, id);
      break;
    case 1:
      res = await api.getResByTXTL(msg, id);
      break;
    case 2:
      res = await api.getResByTL(msg, id);
      break;
    default:
      res = '';
      break;
  }
  return res;
}

module.exports = {
  dispatchEventContent,
  dispatchAiBot
};
