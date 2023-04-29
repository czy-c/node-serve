const ws = require("nodejs-websocket");
const {mysqlServe} = require('./db')
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3002 });

wss.on('connection', function connection(ws) {
  console.log('New client connected');

  ws.on('message', function (message) {
    let a = JSON.parse(message)
    let sql = `INSERT INTO chat_message(message,time,toId,fromId) VALUES ("${a.message}","1",${a.toId},${a.id})`
    mysqlServe.query(sql)
    let sqlRecord = `select * from chat_message where toId=${a.toId} and fromId=${a.id} or toId=${a.id} and fromId=${a.toId}`
    mysqlServe.query(sqlRecord,function(error,result,fields){
        // console.log(result)
        wss.clients.forEach((client) => {
            //判断非自己的客户端
            console.log(client)
            if (client.readyState === WebSocket.OPEN){
              client.send(JSON.stringify(result))
            }
          }) 
    })
  });

  ws.send('');
});