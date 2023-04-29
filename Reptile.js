const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const {mysqlServe} = require('./db')
function r(url,father) {
    return url+'and'+father
}
function a(url,father,...rest) {
    console.log(rest)
    var result = [];
    request({
       url:url,
       method:'get'
    },function (e,r,b) {
       if(e||!b) return;
       let $_ = cheerio.load(b);
       $_(father).each(function(){
           let titleValue = $_(this).find('.text').text()
           let urlValue = $_(this).find('img').attr('src')
           result.push({
               title: titleValue,
               url: urlValue
           })
           mysqlServe.query(`INSERT INTO gifCollection(title,url) values("${titleValue}","${urlValue}")`)
        })
        // console.log(result)
    })
    return result
}
// console.log(result)
module.exports = {r,a}