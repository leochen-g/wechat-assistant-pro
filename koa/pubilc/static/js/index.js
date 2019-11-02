;(function () {
    var app = new Vue({
        el: '#app',
        data() {
            return {
                title: '小助手',
                dayListInit: {name: '', alias: '', memorialDay: '', city: '', endWord: '', cycle: 'day', day: '1', time: ''},
                roomListInit: {roomName: '', sortId: '', endWord: '', cycle: 'day', day: '1', time: ''},
                roomTaskListInit:{roomName:'',contentType:'',cycle:'day',day:'1',time:'',content:''},
                roomJoinListInit: {name: '', welcome: '',fileObj:''},
                keyWordListInit: {key: '', reply: ''},
                addRoomKeyListInit: {key: '', roomName: ''},
                eventKeywordListInit: {key: '', position: 'start', event: ''},
                contentTypeList:{1:'文字',2:'文件'},
                newList: {
                    5: '社会新闻',
                    7: '国内新闻',
                    8: '国际新闻',
                    10: '娱乐新闻',
                    11: '美女图片',
                    12: '体育新闻',
                    13: '科技新闻',
                    14: '奇闻异事',
                    17: '健康知识',
                    18: '旅游资讯',
                    38: '汉服新闻',
                    37: '房产新闻',
                    36: '科学探索',
                    35: '汽车新闻',
                    34: '互联网资讯',
                    33: '动漫资讯',
                    32: '财经新闻',
                    31: '游戏资讯',
                    30: 'CBA新闻',
                    29: '人工智能',
                    28: '区块链新闻',
                    27: '军事新闻',
                    26: '足球新闻',
                    24: '创业新闻',
                    23: '移动互联',
                    22: 'IT资讯',
                    21: 'VR科技'
                },
                position: {
                    start: "从头开始匹配",
                    end: "从结尾开始匹配",
                    middle: '任意位置匹配'
                },
                eventList: {
                    rubbish: '垃圾分类',
                    mingyan: '名人名言',
                    star: '星座运势',
                    xing: '姓氏起源',
                    lunar: '老黄历查询',
                    goldreply: '神回复',
                    rkl: '绕口令',
                    skl: '顺口溜',
                    avatar: '我要国旗',
                    emo: '获取表情包',
                    meinv: '获取美女图',
                    updateConfig:'更新配置文件',
                    restart:'重启项目'
                },
                formData: {
                    AUTOREPLY: false, // 是否设置机器人自动回复，默认关闭 false  开启为 true
                    DEFAULTBOT: '1', // 默认机器人 0 天行机器人 1 天行对接的图灵机器人 2 图灵机器人
                    TULINGKEY: '1065ca6daa614c12b15d730f3a2b33dd', //图灵机器人KEY
                    TXAPIKEY: '036ca1b5371d6ffc668a05fce44a2d7c',// 天行数据key
                    DAYLIST: [],
                    ROOMLIST: [],
                    ROOMTASKLIST:[],
                    ACCEPTFRIEND: [],
                    ROOMJOINLIST: [],
                    KEYWORDLIST: [{key: ['你好', '您好'], reply: '你好啊，我是小助手雷欧'}],
                    NEWFRIENDREPLY: "1、回复关键词“加群”<br>2、或回复“提醒 我 18:30 下班回家”，创建你的专属提醒<br>3、如试用过程中遇到问题，可回复关键词“联系作者”添加作者微信，此账号为机器人小号，不做任何回复<br>更多功能查看https://github.com/gengchen528/wechat-assistant",
                    ADDROOMKEYLIST: [
                        {key: ['加群', '微信每日说'], roomName: '微信每日说'},
                    ],
                    EVENTKEYWORDLIST: [
                        {key: '更新配置文件', position: 'start', event: 'updateConfig'},
                        {key: '重启小助手', position: 'start', event: 'restart'}
                    ],
                }
            }
        },
        mounted() {
            this.initDate()
            this.getConfig()
        },
        methods: {
            spiltKey(str){
                return str.split('|')
            },
            deepCopy(fromObj,toObj){
                // 容错
                if(fromObj === null) return null // 当fromObj为null
                if(fromObj instanceof RegExp) return new RegExp(fromObj) // 当fromObj为正则
                if(fromObj instanceof Date) return new Date(fromObj) // 当fromObj为Date

                toObj = toObj || {}

                for(let key in fromObj){ // 遍历
                    if(typeof fromObj[key] !== 'object'){ // 是否为对象
                        toObj[key] = fromObj[key] // 如果为普通值，则直接赋值
                    }else{
                        if(fromObj[key] === null){
                            toObj[key] = null
                        }else{
                            toObj[key] = new fromObj[key].constructor // 如果为object，则new这个object指向的构造函数
                            deepCopy(fromObj[key],toObj[key]) // 递归
                        }
                    }
                }
                return toObj
            },
            initTask(type){
                let that = this
                let obj = {
                    dayListInit: {name: '', alias: '', memorialDay: '', city: '', endWord: '', cycle: 'day', day: '1', time: ''},
                    roomListInit: {roomName: '', sortId: 0, endWord: '', cycle: 'day', day: '1', time: ''},
                    roomTaskListInit:{roomName:'',contentType:'',cycle:'day',day:'1',time:'',content:''},
                    roomJoinListInit: {name: '', welcome: '',fileObj:''},
                    keyWordListInit: {key: '', reply: ''},
                    addRoomKeyListInit: {key: '', roomName: ''},
                    eventKeywordListInit: {key: '', position: 'start', event: ''},
                }
                that[type]=obj[type]
            },
            filterWeek(num) {
                let weekList = {
                    0: '日',
                    1: '一',
                    2: '二',
                    3: '三',
                    4: '四',
                    5: '五',
                    6: '六',
                    7: '日',
                }
                return weekList[num]
            },
            convertToFormat(cycle, time, day) {
                let timeArray = time.split(':')
                let cycleTime = ''
                if (cycle == 'day') {
                    cycleTime = `${timeArray[2]} ${timeArray[1]} ${timeArray[0]} * * *`
                } else if (cycle == 'week') {
                    cycleTime = `${timeArray[2]} ${timeArray[1]} ${timeArray[0]} * * ${day}`
                } else if (cycle == 'month') {
                    cycleTime = `${timeArray[2]} ${timeArray[1]} ${timeArray[0]} ${day} * *`
                }
                return cycleTime
            },
            convertFormatToDate(cycle) {
                let arr = cycle.split(' ')
                let time = `${arr[2]}:${arr[1]}:${arr[0]}`
                if (arr[3] !== '*') {
                    return `每月${arr[3]}号 ${time}`
                } else if (arr[5] !== '*') {
                    return `每周${this.filterWeek(arr[5])} ${time}`
                } else {
                    return `每天 ${time}`
                }
            },
            initDate() {
                let that = this
                laydate.render({
                    elem: '#memorial', //指定元素
                    format: 'yyyy/MM/dd',
                    value:'',
                    done: function(value, date, endDate){
                        that.dayListInit.memorialDay = value
                    }
                })
                laydate.render({
                    elem: '#cycle-date', //指定元素
                    type: 'time',
                    value:'',
                    done: function(value, date, endDate){
                       that.dayListInit.time = value
                    }
                })
                laydate.render({
                    elem: '#cycle-date-room', //指定元素
                    type: 'time',
                    value:'',
                    done: function(value, date, endDate){
                        that.roomListInit.time = value
                    }
                })
                laydate.render({
                    elem: '#cycle-task-date-room', //指定元素
                    type: 'time',
                    value:'',
                    done: function(value, date, endDate){
                        that.roomTaskListInit.time = value
                    }
                })
            },
            getConfig() {
                let that = this
                let req = {}
                axios.get('/api/getConfig', req).then(res => {
                    console.log(res.data.data);
                    if(res.data.code==200){
                        that.formData = res.data.data
                    }else {
                        alert('请先配置文件后再启动小助手')
                    }
                })
            },
            saveConfig() {
                let that = this
                let req = {
                    data:that.formData
                }
                axios.post('/api/updateConfig',req).then(res=>{
                    console.log('更新结果',res.data)
                    that.getConfig()
                    alert('更新成功，请在手机端微信向小助手发送更新配置命令')
                })
            },
            addDayTask(type,to) {
                let that = this
                let dayTask = that[type]
                let obj = {
                    ...dayTask
                }
                if(type=='dayListInit'||type=='roomListInit'||type=='roomTaskListInit'){
                    obj.date = that.convertToFormat(dayTask.cycle, dayTask.time, dayTask.day)
                }
                if(type=='keyWordListInit' || type == 'addRoomKeyListInit'){
                    obj.key = that.spiltKey(dayTask.key)
                }
                that.formData[to].push(obj)
                that.initTask(type)
            },
            deleteItem(index,type) {
                let that = this
                that.formData[type].splice(index,1)
            }
        }
    })
}());
