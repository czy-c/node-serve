const {mysqlServe} = require('./db')
const express = require('express')
const router = express.Router()

router.get('/getMyFriends',function(req,res){
    let sql = `select * from user_sys`;
    mysqlServe.query(sql,function (error,result,fields){
        res.json(result)
    })
})
module.exports = router