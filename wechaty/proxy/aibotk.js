const {aiBotReq, req} = require('./superagent');
const {parseBody} = require('../lib/index')
const fs = require('fs')
const path = require('path')
const basePath = path.join(__dirname, '../../')

/**
 * 获取配置文件
 * @returns {Promise<*>}
 */
async function getConfig() {
    try {
        let option = {
            method: 'GET',
            url: '/wechat/config',
            params: {}
        };
        let res = await aiBotReq(option)
        let content = parseBody(res);
        let data = `module.exports = ${JSON.stringify(JSON.parse(content.data.config), null, 2)}`
        fs.writeFileSync(path.join(basePath, './wechat.config.js'), data)
        return content.data
    } catch (e) {
        console.log('获取配置文件失败:' + e);
    }
}

/**
 * 获取定时提醒任务列表
 */
async function getScheduleList() {
    try {
        let option = {
            method: 'GET',
            url: '/task',
            params: {}
        };
        let res = await aiBotReq(option)
        let text = parseBody(res);
        let scheduleList = text.data;
        console.log('获取定时任务成功:' + scheduleList)
        return scheduleList;
    } catch (error) {
        console.log('获取定时任务失败:' + error);
    }
}

/**
 * 设置定时提醒任务
 * @param {*} obj 任务详情
 * @returns {*} 任务详情
 */
async function setSchedule(obj) {
    try {
        let option = {
            method: 'POST',
            url: '/task',
            params: data
        };
        let res = await aiBotReq(option)
        let content = parseBody(res);
        return content.data;
    } catch (error) {
        console.log('添加定时任务失败', error);
    }
}

/**
 * 更新定时提醒任务
 */
async function updateSchedule(id) {
    try {
        let option = {
            method: 'GET',
            url: '/task/update',
            params: {id: id}
        };
        let res = await aiBotReq(option)
        console.log('更新定时任务成功');
    } catch (error) {
        console.log('更新定时任务失败', error);
    }
}

/**
 * 登录二维码推送
 * @param url
 * @param status
 * @returns {Promise<void>}
 */
async function setQrCode(url, status) {
    try {
        let option = {
            method: 'GET',
            url: '/wechat/qrcode',
            params: {qrUrl: url, qrStatus: status}
        };
        let res = await aiBotReq(option)
        console.log('推送二维码成功');
    } catch (error) {
        console.log('推送登录二维码失败', error);
    }
}

/**
 * 推送登录状态的心跳
 * @param heart
 * @returns {Promise<void>}
 */
async function sendHeartBeat(heart) {
    try {
        let option = {
            method: 'GET',
            url: '/wechat/heart',
            params: {heartBeat: heart}
        };
        let res = await aiBotReq(option)
        console.log('推送心跳成功');
    } catch (error) {
        console.log('推送心跳失败', error);
    }
}

/**
 * 推送错误
 * @param error
 * @returns {Promise<void>}
 */
async function sendError(error) {
    try {
        let option = {
            method: 'GET',
            url: '/wechat/qrerror',
            params: {qrError: error}
        };
        let res = await aiBotReq(option)
        console.log('推送错误成功');
    } catch (error) {
        console.log('推送错误失败', error);
    }
}

/**
 * 更新头像
 * @returns {Promise<void>}
 * @param base
 */
async function sendAvatar(url) {
    try {
        let option = {
            method: 'POST',
            url: '/wechat/avatar',
            params: {avatar: url}
        };
        let res = await aiBotReq(option)
        console.log('推送头像成功');
    } catch (error) {
        console.log('推送头像失败', error);
    }
}

/**
 * 获取上传token
 * @returns {Promise<*>}
 */
async function getQiToken() {
    try {
        let option = {
            method: 'GET',
            url: '/wechat/qitoken',
            params: {}
        }
        let res = await aiBotReq(option)
        let content = parseBody(res);
        console.log('content', content)
        return content.data.token
    } catch (e) {
        console.log('token error', e)
    }
}

/**
 * 上传base64图片到七牛云
 * @param base
 * @param name
 * @returns {Promise<void>}
 */
async function putqn(base, name) {
    try {
        const token = await getQiToken()
        const namebase = Buffer.from(name).toString('base64').replace('=', '');
        let filename = 'wechat/avatar/' + namebase + '.jpeg'
        let base_file_name = Buffer.from(filename).toString('base64').replace('+', '-').replace('/', '_')
        let options = {
            method: 'POST',
            url: 'http://upload.qiniup.com/putb64/-1/key/' + base_file_name,
            contentType: 'application/octet-stream',
            authorization: 'UpToken ' + token,
            params: base
        }
        let res = await req(options)
        let content = parseBody(res);
        console.log('上传结果', content.key)
        return 'http://image.xkboke.com/' + content.key
    } catch (e) {
        console.log('上传失败', e.Error)
    }
}

module.exports = {
    getConfig,
    getScheduleList,
    setSchedule,
    updateSchedule,
    setQrCode,
    sendHeartBeat,
    sendError,
    sendAvatar,
    putqn
}


