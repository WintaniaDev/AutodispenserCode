var express = require("express");
var router = express.Router();

let index = require("../controllers/admin");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", index.admin);

router.get("/home", index.register);
router.get("/register", index.register);
router.get("/manage", index.manage);
router.get("/drugstock", index.drugstock);
module.exports = router;
