const {mysqlServe} = require('./db')
const express = require('express')
var router = express.Router();
router.get('/getMessage',function(req,res){
    // res.json(req.query)
    // console.log(req.query)
    let sql = `select * from chat_message where toId=${req.query.toId} and fromId=${req.query.fromId} or toId=${req.query.fromId} and fromId=${req.query.toId}`
    mysqlServe.query(sql,function(error,result,fields){
        // console.log(result);
        res.json(result)
    })
})
module.exports = router