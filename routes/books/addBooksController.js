const db = require('../../database.js');

module.exports.addBook = async (ctx, next) => {
    const title = ctx.request.query.title;
    const author = ctx.request.query.author;
    const description = ctx.request.query.description;
    const image = ctx.request.query.image;
    const date = ctx.request.query.date;
    if (title === undefined || author === undefined || description === undefined || image === undefined || date === undefined) {
        ctx.body = {error: "title or author or description or image or date undefined"};
        return next();
    } else {
        await db.addBook({
            title: title,
            author: author,
            description: description,
            image: image,
            date: date
        }).then(() => {
            ctx.body = {status: "added"};
            return next();
        });
    }

};
