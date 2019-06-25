var admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
// const FIREBASE_API_KEY = require("../serviceFirebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://autodispenser-de64e.firebaseio.com"
});

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyAcZzq7B-iLvfHCS2EthACEE1tZp-7e-40",
  authDomain: "autodispenser-de64e.firebaseapp.com",
  databaseURL: "https://autodispenser-de64e.firebaseio.com",
  projectId: "autodispenser-de64e",
  storageBucket: "autodispenser-de64e.appspot.com",
  messagingSenderId: "637755215079",
  appId: "1:637755215079:web:49a24792a4a9faed"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

exports.index = function(req, res, next) {
  res.render("index", { title: "AutoDispenser" });
};

exports.fingerauth = function(req, res, next) {
  res.render("fingerauth", { title: "finger authentication" });
};

exports.logout = function(req, res, next) {
  return firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("Sign Out Success!!!");
      res.sendStatus(200).end();
    })
    .catch(function(error) {
      console.error("Sign Out Error", error);
    });
};

//////////////////////////////////////////////////////////////////////////////
// exports.emailauth = function(req, res, next) {
//   res.render("emailauth", { title: "email authentication" });
//   // res.redirect('/user');
// };

exports.signin = function(req, res, next) {
  res.render("signin", { title: "Sign in" });
};

exports.signup = function(req, res, next) {
  res.render("signup", { title: "Sign up" });
};

exports.forgetpassword = function(req, res, next) {
  res.render("forgetpw", { title: "forget Password" });
};

exports.checkfingauth = function(req, res, next) {
  return res.redirect("/profiles");
};

exports.login = async function(req, res, next) {
  var userDetails = {
    username: req.body.username,
    password: req.body.password
  };
  await firebase
    .auth()
    .signInWithEmailAndPassword(userDetails.username, userDetails.password)
    .then(function(user) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully login user uid");
      console.log(userDetails.username);
      console.log(userDetails.password);
      console.log("POST METHOD");
      // console.log(user);
      if (user) {
        return res.redirect("/profile");
      } else {
        return res.redirect("/signin");
      }
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      return res.redirect("/signin");
    });
};

exports.createUser = function(req, res, next) {
  var userDetails = {
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.Firstname,
    lastname: req.body.Lastname,
    tel: req.body.Tel
    // tel: "+660" + req.body.Tel
  };
  var fullname =
    userDetails.firstname.toString() + "  " + userDetails.lastname.toString();
  // console.log(fullname);
  console.log(userDetails);
  return admin
    .auth()
    .createUser({
      email: userDetails.email,
      emailVerified: false,
      phoneNumber: userDetails.toString().tel,
      password: userDetails.password,
      displayName: fullname,
      // photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(
        "Successfully created new user:",
        userRecord.uid,
        userRecord.displayName,
        userRecord.phoneNumber
      );
      return res.redirect("/signin");
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
      return res.redirect("/signup");
    });
};

exports.users = function(req, res, next) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      user.providerData.forEach(function(profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        // console.log("  Photo URL: " + profile.photoURL);
        Name = profile.displayName;
        Email = profile.email;
        return res.render("user", {
          title: "Autodispenser",
          name: Name,
          email: Email
        });
      });
    } else {
      return res.redirect("/signin");
    }
  });
};

function addDataProfileUser(userId, name, email, imageUrl, phoneNumber) {
  if (imageUrl == null) {
    imageUrl = "-";
  }
  if (phoneNumber == null) {
    phoneNumber = "-";
  }

  var data = {
    uid: userId,
    username: name,
    email: email,
    profile_picture: imageUrl,
    phoneNumber: phoneNumber
    // registStatus: "" ,
    // F_ID : 0
  };

  var updateData = {};
  updateData["/users/" + userId + "/"] = data;
  firebase
    .database()
    .ref()
    .update(updateData);
}
// profile page route
exports.profile = function(req, res, next) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      // var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;

      addDataProfileUser(uid, displayName, email, photoURL, phoneNumber);
      // console.log("displayName :" + displayName);
      // console.log("email :" + email);
      // console.log("photoURL :" + photoURL);
      // console.log("uid :" + uid);
      // console.log(providerData);

      return res.render("profile", {
        title: "Autodispenser",
        name: displayName,
        email: email
      });
    } else {
      return res.redirect("/signin");
    }
  });
};

// choosdrug page route
exports.choosedrug = function(req, res, next) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      user.providerData.forEach(function(profile) {
        // console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        // console.log("  Photo URL: " + profile.photoURL);
        var Name = profile.displayName;
        var Email = profile.email;
        return res.render("choosedrug", {
          title: "Autodispenser",
          name: Name,
          email: Email
        });
      });
    } else {
      res.redirect("/signin");
    }
  });
};

exports.userfinger = function(req, res, next) {
  return res.render("userfinger", {
    title: "Autodispenser"
  });
};

exports.profilefinger = function(req, res, next) {
  return res.render("profilefinger", {
    title: "Autodispenser"
  });
};

exports.choosedrugfinger = function(req, res, next) {
  return res.render("choosedrugfinger", {
    title: "Autodispenser"
  });
};

//admin page route
exports.admin = function(req, res, next) {
  res.render("home", { title: "Admin Dashboard" });
};

exports.register = function(req, res, next) {
  res.render("register", { title: "Admin Dashboard" });
};

exports.manage = function(req, res, next) {
  res.render("manage", { title: "Admin Dashboard" });
};

exports.drugstock = function(req, res, next) {
  res.render("drugstock", { title: "Admin Dashboard" });
};
