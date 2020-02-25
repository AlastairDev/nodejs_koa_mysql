const db = require('../../database.js');

module.exports.initDatabaseData = async (ctx, next) => {
    const results = await db.initBooks();
    console.log(results);
    ctx.body = results;
    next();
};

module.exports.createTable = async (ctx, next) => {
    const results = await db.createTable();
    console.log(results);
    ctx.body = results;
    next();
};

module.exports.createDatabase = async (ctx, next) => {
    const results = await db.createDatabase();
    console.log(results);
    ctx.body = results;
    next();
};

