var express = require("express");
var router = express.Router();

let users = require("../controllers/user");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get("/home", users.user);
router.get("/profile", users.user);
router.get("/choosedrug", users.user);
// router.get('/',users.user);

module.exports = router;
