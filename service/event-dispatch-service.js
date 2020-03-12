const api = require('../proxy/api');
const {getConfig} = require('../proxy/aibotk')
const {getConstellation, msgArr} = require('../lib');
const fs = require('fs')
const path = require('path')
const basePath = path.join(__dirname, '../')

/**
 * 根据事件名称分配不同的api处理，并获取返回内容
 * @param {string} eName 事件名称
 * @param {string} msg 消息内容
 * @param name
 * @param id
 * @param avatar
 * @returns {string} 内容
 */
async function dispatchEventContent(eName, msg, name, id, avatar) {
    let content = '', type = 1, url = '';
    switch (eName) {
        case 'rubbish':
            content = await api.getRubbishType(msg);
            break;
        case 'mingyan':
            content = await api.getMingYan();
            break;
        case 'star':
            let xing = getConstellation(msg)
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
        case 'avatarGuo':
            let base64Text = await avatar.toBase64()
            url = await api.getAvatar(base64Text, 1)
            type = 2
            break;
        case 'avatarShengDan':
            let base64 = await avatar.toBase64()
            url = await api.getAvatar(base64, 2)
            type = 2
            break;
        case 'emo':
            url = await api.getEmo(msg)
            type = 2
            break;
        case 'meinv':
            url = await api.getMeiNv()
            type = 2
            break;
        case 'ncov':
            content = await api.getNcov()
            break;  
        case 'cname':
            content = await api.getCname()
            break;    
        case 'updateConfig':
            let data = `// ${new Date()}: 重启`
            fs.writeFileSync(path.join(basePath, './reload-action.js'), data)
            content = '更新成功，请稍等两分钟后生效'
            break;
        default:
            break;
    }
    return msgArr(type, content, url)
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
