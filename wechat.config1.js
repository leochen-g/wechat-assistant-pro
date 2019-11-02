// 本文件是配置案例文件，请拷贝一份此文件后重命名为config.js，否则项目无法运行
module.exports = {
  AUTOREPLY: true, // 是否设置机器人自动回复，默认关闭 false  开启为 true
  DEFAULTBOT: '1', // 默认机器人 0 天行机器人 1 天行对接的图灵机器人 2 图灵机器人
  TULINGKEY: '1065ca6daa614c12b15d730f3a2b33dd', //图灵机器人KEY
  TXAPIKEY: '036ca1b5371d6ffc668a05fce44a2d7c',// 天行数据key
  /**
   * 每日说定时任务（支持多人）
   * name:要发送好友的昵称 （注：不是微信号！不是微信号！不是微信号！）
   * alias:要发送好友的备注（默认查找备注优先，防止昵称带表情特殊字符）
   * memorialDay:你与朋友的纪念日
   * city:朋友所在城市，写的时候不要带‘市’
   * endWord:每日说内容的最后的落款 案例中效果为‘——————————爱你的朋友Leo_chen’
   * date:每天定时的发送时间，案例中代表每天早上8点钟，具体规则见‘wechaty/lib/index.js’ (多个好友不要设置相同时间！不要设置相同时间！不要设置相同时间！)
   */ 
  DAYLIST: [
    {name:'嗯哼',alias:'A兔子',memorialDay:'2015/04/18',city:'上海',endWord:'最爱你的庚',date:'0 10 8 * * *'},
  {name:'Leo_chen',alias:'Leo_chen',memorialDay:'2019/02/12',city:'上海',endWord:'贴心的小助手',date:'0 30 8 * * *'},
  ],

  /**
   * 群定时任务列表（支持多群配置）
   * roomName: 群名
   * sortId: 新闻资讯类别id （详情参见README.md数据字典）
   * endword: 结尾备注 ‘————————小助手雷欧’
   * date:每天定时的发送时间，案例中代表每天早上7点30分，具体规则见‘wechaty/lib/index.js’(多个群不要设置相同时间！不要设置相同时间！不要设置相同时间！)
   */
  ROOMLIST: [
    {roomName:'微信每日说',sortId:22,endWord:'小助手雷欧',date:'0 0 8 * * *'},
    {roomName:'微信机器人小助手交流',sortId:13,endWord:'小助手雷欧',date:'0 30 8 * * *'},
  {roomName:'我们的家',sortId:17,endWord:'家庭小助手',date:'0 15 8 * * *'},
  {roomName:'319佑E家',sortId:22,endWord:'小助手雷欧',date:'0 20 8 * * *'},
  ],
   /**
    * 自动添加好友关键词，留空代表同意任何好友请求 
    */
  ACCEPTFRIEND: [],
  /**
   * 好友进群通知，可配置多个
   */
  ROOMJOINLIST: [
    {name:'微信每日说',welcome:'有什么问题都可以群里提出，大家都是很热情的'},
    {name:'微信机器人小助手交流',welcome:'欢迎进入微信小助手交流群，有任何对项目的想法都可以提出来，如果项目启动存在问题，请先查看README中的问题解决方案'},
  ],
  /**
   * 关键词回复列表
   * key: 多个关键词触发相同内容，非模糊匹配，为全匹配
   * reply: 回复内容
   */ 
  KEYWORDLIST:[{key:['你好','您好'],reply:'你好啊，我是小助手雷欧'}],
  /**
   * 新通过好友，默认发送消息
   */
  NEWFRIENDREPLY: '1、回复关键词“加群”<br>2、或回复“提醒 我 18:30 下班回家”，创建你的专属提醒<br>3、如试用过程中遇到问题，可回复关键词“联系作者”添加作者微信，此账号为机器人小号，不做任何回复<br>更多功能查看https://github.com/gengchen528/wechat-assistant',
  /**
   * 关键词加群配置
   * key: 多个关键词触发相加群操作，全匹配
   * roomName: 发送邀请的群名
   */
  ADDROOMKEYLIST:[
    {key:['加群','微信每日说'],roomName:'微信每日说'},
    {key:['小助手'],roomName:'微信机器人小助手交流'}
  ],
  /**
   * 关键词触发指定事件，适用于私聊与群聊
   * key: 关键词
   * position: 关键词所在位置 start 开头  middle 不限 end 结尾
   * event: 触发事件名称，更多查看事件字典
   */
  EVENTKEYWORDLIST:[
    {key:'?',position:'start',event:'rubbish'},
    {key:'？',position:'start',event:'rubbish'},
    {key:'是什么垃圾',position:'end',event:'rubbish'},
    {key:'名人名言',position:'middle',event:'mingyan'},
    {key:'*',position:'start',event:'star'},
    {key:'姓',position:'start',event:'xing'},
    {key:'姓',position:'end',event:'xing'},
    {key:'名人名言',position:'middle',event:'mingyan'},
    {key:'黄历',position:'start',event:'lunar'},
    {key:'神回复',position:'middle',event:'goldreply'},
    {key:'歇后语',position:'middle',event:'xhy'},
    {key:'绕口令',position:'middle',event:'rkl'},
    {key:'顺口溜',position:'middle',event:'skl'},
    {key:'我要国旗',position:'start',event:'avatar'},      
    {key:'表情包',position:'start',event:'emo'},
    {key:'美女图',position:'start',event:'meinv'}
  ],  
}
