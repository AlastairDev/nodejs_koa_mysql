const router = require('koa-router')();
const AddBooksController = require('./addBooksController.js');
const EditBooksController = require('./editBooksController.js');
const GetBooksController = require('./getBooksController.js');
const DatabaseInitController = require('./databaseInitController.js');

router.get('/getBooks', GetBooksController.getBooks);
router.get('/addBook', AddBooksController.addBook);
router.get('/editBook', EditBooksController.editBook);
router.get('/createTable', DatabaseInitController.createTable);
router.get('/createDatabase', DatabaseInitController.createDatabase);
router.get('/initDatabaseData', DatabaseInitController.initDatabaseData);
router.get('/', function(ctx, next) {
    ctx.body = "example: /getBooks?page=1&pageSize=10&orderBy=book_id  ||  orderBy:['book_id','title','author','description','image','date'] || pageSize:1-30\n" +
        "/addBook?title=test&author=test&description=test&image=test&date=2019-07-07\n" +
        "/editBook?id=17?column=image&value=test || column:['title','author','description','image','date']\n";
    return next();
});

module.exports = router;
