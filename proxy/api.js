const cheerio = require('cheerio');
const {req, txReq} = require('./superagent');
const {EMOHOST, TULING, ONE} = require('./config');
const reload = require('auto-reload')
const config = reload('../wechat.config');
const {randomRange, parseBody, MD5} = require('../lib/index')

/**
 * 获取每日一句
 */
async function getOne() {
    try {
        let option = {
            method: 'GET',
            url: ONE,
            params: ''
        };
        let res = await req(option);
        let $ = cheerio.load(res.text);
        let todayOneList = $('#carousel-one .carousel-inner .item');
        let todayOne = $(todayOneList[0])
            .find('.fp-one-cita')
            .text()
            .replace(/(^\s*)|(\s*$)/g, '');
        return todayOne;
    } catch (error) {
        console.log('获取每日一句失败：', error);
    }
}

/**
 * 天行图灵聊天机器人
 * @param {*} word 发送内容
 * @param {*} id id
 */
async function getResByTXTL(word, id) {
    try {
        let uniqueId = MD5(id);
        let option = {
            method: 'GET',
            url: '/txapi/tuling/',
            params: {question: word, user: uniqueId}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let response = content.newslist[0].reply;
            console.log('天行图灵机器人回复：', response);
            return response;
        } else {
            return '我好像迷失在无边的网络中了，接口调用错误：' + content.msg;
        }
    } catch (error) {
        console.log('天行图灵聊天机器人请求失败：', error);
    }
}

/**
 * 天行聊天机器人
 * @param {*} word 内容
 * @param {*} id id
 */
async function getResByTX(word, id) {
    try {
        let uniqueId = MD5(id);
        let option = {
            method: 'GET',
            url: '/txapi/robot/',
            params: {question: word, userid: uniqueId}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let response = '';
            if (content.datatype === 'text') {
                response = content.newslist[0].reply;
            } else if (content.datatype === 'view') {
                response = `虽然我不太懂你说的是什么，但是感觉很高级的样子，因此我也查找了类似的文章去学习，你觉得有用吗<br> 
        《${content.newslist[0].title}》${content.newslist[0].url}`;
            } else {
                response =
                    '你太厉害了，说的话把我难倒了，我要去学习了，不然没法回答你的问题';
            }
            console.log('天行机器人回复：', response);
            return response;
        } else {
            return '我好像迷失在无边的网络中了，你能找回我么';
        }
    } catch (error) {
        console.log('天行聊天机器人请求失败：', error);
    }
}

/**
 * 图灵智能聊天机器人
 * @param {*} word 内容
 * @param {*} id id
 */
async function getResByTL(word, id) {
    try {
        let uniqueId = MD5(id);
        let data = {
            reqType: 0,
            perception: {
                inputText: {
                    text: word
                }
            },
            userInfo: {
                apiKey: config.tuLingKey,
                userId: uniqueId
            }
        };
        let option = {
            method: 'POST',
            url: TULING,
            params: data,
            contentType: 'application/json;charset=UTF-8'
        };
        let res = await req(option);
        let content = parseBody(res);
        let reply = content.results[0].values.text;
        return reply;
    } catch (error) {
        console.log('图灵聊天机器人请求失败：', error);
    }
}

/**
 * 获取垃圾分类结果
 * @param {String} word 垃圾名称
 */
async function getRubbishType(word) {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/lajifenlei/',
            params: {word: word}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let type;
            if (content.newslist[0].type == 0) {
                type = '是可回收垃圾';
            } else if (content.newslist[0].type == 1) {
                type = '是有害垃圾';
            } else if (content.newslist[0].type == 2) {
                type = '是厨余(湿)垃圾';
            } else if (content.newslist[0].type == 3) {
                type = '是其他(干)垃圾';
            }
            let response = `${content.newslist[0].name}${type}<br>解释：${
                content.newslist[0].explain
            }<br>主要包括：${content.newslist[0].contain}<br>投放提示：${
                content.newslist[0].tip
            }`;
            return response;
        } else {
            console.log('查询失败提示：', content.msg);
            return '暂时还没找到这个分类信息呢';
        }
    } catch (error) {
        console.log('垃圾分类请求失败：', error);
    }
}

/**
 * 土味情话获取
 */
