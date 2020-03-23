

[![ 由Wechaty提供 ](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)

[![node version](https://img.shields.io/badge/node-%3E%3D10-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.26-blue.svg)](https://github.com/Chatie/wechaty)
![](https://img.shields.io/badge/Window-green.svg)
![](https://img.shields.io/badge/Mac-yellow.svg)
![](https://img.shields.io/badge/Centos-blue.svg)


## 智能微秘书3.0全新改版

让你闲置的微信号成为你的日常小秘书（没有闲置的也没关系，添加我的小助手微信号，给你分配一个小秘书）。

帮你创建定时任务，每日提醒，纪念日提醒，当日提醒。当然基础的给女朋友的每日说功能也是必备的，而且小助手版每日说为那些非常优秀的程序员准备了多女朋友定时发送提醒功能。同时自带微信机器人功能，群资讯消息定时发送，群机器人聊天，垃圾分类，天气查询，土情话查询，老黄历查询，顺口溜查询等众多功能

## 配置端
`env.js` 文件中填入智能微秘书的apiKey 和 apiSecret [注册地址](https://wechat.aibotk.com/#/signup)

## 运行

项目根目录

第一步 `npm install`

第二步 `npm run pm2`(如果报错pm2找不到，请执行`npm install pm2 -g` 后重新执行此步骤)

## 高级配置

如果你拥有了wechaty发放的ipad token，那么也可以直接使用本项目

### 提前安装依赖

```
npm i -g node-gyp
```

如果是win平台，还需进行


``` 
npm i -g windows-build-tools 
```

### 配置ipad token