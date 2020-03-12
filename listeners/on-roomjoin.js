const reload = require('auto-reload')
const config = reload('../wechat.config');
const { addRoomWelcomeSay} = require('../lib/index');
/**
 * 判断配置中是否存在此群
 * @param {*} arr 配置的群组
 * @param {*} name 有新人的群名
 * @return {*} 配置中此群的下标，不存在此群返回-1
 */
function roomHasConfig(arr,name){
  if(arr.length == 0) return -1
  for(let i in arr){
    if (arr[i].roomName == name) return i
   }
   return -1
}
/**
 * 群中有新人进入
 */
async function onRoomjoin (room, inviteeList, inviter, date){
  const nameList = inviteeList.map(c => c.name()).join(',')
  const roomName = await room.topic()
  const roomIndex = roomHasConfig(config.roomJoinKeywords,roomName)
  console.log('jinqun', roomName, roomIndex, nameList)
  if (roomIndex>-1) {
      const { welcomes } = config.roomJoinKeywords[roomIndex]
      console.log(`群名： ${roomName} ，加入新成员： ${nameList}, 邀请人： ${inviter}`)
      for(const item of welcomes) {
        await addRoomWelcomeSay(room, roomName,nameList, item)
      }
  }
}

module.exports = onRoomjoin