async function getSweetWord() {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/saylove/',
            params: {}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let sweet = content.newslist[0].content;
            let str = sweet.replace('\r\n', '<br>');
            return str;
        } else {
            console.log('获取土情话接口失败', content.msg);
        }
    } catch (err) {
        console.log('获取土情话接口失败', err);
    }
}

/**
 * 获取天行天气
 */
async function getTXweather(city) {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/tianqi/',
            params: {city: city}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let todayInfo = content.newslist[0];
            let obj = {
                weatherTips: todayInfo.tips,
                todayWeather: `今天:${todayInfo.weather}<br>温度:${todayInfo.lowest}/${
                    todayInfo.highest
                }<br>${todayInfo.wind} ${todayInfo.windspeed}<br>空气:${
                    todayInfo.air_level
                }${todayInfo.air}<br>`
            };
            return obj;
        } else {
            console.log('获取天气接口失败', content.msg);
        }
    } catch (err) {
        console.log('获取天气接口失败', err);
    }
}

/**
 * 获取每日新闻内容
 * @param {*} id 新闻频道对应的ID
 */
async function getNews(id) {
    try {
        let option = {
            method: 'GET',
            url: '/allnews/',
            params: {num: 10, col: id}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let newList = content.newslist;
            let news = '';
            let shortUrl = await getShortUrl('https://www.tianapi.com/weixin/news/?col=' + id)
            for (let i in newList) {
                let num = parseInt(i) + 1;
                news = `${news}<br>${num}.${newList[i].title}`;
            }
            return `${news}<br>新闻详情查看：${shortUrl}<br>`;
        }
    } catch (error) {
        console.log('获取天行新闻失败', error);
    }
}

/**
 * 获取名人名言
 */
async function getMingYan() {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/mingyan/',
            params: {num: 1}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let newList = content.newslist;
            let news = `${newList[0].content}<br>——————————${newList[0].author}`
            return news;
        }
    } catch (error) {
        console.log('获取天行名人名言失败', error);
    }
}

/**
 * 获取星座运势
 * @param {string} satro 星座
 */
async function getStar(astro) {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/star/',
            params: {astro: astro}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let newList = content.newslist;
            let news = ''
            for (let item of newList) {
                news = `${news}${item.type}:${item.content}<br>`
            }
            return news;
        }
    } catch (error) {
        console.log('获取天行星座运势失败', error);
    }
}

/**
 * 获取姓氏起源
 * @param {string} 姓
 */
async function getXing(name) {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/surname/',
            params: {xing: name}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let newList = content.newslist;
            let news = `${newList[0].content}`
            return news;
        }
    } catch (error) {
        console.log('获取天行姓氏起源失败', error);
    }
}

/**
 * 获取顺口溜
 */
async function getSkl() {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/skl/',
            params: {}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let newList = content.newslist;
            let news = `${newList[0].content}`
            return news;
        }
    } catch (error) {
        console.log('获取天行顺口溜失败', error);
    }
}

/**
 * 获取老黄历
 */
async function getLunar(date) {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/lunar/',
            params: {date: date}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let item = content.newslist[0];
            let news = `<br>阳历：${item.gregoriandate}<br>阴历：${item.lunardate}<br>节日：${item.lunar_festival}<br>适宜：${item.fitness}<br>不宜：${item.taboo}<br>神位：${item.shenwei}<br>胎神：${item.taishen}<br>冲煞：${item.chongsha}<br>岁煞：${item.suisha}`
            return news;
        }
    } catch (error) {
        console.log('获取天行老黄历失败', error);
    }
}

/**
 * 天行神回复
 */
async function getGoldReply() {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/godreply/',
            params: {num: 1}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let item = content.newslist[0];
            let news = `标题："${item.title}"<br>回复：${item.content}`
            return news;
        }
    } catch (error) {
        console.log('获取天行神回复失败', error);
    }
}

/**
 * 天行歇后语
 */
async function getXhy() {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/xiehou/',
            params: {num: 1}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let item = content.newslist[0];
            let news = `${item.quest}————${item.result}`
            return news;
        }
    } catch (error) {
        console.log('获取天行歇后语失败', error);
    }
}

/**
 * 天行绕口令
 */
