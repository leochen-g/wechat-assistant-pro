[![ 由Wechaty提供 ](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/wechaty/wechaty)
[![node version](https://img.shields.io/badge/node-%3E%3D16-blue.svg)](http://nodejs.cn/download/)
![](https://img.shields.io/badge/Window-green.svg)

# 智能微秘书客户端-windows 协议使用

## 关于puppet-engine windows协议

puppet-engine是为了适配市面支持http调用的IM接口而产生的一款puppet，名称来源Wechaty作者@Huan，此puppet作为一个引擎模版，可以引入一个ts文件，来
达到适配多种http IM协议,只能部署在windows环境下

## 优势

* 支持发送接收小程序和H5链接
* 不掉线稳定，只要你windows电脑一直开着就可以
* Wechaty所有基础方法均支持，堪比目前的ipadLocal协议

## 文件下载

环境：只支持windows环境，建议win10 及以上

node: node>= v18

所有部署包下载：qq群文件(群号:1045575073)

## win安装包运行

下载部署包，内容包含

![Untitled](https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_001.png)

### 启动调试服务

1、安装3.7版本微信，如果之前已经安装过微信就直接覆盖安装即可

2、进入到wxapi3.7.0.30 目录中，双击启动hook工具

![Untitled](https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_002.png)

3、启动后确认hook的端口是否是8055，如果确定是，直接点击启动微信即可，扫码登录微信

![Untitled](https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_003.png)

4、安装并启动微秘书客户端

![Untitled](https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_004.png)

5、后续步骤和之前一样，填入微秘书平台的apikey 和apisecret  启动即可，默认端口保持不动

- 注意：启动后看有没有输出日志即可，由于新协议可能有部分功能未兼容完全，会存在报错，如果不影响正常使用的话就可以忽略。如果报错无法使用，建议先重启微秘书客户端或者hook工具。


### 启动微秘书客户端

1、下载微秘书客户端

客户端地址：[下载](https://github.com/leochen-g/wechat-assistant-pro/releases)

![](https://img.aibotk.com/picgo/202301141934379.png)

2、下载后双击运行

![](https://img.aibotk.com/picgo/202301141956404.png)

3、运行后对话日志回出现在右侧

![](https://img.aibotk.com/picgo/202301141958377.png)


## 源码运行

> 选择一种方式运行即可，源码或者 win 安装包

#### Step 1: 安装

克隆本项目，并进入项目根目录执行 `npm install`安装项目依赖

#### Step 2: 配置

根目录`windows.js`代码中配置`APIKEY`和`APISECRET`，端口号可以不改，使用默认就行

#### Step 3: 运行

执行命令`npm run startWin`即可
