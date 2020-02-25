const Koa = require('koa');
const koaBody = require('koa-body');
const json = require('koa-json');
const logger = require('koa-logger');
const appConfig = require('./appConfig');

const app = new Koa();

const booksRouter = require('./routes/books/index.js');

app.use(json());
app.use(koaBody());

app.use(booksRouter.routes()).use(booksRouter.allowedMethods());

app.listen(appConfig.serverPort, () => {
    console.log(`Server started on http://localhost:${appConfig.serverPort}}`);
});
