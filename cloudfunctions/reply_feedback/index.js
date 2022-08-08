// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  /** 是否获取了用户openid start */
  const wxContext = cloud.getWXContext()
  console.log(wxContext)
  if(wxContext.OPENID == undefined){
    // 返回执行结果
    var result = {}
    result.errCode = 1
    result.errMsg = '未能正确获取到用户的openid，请退出小程序重试'
    var data = {}
    result.data = data
    return result
  }
  /** 是否获取了用户openid end */

  var date = new Date(Date.now() + (8 * 60 * 60 * 1000))
  var str_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()

  const sendResult = await cloud.openapi.subscribeMessage.send({
    touser: event.openid,
    templateId: event.templateId,
    miniprogram_state: 'developer',
    // 此处字段应修改为所申请模板所要求的字段
    data: {
      thing1: {
        value: 'Linneaus',
      },
      thing2: {
        value: event.content,
      },
      time3: {
        value: str_date,
      },
    }
  })

  return sendResult

}