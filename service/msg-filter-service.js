// const {roomJoinKeywords, replyKeywords, eventKeywords, autoReply, defaultBot} = reload('../../wechat.config');
const reload = require('auto-reload')
const config = reload('../wechat.config');
const dispatch = require('./event-dispatch-service');
const {setSchedule, updateSchedule} = require('../proxy/aibotk')
const {getToday, convertTime, delay, contactSay, addRoom, contentDistinguish, setLocalSchedule, isRealDate} = require('../lib')
const WEIXINOFFICIAL = ['朋友推荐消息', '微信支付', '微信运动', '微信团队']; // 微信官方账户，针对此账户不做任何回复
const DELETEFRIEND = '开启了朋友验证'; // 被人删除后，防止重复回复
const REMINDKEY = '提醒'

/**
 * 添加定时提醒
 * @param that wechaty实例
 * @param obj 定时对线
 * @returns {Promise<boolean>}
 */
async function addSchedule(that, obj) {
    try {
        let scheduleObj = await setSchedule(obj)
        let nickName = scheduleObj.subscribe
        let time = scheduleObj.time
        let Rule1 = scheduleObj.isLoop ? time : new Date(time)
        let content = scheduleObj.content
        let contact = await that.Contact.find({name: nickName})
        let id = scheduleObj.id
        setLocalSchedule(Rule1, async () => {
            console.log('你的专属提醒开启啦！')
            await contact.say(content)
            if (!scheduleObj.isLoop) {
                updateSchedule(id)
            }
        })
        return true
    } catch (error) {
        console.log('设置定时任务失败', error)
        return false
    }
}

/**
 * 关键词回复
 * @returns {Promise<*>}
 */
function keywordsReply(msg) {
    if (config.replyKeywords && config.replyKeywords.length > 0) {
        for (let item of config.replyKeywords) {
            if (item.reg === 2 && item.keywords.includes(msg)) {
                console.log(`精确匹配到关键词${msg},正在回复用户`);
                return item.replys;
            } else if(item.reg === 1){
                for (let key of item.keywords) {
                    if (msg.includes(key)) {
                        console.log(`模糊匹配到关键词${msg},正在回复用户`);
                        return item.replys;
                    }
                }
            }
        }
    }else {
        return []
    }
}

/**
 * 获取事件处理返回的内容
 * @param {*} event 事件名
 * @param {*} msg 消息
 * @param {*} name 用户
 * @param {*} id 用户id
 * @param avatar 用户头像
 * @returns {String}
 */
async function getEventReply(event, msg, name, id, avatar) {
    let reply = await dispatch.dispatchEventContent(event, msg, name, id, avatar);
    return reply;
}


/**
 * 微信好友文本消息事件过滤
 *
 * @param that wechaty实例
 * @param {Object} contact 发消息者信息
 * @param {string} msg 消息内容
 * @returns {number} 返回回复内容
 */