async function getRkl() {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/rkl/',
            params: {num: 1}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let item = content.newslist[0];
            let news = `${item.content}`
            return news;
        }
    } catch (error) {
        console.log('获取天行绕口令失败', error);
    }
}

/**
 * 天行短连接
 */
async function getShortUrl(url) {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/turl/',
            params: {url: url}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let item = content.newslist[0];
            let shorturl = item.shorturl
            return shorturl;
        }
    } catch (error) {
        console.log('获取天行短连接失败', error);
    }
}

/**
 * 获取自定义头像
 * @param {*} base
 * @param type
 */
async function getAvatar(base, type) {
    try {
        let option = {
            method: 'POST',
            url: '/txapi/imgtx/index',
            params: {
                createid: type || 2,
                img: 'data:image/jpeg;base64,' + base
            }
        }
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let item = content.newslist[0];
            return item.picurl;
        }
    } catch (e) {
        console.log('获取自定义头像失败', e);
    }
}

/**
 * 获取表情包
 * @param {*} msg
 */
async function getEmo(msg) {
    try {
        let option = {
            method: 'POST',
            url: EMOHOST,
            contentType: 'application/json;charset=UTF-8',
            params: {
                name:msg
            }
        }
        let res = await req(option);
        let content = parseBody(res);
        if (content.code === 1) {
            if (content.data && content.data.length > 0) {
                let arr = []
                for (let i of content.data) {
                    if (i.path.includes('.jpg')) {
                        arr.push(i)
                    }
                }
                let item = arr[randomRange(0, arr.length)];
                if (item.path) {
                    return 'http://image.bqber.com/' + item.path
                } else {
                    return 'http://dl.weshineapp.com/gif/20190902/401ed8e703984d504ca1e49ffd4ed8ac.jpg'
                }
            } else {
                return 'http://dl.weshineapp.com/gif/20190902/401ed8e703984d504ca1e49ffd4ed8ac.jpg'
            }
        }
    } catch (e) {
        console.log('获取表情包失败', e);
    }
}


/**
 * 获取美女图片
 */
async function getMeiNv() {
    try {
        let option = {
            method: 'GET',
            url: '/meinv/',
            params: {
                num: 10,
                page: randomRange(1, 99),
            }
        }
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let arr = []
            for (let i of content.newslist) {
                if (i.picUrl.includes('.jpg')) {
                    arr.push(i)
                }
            }
            let item = arr[randomRange(0, arr.length)];
            let url = ''
            if (item.picUrl) {
                url = item.picUrl
            } else {
                url = 'http://dl.weshineapp.com/gif/20190902/401ed8e703984d504ca1e49ffd4ed8ac.jpg'
            }
            return url;
        }
    } catch (e) {
        console.log('获取美女图片失败', e);
    }
}
/**
 * 获取疫情信息
 * @returns {Promise<string>}
 */
async function getNcov() {
    try {
      let option = {
        method: 'GET',
        url: '/txapi/ncov/index',
      }
      let res = await txReq(option);
      let content = parseBody(res);
      if (content.code === 200) {
        let newList = content.newslist[0].news;
        let desc = content.newslist.desc
        let news = '';
        for (let i in newList) {
          let num = parseInt(i) + 1;
          news = `${news}<br>>>${newList[i].pubDateStr}: ${newList[i].title}<br><br>${newList[i].summary}----------------${newList[i].infoSource}<br><br>`;
        }
        return `${news}<br>`;
      }
    } catch(e) {
        console.log('获取疫情数据失败', e)
    }
  }
/**
 * 天行网络取名
 */
async function getCname() {
    try {
        let option = {
            method: 'GET',
            url: '/txapi/cname/index ',
            params: {url: url}
        };
        let res = await txReq(option);
        let content = parseBody(res);
        if (content.code === 200) {
            let item = content.newslist[0];
            let cname = item.name
            return cname;
        }
    } catch (error) {
        console.log('获取天行短连接失败', error);
    }
}
module.exports = {
    getOne,
    getResByTXTL,
    getResByTX,
    getResByTL,
    getTXweather,
    getRubbishType,
    getSweetWord,
    getNews,
    getMingYan,
    getStar,
    getXing,
    getSkl,
    getLunar,
    getGoldReply,
    getXhy,
    getRkl,
    getAvatar,
    getEmo,
    getMeiNv,
    getNcov,
    getCname
};
