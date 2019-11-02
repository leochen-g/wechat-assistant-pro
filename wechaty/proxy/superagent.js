const superagent = require('superagent');
/**
 * 封装get请求
 * @param {*} url 地址
 * @param {*} params 参数
 * @param {*} contentType 发送请求数据类型
 */
function get(url, params, contentType = 'application/x-www-form-urlencoded') {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .query(params)
      .set('Content-Type', contentType)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
}

/**
 * 封装post请求
 * @param {*} url 地址
 * @param {*} params 参数
 * @param {*} contentType 发送请求数据类型
 */
function post(url, params, contentType = 'application/x-www-form-urlencoded') {
  return new Promise((resolve, reject) => {
    superagent
      .post(url)
      .send(params)
      .set('Content-Type', contentType)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
}

function req(option) {
  if (!option) return;
  if (option.method == 'POST') {
    return post(option.url, option.params, option.contentType);
  } else {
    return get(option.url, option.params, option.contentType);
  }
}
module.exports = {
  req
}
