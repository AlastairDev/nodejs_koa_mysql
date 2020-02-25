const db = require('../../database.js');

module.exports.editBook = async (ctx, next) => {
    const id = ctx.request.query.id;
    const column = ctx.request.query.column;
    const value = ctx.request.query.value;
    if (id === undefined || column === undefined || value === undefined) {
        ctx.body = {error: "id or column or value undefined"};
        return next();
    } else {
        await db.updateBook({id: id, column: column, value: value}).then(()=>{
            ctx.body = {status: "edited"};
        });
    }
    return next();
};
