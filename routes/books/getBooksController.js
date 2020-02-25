const db = require('../../database.js');

const orderByArray = ['book_id','title','author','description','image','date'];

module.exports.getBooks = async (ctx, next) => {
    const page = ctx.request.query.page;
    const pageSize = ctx.request.query.pageSize;
    let orderBy = ctx.request.query.orderBy;
    if (page === null || pageSize === null) {
        ctx.body = {error: "query page or pageSize is empty"};
    } else {
        if(page < 0 || pageSize < 1 || pageSize > 30){
            ctx.body = {error: "query page or pageSize is wrong"};
        }else{
            if(orderBy === undefined){
                orderBy = 'book_id'
            }
            if(orderByArray.includes(orderBy)){
                const result = await db.getBooks({page: ctx.request.query.page, pageSize: ctx.request.query.pageSize, orderBy: orderBy});
                ctx.body = JSON.stringify(result);
            }else{
                ctx.body = {error: "order by is wrong"};
            }
        }
    }
    next();
};
