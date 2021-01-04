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

## 注意
node 版本需要 >=12

## 以web协议运行

1、 注册微秘书平台账号

[注册地址：https://wechat.aibotk.com/#/signup](https://wechat.aibotk.com/#/signup)

注册后个人中心获取`APIKEY`和`APISECRET`备用

2、 克隆本项目，并进入项目根目录

执行 `npm install`安装项目依赖(如果安装比较慢，可以使用` npm i --canvas_binary_host_mirror=https://npm.taobao.org/mirrors/node-canvas-prebuilt/`)

3、配置`APIKEY`和`APISECRET`

代码中配置`APIKEY`和`APISECRET`
```javascript
const { Wechaty } = require('wechaty');
const WechatyWebPanelPlugin = require('wechaty-web-panel');
const name = 'wechat-assistant-pro';
const token = '';
let bot = '';
bot = new Wechaty({
  name, // generate xxxx.memory-card.json and save login data for the next login
});

bot
  .use(WechatyWebPanelPlugin({apiKey: '配置配置微秘书平台APIKEY', apiSecret:'配置配置微秘书平台APISECRET'}))
  .start()
  .catch((e) => console.error(e));

```

4、运行

执行命令`npm run start`，终端会显示二维码，可以直接扫码，也可以到[智能微秘书](https://wechat.aibotk.com)（小助手配置->登录状态中进行扫码登录）

5、配置你需要的功能

在[智能微秘书](https://wechat.aibotk.com)中配置你需要的功能后，给启动的微信发送`更新`关键词即可拉取最新配置（或者你自己设置的更新关键词，初始关键词是`更新`）


## 其他协议运行

如果你拥有了[wechaty](https://github.com/wechaty/wechaty)发放的其他协议token，那么也可以直接使用本项目 （[token申请地址](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)）

1、 注册微秘书平台账号

[注册地址：https://wechat.aibotk.com/#/signup](https://wechat.aibotk.com/#/signup)

注册后个人中心获取`APIKEY`和`APISECRET`备用

2、提前安装依赖

```
npm i -g node-gyp
```

如果是 win 平台，还需进行

```
npm i -g windows-build-tools
```

3、拉取项目，并进到项目根目录

安装依赖 `npm install` (如果安装比较慢，可以使用` npm i --canvas_binary_host_mirror=https://npm.taobao.org/mirrors/node-canvas-prebuilt/`)

4、配置`APIKEY`和`APISECRET`以及`token`
  
  代码中配置`APIKEY`和`APISECRET`以及`token`
  ```javascript
  const { Wechaty } = require('wechaty');
  const WechatyWebPanelPlugin = require('wechaty-web-panel');
  const name = 'wechat-assistant-pro';
  let bot = '';
  // 1、如果没有token请使用以下代码
  // bot = new Wechaty({
    //name, // generate xxxx.memory-card.json and save login data for the next login
  //});
  //
  // // 2、如果有token请使用一下配置
   bot = new Wechaty(
       {
         name,
         puppet: 'wechaty-puppet-hostie',
         puppetOptions: {
           token: '配置你获取的token'
         }
       }
   )
  
  bot
    .use(WechatyWebPanelPlugin({apiKey: '配置微秘书平台APIKEY', apiSecret:'配置配置微秘书平台APISECRET'}))
    .start()
    .catch((e) => console.error(e));

  
  ```

5、运行
  
  执行命令`npm run start`，终端会显示二维码，可以直接扫码，也可以到[智能微秘书](https://wechat.aibotk.com)（小助手配置->登录状态中进行扫码登录）

6、配置你需要的功能

在[智能微秘书](https://wechat.aibotk.com)中配置你需要的功能后，给启动的微信发送`更新`关键词即可拉取最新配置（或者你自己设置的更新关键词，初始关键词是`更新`）


## docker 部署 （推荐）

后续更新...

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
