const mysql = require('mysql');
const appConfig = require('./appConfig');

const pool = mysql.createPool({
    host: appConfig.database.HOST,
    user: appConfig.database.USERNAME,
    password: appConfig.database.PASSWORD,
    database: appConfig.database.DATABASE,
    port: appConfig.database.PORT
});

exports.getBooks = async (params) => {
    return new Promise(function (resolve, reject) {
        const numPerPage = parseInt(params.pageSize, 10) || 1;
        const page = parseInt(params.page, 10) || 0;
        const skip = page * numPerPage;
        const orderBy = params.orderBy;
        const sql = `SELECT * FROM books ORDER BY ? LIMIT ?,?;`;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            connection.query(sql, [orderBy, skip, numPerPage], function (err, results) {
                connection.release();
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    });
};

exports.addBook = async (params) => {
    return new Promise(function (resolve, reject) {
        const sql = `INSERT INTO books (title, author, description, image, date) VALUES (?, ?, ?, ?, ?);`;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            connection.query(sql, [params.title, params.author, params.description, params.image, params.date], function (err, results) {
                connection.release();
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    });
};

exports.updateBook = async (params) => {
    return new Promise(function (resolve, reject) {
        const sql = `UPDATE books SET ?=? WHERE  book_id=?;`;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            connection.query(sql, [params.column, params.value, params.id], function (err, results) {
                connection.release();
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    });
};

exports.initBooks = async () => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            connection.release();
            for (let i = 0; i < 10000; i++) {
                const sql = `INSERT INTO books (title, author, description, image, date) 
            VALUES ('test?', 'test?', 'test?', 'test?', '2019-10-22');`;
                connection.query(sql, [i, i, i, i], function (err, results) {
                    if (err) console.log(err);
                    console.log(results);
                });
            }
            resolve(true);
        });
    });
};

exports.createTable = async () => {
    return new Promise(function (resolve, reject) {
        const sql = "CREATE TABLE `books` (" +
            "`book_id` int(11) NOT NULL AUTO_INCREMENT," +
            "`title` VARCHAR(60) DEFAULT NULL," +
            "`author` VARCHAR(50) DEFAULT NULL," +
            "`description` VARCHAR(140) DEFAULT NULL," +
            "`image` VARCHAR(200) DEFAULT NULL," +
            "`date` date DEFAULT NULL," +
            "PRIMARY KEY (`book_id`));";
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            connection.query(sql, function (err, results) {
                connection.release();
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    });
};

exports.createDatabase = async () => {
    return new Promise(function (resolve, reject) {
        const sql = `CREATE DATABASE node_js_koa_mysql`;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            connection.query(sql, function (err, results) {
                connection.release();
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    });
};