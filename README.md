[![ 由Wechaty提供 ](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/wechaty/wechaty)
[![node version](https://img.shields.io/badge/node-%3E%3D12-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.50.7-blue.svg)](https://github.com/wechaty/wechaty)
![](https://img.shields.io/badge/Window-green.svg)
![](https://img.shields.io/badge/Mac-yellow.svg)
![](https://img.shields.io/badge/Centos-blue.svg)
[![](https://img.shields.io/badge/Docker-red.svg)]()

## 智能微秘书-插件版

让你闲置的微信号成为你的日常小秘书（没有闲置的也没关系，添加我的小助手微信号，给你分配一个小秘书）。

帮你创建私人定时任务，每日提醒，纪念日提醒，当日提醒。当然基础的给女朋友的每日说功能也是必备的，而且小助手版每日说为那些非常优秀的程序员准备了多女朋友定时发送提醒功能。

同时自带微信机器人功能，群资讯消息定时发送，群定时提醒功能，群机器人聊天，垃圾分类，天气查询，土情话查询，老黄历查询，顺口溜查询等众多功能

## 项目说明

本项目是基于[wechaty](https://github.com/wechaty/wechaty)的个人开源项目，更多关于`wechaty`项目说明及 api 文档可以移步：[wechaty 介绍](https://wechaty.js.org/v/zh/)

## 更多功能说明

移步：[https://www.xkboke.com/web-inn/secretary/client.html](https://www.xkboke.com/web-inn/secretary/client.html)

## 配置

`env.js` 文件中填入智能微秘书的 apiKey 和 apiSecret [注册地址](https://wechat.aibotk.com/#/signup)

## 运行

克隆本项目，并进入项目根目录

第一步 `npm install`

第二步 `npm run pm2`(如果报错 pm2 找不到，请执行`npm install pm2 -g` 后重新执行此步骤)

## 高级功能(无法登录微信网页端朋友的福音)

如果你拥有了[wechaty](https://github.com/wechaty/wechaty)发放的 ipad token，那么也可以直接使用本项目 （[ipad token 申请地址](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)）

### 提前安装依赖

```
npm i -g node-gyp
```

如果是 win 平台，还需进行

```
npm i -g windows-build-tools
```
## 正常部署

一、 安装依赖
```shell script
npm install
```

二、 配置`APIKEY`和`APISECRET`

```
const { Wechaty } = require('wechaty');
const WechatyWebPanelPlugin = require('wechaty-web-panel');
const name = 'wechat-assistant-pro';
const token = '';
let bot = '';
bot = new Wechaty({
  name, // generate xxxx.memory-card.json and save login data for the next login
});

bot
  .use(WechatyWebPanelPlugin({apiKey: '配置APIKEY', apiSecret:'配置apiSecret'})) 
  .start()
  .catch((e) => console.error(e));

```

三、运行

```shell script
npm run start
```

## docker 部署 （推荐）

一、拉取镜像

```shell script
docker pull wechaty/wechaty
```

二、运行镜像

```shell script
docker run -ti --rm --volume="$(pwd)":/bot wechaty/wechaty index.js
```

四、登录智能微助手平台扫码登录即可

登录地址：[https://wechat.aibotk.com/](https://wechat.aibotk.com/)

## 提前体验

如果很不幸你的微信无法登录网页端，同时`ipadtoken`还没有申请通过，请不要伤心，你还有我的小助手可以用来抚慰心伤，扫描下方二维码，我的智能微秘书会自动通过你的申请

![](https://user-gold-cdn.xitu.io/2019/2/28/1693401c6c3e6b02?w=430&h=430&f=png&s=53609)

## 捐助

如果您认为这个项目对你有所帮助，是否可以为它捐助一点资金呢？

不管钱多钱少，您的捐助将会激励我持续开发新的功能！🎉

感谢您的支持！

捐助方法如下：

<div style="display: flex;justify-content: flex-start">
<img width="300" height="350" src="http://image.xkboke.com/web-inn/aibotk-weixin.png" />
<img width="300" height="350" src="http://image.xkboke.com/web-inn/aibotk-alipay.png" />
</div>

## 更新日志

[更新日志](./CHANGELOG.md)
