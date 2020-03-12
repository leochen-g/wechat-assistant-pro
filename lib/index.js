const Crypto = require("crypto");
const schedule = require('node-schedule')
const fs = require('fs')
const {FileBox} = require('wechaty');

/**
 * 设置定时器
 * @param {*} date 日期
 * @param {*} callback 回调
 */
//其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解    *代表通配符
//
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

function setLocalSchedule(date, callback) {
    schedule.scheduleJob(date, callback)
}

/**
 * 延时函数
 * @param {*} ms 毫秒
 */
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 获取周几
 * @param {*} date 日期
 */
function getDay(date) {
    var date2 = new Date();
    var date1 = new Date(date);
    var iDays = parseInt(
        Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24
    );
    return iDays;
}

/**
 * 格式化日期
 * @param {*} date
 * @returns 例：2019-9-10 13:13:04 星期一
 */
function formatDate(date) {
    var tempDate = new Date(date);
    var year = tempDate.getFullYear();
    var month = tempDate.getMonth() + 1;
    var day = tempDate.getDate();
    var hour = tempDate.getHours();
    var min = tempDate.getMinutes();
    var second = tempDate.getSeconds();
    var week = tempDate.getDay();
    var str = '';
    if (week === 0) {
        str = '星期日';
    } else if (week === 1) {
        str = '星期一';
    } else if (week === 2) {
        str = '星期二';
    } else if (week === 3) {
        str = '星期三';
    } else if (week === 4) {
        str = '星期四';
    } else if (week === 5) {
        str = '星期五';
    } else if (week === 6) {
        str = '星期六';
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (second < 10) {
        second = '0' + second;
    }
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ' ' + str;
}

/**
 * 获取今天日期
 * @returns 2019-7-19
 */
function getToday() {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + month + '-' + day + ' ';
}

/**
 * 转换定时日期格式
 * @param {*} time
 * @returns 0 12 15 * * * 每天下午3点12分
 */
function convertTime(time) {
    let array = time.split(':');
    return '0 ' + array[1] + ' ' + array[0] + ' * * *';
}

//
/**
 * 判断日期时间格式是否正确
 * @param {*} str 日期
 * @returns {boolean}
 */
function isRealDate(str) {
    var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if (r == null) return false;
    r[2] = r[2] - 1;
    var d = new Date(r[1], r[2], r[3], r[4], r[5]);
    if (d.getFullYear() != r[1]) return false;
    if (d.getMonth() != r[2]) return false;
    if (d.getDate() != r[3]) return false;
    if (d.getHours() != r[4]) return false;
    if (d.getMinutes() != r[5]) return false;
    return true;
}

/**
 * 获取星座的英文
 * @param {*} msg
 */
function getConstellation(astro) {
    if (astro.includes('白羊座')) {
        return 'aries'
    }
    if (astro.includes('金牛座')) {
        return 'taurus'
    }
    if (astro.includes('双子座')) {
        return 'gemini'
    }
    if (astro.includes('巨蟹座') || astro.includes('钜蟹座')) {
        return 'cancer'
    }
    if (astro.includes('狮子座')) {
        return 'leo'
    }
    if (astro.includes('处女座')) {
        return 'virgo'
    }
    if (astro.includes('天平座') || astro.includes('天秤座') || astro.includes('天瓶座') || astro.includes('天枰座')) {
        return 'libra'
    }
    if (astro.includes('天蝎座')) {
        return 'scorpio'
    }
    if (astro.includes('射手座')) {
        return 'sagittarius'
    }
    if (astro.includes('射手座')) {
        return 'sagittarius'
    }
    if (astro.includes('摩羯座')) {
        return 'capricorn'
    }
    if (astro.includes('水瓶座')) {
        return 'aquarius'
    }
    if (astro.includes('双鱼座')) {
        return 'pisces'
    }
}

/**
 * 返回指定范围的随机整数
 * @param {*} min
 * @param {*} max
 */
function randomRange(min, max) { // min最小值，max最大值
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 写入文件内容
 * @param fpath
 * @param encoding
 * @returns {Promise<unknown>}
 */
async function writeFile(fpath, encoding) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fpath, encoding, function (err, content) {
            if (err) {
                reject(err)
            } else {
                resolve(content)
            }
        })
    })
}