async function filterFriendMsg(that, contact, msg) {
    const name = contact.name();
    const id = contact.id;
    const avatar = await contact.avatar();
    let msgArr = []; // 返回的消息列表
    let obj = {type: 1, content: '', url: ''} // 消息主体
    if (msg === '') {
        obj.content = '我在呢'
        msgArr.push(obj)
        return msgArr;
    }
    if (msg.includes(DELETEFRIEND) || WEIXINOFFICIAL.includes(name) || msg.length > 200) {
        console.log('字符超200字符，或无效及官方消息，不做回复');
        obj.content = ''
        msgArr.push(obj)
        return msgArr;
    }
    // 进群邀请
    if (config.roomJoinKeywords && config.roomJoinKeywords.length > 0) {
        for (const item of config.roomJoinKeywords) {
            if (item.reg === 2 && item.keywords.includes(msg)) {
                console.log(`精确匹配到加群关键词${msg},正在邀请用户进群`);
                await addRoom(that, contact, item.roomName, item.replys)
                return [];
            } else {
                for (let key of item.keywords) {
                    if (msg.includes(key)) {
                        console.log(`模糊匹配到加群关键词${msg},正在邀请用户进群`);
                        await addRoom(that, contact, item.roomName, item.replys)
                        return [];
                    }
                }
            }
        }
    }
    // 定时任务
    if (msg.startsWith(REMINDKEY)) {
        let msgArr = msg.replace(/\s+/g, ' ').split(" ")
        if (msgArr.length > 3) {
            let schedule = contentDistinguish(msgArr, name)
            let time = schedule.isLoop ? schedule.time : isRealDate(schedule.time)
            if (time) {
                let res = await addSchedule(that, schedule)
                if (res) {
                    obj.content = '小助手已经把你的提醒牢记在小本本上了'
                } else {
                    obj.content = '添加提醒失败，请稍后重试'
                }
                msgArr.push(obj)
                return msgArr
            } else {
                obj.content = '提醒设置失败，请保证每个关键词之间使用空格分割开，并保证日期格式正确。正确格式为：“提醒(空格)我(空格)每天(空格)18:30(空格)下班回家'
                msgArr.push(obj)
                return msgArr
            }
        } else {
            obj.content = '提醒设置失败，请保证每个关键词之间使用空格分割开，并保证日期格式正确。正确格式为：“提醒(空格)我(空格)18:30(空格)下班回家”'
            msgArr.push(obj)
            return msgArr
        }
    }
    // 事件回复
    if (config.eventKeywords && config.eventKeywords.length > 0) {
        for (let item of config.eventKeywords) {
            for (let key of item.keywords) {
             if (item.reg === 1 && msg.includes(key) || item.reg === 2 && msg === key) {
                    msg = msg.replace(key, '')
                    let res = await getEventReply(item.event, msg, name, id, avatar)
                    return res;
                }
            }
        }
    }
    // 关键词处理
    msgArr = keywordsReply(msg) || []
    if (msgArr.length > 0) {
        return msgArr
    }

    if (config.autoReply) {
        console.log('开启了机器人自动回复功能')
        obj.type = 1
        obj.content = await dispatch.dispatchAiBot(config.defaultBot, msg, name, id)
    } else {
        console.log('没有开启机器人自动回复功能')
        obj.type = 1
        obj.content = ''
    }
    msgArr.push(obj)
    return msgArr;
}

/**
 * 微信群文本消息事件监听
 * @param {*} msg 群消息内容
 * @param {*} name 发消息人昵称
 * @param {*} id 发消息人
 * @param avatar
 * @returns {number} 返回事件类型
 * 事件说明
 * 0 机器人回复
 * 1 开启了好友验证 || 朋友推荐消息 || 发送的文字消息过长,大于40个字符
 * 2 初次添加好友
 */
async function filterRoomMsg(msg, name, id, avatar) {
    let msgArr = []; // 返回的消息列表
    let obj = {type: 1, content: '', url: ''}
    if (msg === '') {
        obj.content = '我在呢'
        msgArr.push(obj)
        return msgArr;
    }
    // 事件回复
    if (config.eventKeywords && config.eventKeywords.length > 0) {
        for (let item of config.eventKeywords) {
            for (let key of item.keywords) {
                if (item.reg === 1 && msg.includes(key) || item.reg === 2 && msg === key) {
                    msg = msg.replace(key, '')
                    let res = await getEventReply(item.event, msg, name, id, avatar)
                    return res;
                }
            }
        }
    }
    // 关键词处理
    msgArr = keywordsReply(msg) || []
    if (msgArr.length > 0) {
        return msgArr
    }
    if (config.autoReply) {
        console.log('开启了机器人自动回复功能')
        obj.type = 1
        obj.content = await dispatch.dispatchAiBot(config.defaultBot, msg, name, id)
    } else {
        console.log('没有开启机器人自动回复功能')
        obj.type = 1
        obj.content = ''
    }
    msgArr.push(obj)
    return msgArr;
}

module.exports = {
    filterFriendMsg,
    filterRoomMsg
};
