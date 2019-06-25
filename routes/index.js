var express = require("express");
var router = express.Router();

let index = require("../controllers/index");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", index.index);

router.get("/fingerauth", index.fingerauth);
router.get("/signin", index.signin);
router.get("/signup", index.signup);

// router.get("/emailauth", index.emailauth);
router.get("/forgetpw", index.forgetpassword);
router.post("/createUser", index.createUser);

router.post("/login", index.login);
router.post("/logout", index.logout);

router.get("/home", index.users);
router.get("/profile", index.profile);
router.get("/choosedrug", index.choosedrug);

router.get("/homes", index.userfinger);
router.get("/profiles", index.profilefinger);
router.get("/choosedrugs", index.choosedrugfinger);

router.get("/admin", index.admin);
router.get("/register", index.register);
router.get("/manage", index.manage);
router.get("/drugstock", index.drugstock);

router.get("/checkfingauth", index.checkfingauth);
// router.get("/checkFingerlogin", index.checkFingerlogin);

module.exports = router;
