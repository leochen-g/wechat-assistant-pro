// 本文件是配置案例文件，请拷贝一份此文件后重命名为config.js，否则项目无法运行
module.exports = {
  AUTOREPLY: false, // 是否设置机器人自动回复，默认关闭 false  开启为 true
  DEFAULTBOT: '0', // 默认机器人 0 天行机器人 1 天行对接的图灵机器人 2 图灵机器人
  TULINGKEY: '', //图灵机器人KEY
  TXAPIKEY: '762be789103e1ae7b65573f8d4fc0df6',// 必填，天行数据key，目前贡献的是我个人的，建议申请自己的天行数据key，可以对机器人个性化定制
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
    {name:'昵称',alias:'备注',memorialDay:'2015/04/18',city:'上海',endWord:'爱你的朋友Leo_chen',date:'0 0 8 * * *'},
  ],

  /**
   * 群定时任务列表（支持多群配置）
   * roomName: 群名
   * sortId: 新闻资讯类别id （详情参见README.md数据字典）
   * endword: 结尾备注 ‘————————小助手雷欧’
   * date:每天定时的发送时间，案例中代表每天早上7点30分，具体规则见‘wechaty/lib/index.js’(多个群不要设置相同时间！不要设置相同时间！不要设置相同时间！)
   */
  ROOMLIST: [
    {roomName:'群名',sortId:22,endWord:'小助手雷欧',date:'0 30 7 * * *'},
  ],
   /**
    * 自动添加好友关键词，留空代表同意任何好友请求 
    */
  ACCEPTFRIEND: [],
  /**
   * 好友进群通知，可配置多个
   */
  ROOMJOINLIST: [{name:'群名',welcome:'有什么问题都可以群里提出，大家都是很热情的'}],
  /**
   * 关键词回复列表
   * key: 多个关键词触发相同内容，非模糊匹配，为全匹配
   * reply: 回复内容
   */ 
  KEYWORDLIST:[{key:['你好','您好'],reply:'你好啊，我是小助手雷欧'}],
  /**
   * 新通过好友，默认发送消息
   */
  NEWFRIENDREPLY: '你好，请问有什么可以帮助的',
  /**
   * 关键词加群配置
   * key: 多个关键词触发相加群操作，全匹配
   * roomName: 发送邀请的群名
   */
  ADDROOMKEYLIST:[
    {key:['加群'],roomName:'群名'}
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
  ],  
}