/**
 * 解析响应数据
 * @param {*} content 内容
 */
function parseBody(content) {
    if (!content) return;
    return JSON.parse(content.text);
}

/**
 * MD5加密
 * @return {string}
 */
function MD5(str) {
    return Crypto.createHash('md5').update(str).digest('hex')
}

/**
 * 对象内容按照字母排序
 * @param obj
 */
function objKeySort(obj) {
    const newkey = Object.keys(obj).sort()
    const newObj = {}
    for (let i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]]
    }
    return newObj
}

/**
 * 根据排序后的数据返回url参数
 * @param datas
 * @returns {string}
 */
function getQueryString(datas) {
    const data = objKeySort(datas)
    let url = ''
    if (
        typeof data === 'undefined' ||
        data == null ||
        typeof data !== 'object'
    ) {
        return ''
    }
    for (var k in data) {
        url += (url.indexOf('=') !== -1 ? '&' : '') + k + '=' + data[k]
    }
    return url
}

/**
 * 获取MD5加密后的Sign
 * @param secret
 * @param query
 * @returns {string}
 */
function getSign(secret, query) {
    const stringSignTemp = `${query}&ApiSecret=${secret}`
    return MD5(stringSignTemp).toUpperCase()
}

/**
 * 生成n位随机数
 * @param n
 * @returns {string}
 */
function rndNum(n) {
    let rnd = ''
    for (let i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10)
    }
    return rnd
}

/**
 * 生成加密后的对象
 * @param apiKey
 * @param apiSecret
 * @param params
 * @returns {{apiKey: *, nonce: *, timestamp: *}}
 */
function getFormatQuery(apiKey, apiSecret, params = {}) {
    const query = {
        apiKey: apiKey,
        timestamp: new Date().getTime(),
        nonce: rndNum(3),
        ...params
    }
    const sign = getSign(getQueryString(query), apiSecret)
    query.sign = sign
    return query
}

/**
 * 生成回复内容
 * @param type 内容类型
 * @param content 内容
 * @param url 链接
 * @returns {[{type: *, content: *, url: *}]}
 */
function msgArr(type = 1, content = '', url = '') {
    let obj = {type: type, content: content, url: url}
    return [obj]
}

/**
 * 统一触发加群欢迎词
 * @param room 群
 * @param roomName 群名
 * @param contactName 进群人
 * @param msg 消息
 */
async function addRoomWelcomeSay(room, roomName, contactName, msg) {
    if (msg.type === 1 && msg.content !== '') { // 文字
        console.log('回复内容', msg.content)
        await room.say(`${roomName}：欢迎新朋友 @${contactName}，<br>${msg.content}`)
    } else if (msg.type === 2 && msg.url !== '') { // url文件
        let obj = FileBox.fromUrl(msg.url)
        console.log('回复内容', obj)
        await room.say(obj)
    }
}
/**
 * 群关键词回复
 * @param {*} contact 
 * @param {*} msg 
 * @param {*} isRoom 
 */
async function roomSay(room, contact, msg) {
    if (msg.type === 1 && msg.content !== '') { // 文字
        console.log('回复内容', msg.content)
        await room.say(msg.content, contact)
    } else if (msg.type === 2 && msg.url !== '') { // url文件
        let obj = FileBox.fromUrl(msg.url)
        console.log('回复内容', obj)
        await room.say('', contact);
        await delay(500);
        await room.say(obj)
    }
}

/**
 * 私聊发送消息
 * @param contact
 * @param msg
 * @param isRoom
 */
async function contactSay(contact, msg, isRoom = false) {
    if (msg.type === 1 && msg.content !== '') { // 文字
        console.log('回复内容', msg.content)
        await contact.say(msg.content)
    } else if (msg.type === 2 && msg.url !== '') { // url文件
        let obj = FileBox.fromUrl(msg.url)
        console.log('回复内容', obj)
        if (isRoom) {
            await contact.say(`@${contact.name()}`);
            await delay(500);
        }
        await contact.say(obj)
    }
}

