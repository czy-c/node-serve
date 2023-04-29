const express = require("express");

const cookieParser = require('cookie-parser')  
const cors = require("cors");

const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const {r,a} = require('./Reptile')
// require('./user')
const bodyParser = require('body-parser');
require('./webSocket')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(cookieParser())
app.use('/api',require("./user"))
app.use('/api',require("./myFriend"))
app.use('/api',require("./messageList"))
// app.use('/api',require("./getUserInfo"))



app.get("/demo", function (req, res) {
    console.log(r(1,2),a('https://www.tusij.com/pic/2-579-0-0-0-1.html','#masonry .box',2,1))
    new Promise((resolve,reject)=>{
        // var result = [];
        // request({
        //    url:'https://www.tusij.com/pic/2-579-0-0-0-1.html',
        //    method:'get'
        // },function (e,r,b) {
        //    if(e||!b) return;
        //    let $_ = cheerio.load(b);
        //    $_("#masonry .box").each(function(){
        //        let titleValue = $_(this).find('.text').text()
        //        let urlValue = $_(this).find('img').attr('src')
        //        result.push({
        //            title: titleValue,
        //            url: urlValue
        //        })
        //        mysqlServe.query(`INSERT INTO gifCollection(title,url) values("${titleValue}","${urlValue}")`)
        //     })
        resolve(100)
        // })
    }).then(result=>{

        //向客户端发送 JSON  对象
    })
    res.send({1:1});
});


app.listen("3001", () => {
  console.log("已启动  http://127.0.0.1:3001");
});
