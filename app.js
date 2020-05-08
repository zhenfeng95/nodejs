'use strict'

const http = require('http')
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('9595')
}).listen(9595)
console.log('listen 9595')

// var Koa = require('Koa')
// var app = new Koa()

// app.use(async ctx => {
//     console.log(ctx)
//     if (ctx.originalUrl === '/' || ctx.originalUrl === '') {
//         ctx.body = 'Hello World';
//     } else {
//         ctx.body = ctx.path.slice(1);
//     }
//   });

// app.listen(9595)