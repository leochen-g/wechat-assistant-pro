const schedule = require('node-schedule')
const fs =require('fs')


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

function setSchedule(date, callback) {
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
function getConstellation(astro){
  if(astro.includes('白羊座')){
    return 'aries'
  }
  if(astro.includes('金牛座')){
    return 'taurus'
  }
  if(astro.includes('双子座')){
    return 'gemini'
  }
  if(astro.includes('巨蟹座') || astro.includes('钜蟹座')){
    return 'cancer'
  }
  if(astro.includes('狮子座')){
    return 'leo'
  }
  if(astro.includes('处女座')){
    return 'virgo'
  }
  if(astro.includes('天平座') || astro.includes('天秤座') || astro.includes('天瓶座') || astro.includes('天枰座')){
    return 'libra'
  }
  if(astro.includes('天蝎座')){
    return 'scorpio'
  }
  if(astro.includes('射手座')){
    return 'sagittarius'
  }
  if(astro.includes('射手座')){
    return 'sagittarius'
  }
  if(astro.includes('摩羯座')){
    return 'capricorn'
  }
  if(astro.includes('水瓶座')){
    return 'aquarius'
  }
  if(astro.includes('双鱼座')){
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
async function writeFile(fpath,encoding){
  return new Promise(function(resolve,reject){
    fs.writeFile(fpath,encoding,function(err,content){
      if(err){
        reject(err)
      } else {
        resolve(content)
      }
    })
  })
}

module.exports = {
  setSchedule,
  delay,
  getToday,
  convertTime,
  getDay,
  formatDate,
  isRealDate,
  getConstellation,
  randomRange,
  writeFile
};
