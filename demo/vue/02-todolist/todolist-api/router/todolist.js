const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const hd = require('../router-handler/todolist')
const { add_info_sc, update_info_sc } = require('../schema/todolist')
// 获取信息
router.get('/getlist', hd.getlist)
// 增加信息
router.post('/addlist', expressJoi(add_info_sc), hd.addlist)
// 更新信息
router.post('/updatelist', expressJoi(update_info_sc), hd.updatelist)
// 删除信息
router.get('/deletelist/:id', hd.deletelist)
// 删除已完成的
router.post('/deletok', hd.deletok)

module.exports = router
