const {getNews, getOne, getTXweather, getSweetWord} = require('../proxy/api');
const {formatDate, getDay, setLocalSchedule, delay, isRealDate} = require('../lib');
const service = require('../service/msg-filter-service');
const {FileBox} = require('file-box');

/**
 * 获取每日新闻内容
 * @param {*} sortId 新闻资讯分类Id
 * @param {*} endWord 结尾备注
 */
async function getEveryDayRoomContent(sortId, endWord = '微信小助手') {
    let today = formatDate(new Date()); //获取今天的日期
    let news = await getNews(sortId);
    let content = `${today}<br>${news}<br>————————${endWord}`;
    return content;
}

/**
 * 获取每日说内容
 * @param {*} date 与朋友的纪念日
 * @param {*} city 朋友所在城市
 * @param {*} endWord 结尾备注
 */
async function getEveryDayContent(date, city, endWord) {
    let one = await getOne(); //获取每日一句
    let weather = await getTXweather(city); //获取天气信息
    let today = formatDate(new Date()); //获取今天的日期
    let memorialDay = getDay(date); //获取纪念日天数
    let sweetWord = await getSweetWord(); // 土味情话
    let str = `${today}<br>我们在一起的第${memorialDay}天<br><br>元气满满的一天开始啦,要开心噢^_^<br><br>今日天气<br>${
        weather.weatherTips
    }<br>${
        weather.todayWeather
    }<br>每日一句:<br>${one}<br><br>情话对你说:<br>${sweetWord}<br><br>————————${endWord}`;
    return str;
}

/**
 * 获取私聊返回内容
 */
async function getContactTextReply(that, contact, msg) {
    let result = await service.filterFriendMsg(that, contact, msg);
    return result
}

/**
 * 获取群消息回复
 * @param {*} content 群消息内容
 * @param {*} name 发消息者昵称
 * @param {*} id 发消息者id
 */
async function getRoomTextReply(content, name, id, avatar) {
    let result = await service.filterRoomMsg(content, name, id, avatar);
    return result
}

/**
 * 更新用户信息
 */
async function updateContactInfo(that) {
    try {
        const contactList = await that.Contact.findAll()
        let res = []
        let realContact = contactList.filter(item => item.payload.type == 1)
        for (let i of realContact) {
            let contact = i.payload
            let avatar = await i.avatar()
            await avatar.toFile('../wechat-assistant-pro/koa/pubilc/static/avatar/' + contact.id + '.jpg')
            let obj = {
                randomId: contact.id,
                name: contact.name,
                alias: contact.alias,
                gender: contact.gender,
                province: contact.province,
                city: contact.city,
                avatar: 'static/avatar/' + contact.id + '.jpg',
                isFriend: contact.friend,
                address: contact.address,
                signature: contact.signature,
                star: contact.star,
                type: contact.type,
                weixin: contact.weixin
            }
            res.push(obj)
        }
    } catch (e) {
        console.log('e', e)
    }
}


module.exports = {
    getEveryDayContent,
    getEveryDayRoomContent,
    getContactTextReply,
    getRoomTextReply,
};
