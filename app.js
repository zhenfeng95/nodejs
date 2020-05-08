'use strict'

var Koa = require('Koa')
var app = new Koa()

app.use(async ctx => {
    console.log(ctx)
    if (ctx.originalUrl === '/' || ctx.originalUrl === '') {
        ctx.body = 'Hello World';
    } else {
        ctx.body = ctx.path.slice(1);
    }
  });

app.listen(9595)
console.log('listen 9595')