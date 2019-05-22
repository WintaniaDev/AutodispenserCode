exports.admin = function(req, res, next) {
  res.render("home", { title: "Admin Dashboard" });
  // res.redirect('/user');
};

exports.register = function(req, res, next) {
  res.render("register", { title: "Admin Dashboard" });
  // res.redirect('/user');
};

exports.manage = function(req, res, next) {
  res.render("manage", { title: "Admin Dashboard" });
  // res.redirect('/user');
};

exports.drugstock = function(req, res, next) {
  res.render("drugstock", { title: "Admin Dashboard" });
  // res.redirect('/user');
};
