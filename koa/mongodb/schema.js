const mongoose = require('./config')
const Schema = mongoose.Schema

let assistant = new Schema({
    subscribe: String, // 订阅者
    setter: String, // 设定任务者
    content: String, // 订阅内容
    time: String, // 定时日期
    isLoop: Boolean, // 是否为循环定时任务
    hasExpired: { type: Boolean, default: false }, // 判断任务是否过期
    createdAt: { type: Date, default: Date.now },
})
let config = new Schema({
    AUTOREPLY:{type:Boolean,default:false}, // 是否开始自动回复模式
    DEFAULTBOT:{type:Number,default:0}, // // 默认机器人 0 天行机器人 1 天行对接的图灵机器人 2 图灵机器人
    TULINGKEY:String,//图灵机器人KEY
    TXAPIKEY:String,// 天行数据key
    DAYLIST:[{
        name:String,
        alias:String,
        memorialDay:String,
        city:String,
        endWord:String,
        date:String
    }],
    ROOMTASKLIST:[{
        roomName:String,
        contentType:Number,
        date:String,
        content:String
    }],
    ROOMLIST:[{
        roomName:String,
        sortId:Number,
        endWord:String,
        date:String
    }],
    ACCEPTFRIEND:[String],
    ROOMJOINLIST:[{
        name:String,
        welcome:String,
        fileObj:String
    }],
    KEYWORDLIST:[{
        key:[String],
        reply:String
    }],
    NEWFRIENDREPLY:String,
    ADDROOMKEYLIST:[{
        key:[String],
        roomName: String
    }],
    EVENTKEYWORDLIST:[{
        key:String,position:String,event:String,
    }],
    UPDATETIME:{type: Date, default: Date.now}
})

module.exports ={
    Assistant:mongoose.model('Assistant', assistant),
    Config:mongoose.model('Config', config)
} 