const Koa = require('koa')
const rest = require('./rest');
const controller = require('./controller');
const bodyParser = require('koa-bodyparser')

const config = require('./config')
const app = new Koa()
// var cors = require('koa2-cors');
// app.use(cors)

const port = process.env.PORT || config.port || 3000
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser());

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());

app.listen(port);
console.log('app started at port ' + port);


