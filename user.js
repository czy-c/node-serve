const {mysqlServe} = require('./db')
const {v4: uuidv4} = require('uuid')
const express = require('express')
var router = express.Router();
const jwt = require('jsonwebtoken');  
let secret = 'test';	//签名
function generateToken(data) {
    let token = jwt.sign(data,secret);
    return token;
}
const app = express()
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
router.post('/login',function(req,res){
    res.setHeader('content-type', 'application/json')
    const sql = `select * from user_sys where account='${req.body.account}'`
    mysqlServe.query(sql,function(error,result,fields){
        if(result.length==0){
            res.send({'status':'error','message':'当前账号未注册，请注册后重新登录！'})
            return
        };
        if(req.body.password!=result[0].password) {
            res.send({'status':'error','message':'密码错误！'})
            return
        };
        if(result.length==1){
            let data = {'account':req.body.account,'password':req.body.password}
            let userInfo = result[0]
            res.status(200).json({'status':'success','message':'登录成功！','token':generateToken(data),userInfo})
            // res.send({'status':'success','message':'登录成功！'})
        }

    })
})
router.post('/register',function(req,res){
    let sql = 'select * from user_sys where account = '
    let sqlInsert = `INSERT INTO user_sys(name,phone,account,password,uuid) values`
    mysqlServe.query(sql+req.body.account,function(error,result,fields){
        console.log(req.body)
        if(result.length>0){
            res.send({'status':'error','message':'当前账号已被注册'})
        }else{
            mysqlServe.query(sqlInsert+`("${req.body.name}",${req.body.phone},${req.body.account},${req.body.password},"${uuidv4()}")`)
            res.send({'status':'success','message':'注册成功！'})
        }
    })
})
router.get('/getUserInfo',function(req,res){
    let sql = `select * from user_sys where id=${req.query.id}`
    mysqlServe.query(sql,function(error,result,fields){
        res.json(result)
    })
})
module.exports = router;