/**
 * 统一邀请加群
 * @param that
 * @param contact
 */
async function addRoom(that, contact, roomName, replys) {
    let room = await that.Room.find({topic: roomName});
    if (room) {
        try {
            for (const item of replys) {
                await delay(2000);
                contactSay(contact, item)
            }
            await room.add(contact);
        } catch (e) {
            console.error('加群报错', e);
        }
    } else {
        console.log(`不存在此群：${roomName}`)
    }
}

/**
 * 设置提醒内容解析
 * @param {*} keywordArray 分词后内容
 * @param name
 */
function contentDistinguish(keywordArray, name) {
    let scheduleObj = {};
    let today = getToday();
    scheduleObj.setter = name // 设置定时任务的用户
    scheduleObj.subscribe = keywordArray[1] === '我' ? name : keywordArray[1]; // 定时任务接收者
    if (keywordArray[2] === '每天') {
        // 判断是否属于循环任务
        console.log('已设置每日定时任务');
        scheduleObj.isLoop = true;
        if (keywordArray[3].includes(':') || keywordArray[3].includes('：')) {
            let time = keywordArray[3].replace('：', ':');
            scheduleObj.time = convertTime(time);
        } else {
            scheduleObj.time = ''
        }
        scheduleObj.content = (scheduleObj.setter === scheduleObj.subscribe) ? `亲爱的${scheduleObj.subscribe}，温馨提醒：${keywordArray[4].replace('我', '你')}`
            : `亲爱的${scheduleObj.subscribe},${scheduleObj.setter}委托我提醒你，${keywordArray[4].replace('我', '你')}`
    } else if (keywordArray[2] && keywordArray[2].includes('-')) {
        console.log('已设置指定日期时间任务');
        scheduleObj.isLoop = false;
        scheduleObj.time =
            keywordArray[2] + ' ' + keywordArray[3].replace('：', ':');
        scheduleObj.content = (scheduleObj.setter === scheduleObj.subscribe) ? `亲爱的${scheduleObj.subscribe}，温馨提醒：${keywordArray[4].replace('我', '你')}`
            : `亲爱的${scheduleObj.subscribe},${scheduleObj.setter}委托我提醒你，${keywordArray[4].replace('我', '你')}`
    } else {
        console.log('已设置当天任务');
        scheduleObj.isLoop = false;
        scheduleObj.time = today + keywordArray[2].replace('：', ':');
        scheduleObj.content = (scheduleObj.setter === scheduleObj.subscribe) ? `亲爱的${scheduleObj.subscribe}，温馨提醒：${keywordArray[3].replace('我', '你')}`
            : `亲爱的${scheduleObj.subscribe},${scheduleObj.setter}委托我提醒你，${keywordArray[3].replace('我', '你')}`
    }
    return scheduleObj;
}
async function putb64(base64,size,token){
    var pic = base64
    var url = 'http://upload.qiniup.com/putb64/-1/' //非华东空间需要根据注意事项 1 修改上传域名
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            console.log('xhr.responseText', xhr.responseText)
           return xhr.responseText;
        }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", "UpToken "+token);
    xhr.send(pic);
}

/**
 * 函数节流
 * @param fn
 * @param wait
 * @returns {Function}
 */
function throttle(fn,wait){
    var timer = null;
    return function(){
        var context = this;
        var args = arguments;
        if(!timer){
            timer = setTimeout(function(){
                fn.apply(context,args);
                timer = null;
            },wait)
        }
    }
}
module.exports = {
    setLocalSchedule,
    parseBody,
    delay,
    getToday,
    convertTime,
    getDay,
    formatDate,
    isRealDate,
    getConstellation,
    randomRange,
    writeFile,
    MD5,
    getFormatQuery,
    contactSay,
    addRoom,
    contentDistinguish,
    msgArr,
    putb64,
    throttle,
    addRoomWelcomeSay,
    roomSay
};
