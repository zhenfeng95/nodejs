/** @format */

const Mock = require('mockjs')
const util = require('./util')
//返回一个函数
module.exports = function(app) {
  //监听http请求
  app.get('/user/userinfo', function(rep, res) {
    //每次响应请求时读取mock data的json文件
    //util.getJsonFile方法定义了如何读取json文件并解析成数据对象
    var json = util.getJsonFile('./userInfo.json')
    //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(json))
  })
  app.post('/login', function(rep, res) {
    var json = util.getLogin('./login.json')
    res.json(Mock.mock(json))
  })
}
