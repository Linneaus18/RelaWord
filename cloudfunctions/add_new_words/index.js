// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()

  if (event.word1 == undefined || event.word2 == undefined) {
    var result = {
      errCode: 1,
      errMsg: '没传两个词语',
    }
    return result
  }

  var word1
  var word2
  var id1
  var id2

  await db.collection('word')
  .where({
    word: event.word1
  })
  .get()
  .then(res => {
    console.log('查词成功')
    word1 = res.data[0]
  })
  if (word1 == undefined) {
    await db.collection('word')
    .count()
    .then(res => {
      id1 = res.total + 1
    })
    // 新加一条记录
    to_add_data = {
      hot: 0,
      id: id1,
      word: event.word1
    }
    await db.collection('word')
    .add({
      data: to_add_data
    })
    .then(res => {
      console.log(res)
    })
  }
  else {
    id1 = word1.id
  }

  await db.collection('word')
  .where({
    word: event.word2
  })
  .get()
  .then(res => {
    console.log('查词成功')
    word2 = res.data[0]
  })
  if (word2 == undefined) {
    id2 = id1 + 1
    to_add_data = {
      hot: 0,
      id: id2,
      word: event.word2
    }
    await db.collection('word')
    .add({
      data: to_add_data
    })
    .then(res => {
      console.log(res)
    })
  }
  else {
    id2 = word2.id
  }


  // 添加近义词记录
  var id_new
  await db.collection('word_similar_relation')
  .count()
  .then(res => {
     id_new = res.total + 1
  })
  if (id_new == undefined || id1 == undefined || id2 == undefined) {
    var result = {
      errCode: 1,
      errMsg: '添加失败，请重试',
    }
    return result
  }
  to_add_data = {
    correlation: 0,
    id: id_new,
    type: 1,
    word_id: id1,
    word_name: event.word1,
    similar_word_id: id2,
    similar_word_name: event.word2,
  }
  await db.collection('word_similar_relation')
  .add({
    data: to_add_data
  })
  .then(res => {
    console.log(res)
  })


  // 成功
  var result = {
    errCode: 0,
  }
  return result
}