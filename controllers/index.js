// Firebase App (the core Firebase SDK) is always required and

// Add the Firebase products that you want to use

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

// Add the Firebase products that you want to use

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
  // res.redirect('/user');
};

exports.fingerauth = function(req, res, next) {
  res.render("fingerauth", { title: "finger authentication" });
  // res.redirect('/user');
};

exports.logout = (req, res, next) => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.error("Sign Out Success!!!");
      // res.setHeader("Content-Type", "text/html");
      // res.redirect("/");
      res.status(200).redirect("/");
    })
    .catch(function(error) {
      console.error("Sign Out Error", error);
    });
};

// function activeStatus(status) {
//   var updates = {};
//   updates["/Device/fingerSearch/Status/"] = status;
//   return database.ref().update(updates);
// }

// exports.checkfingauth = async function(req, res, next) {
//   console.log("Test !!!");
//   activeStatus(1);

//   setInterval(async function() {
//     var Status;
//     var ID;
//     var Match;
//     var ref = database.ref("Device/fingerSearch/");
//     var ref1 = database.ref("Device/fingerSearch/Found_ID/");
//     var ref2 = database.ref("Device/fingerSearch/StatusSearch/");

//     ref1.once("value").then(function(snapshot) {
//       ID = snapshot.child("ID").val(); // {first:"Ada",last:"Lovelace"}
//       // console.log(ID);
//       ref.once("value").then(function(snapshot) {
//         Status = snapshot.child("Status").val(); // {first:"Ada",last:"Lovelace"}
//         // console.log(Status);
//         if (Status == 0) {
//           ref2.once("value").then(async function(snapshot) {
//             Match = await snapshot.child("Status").val(); // {first:"Ada",last:"Lovelace"}
//             // console.log(Status);
//             // console.log(Match);
//             if (Match == 1) {
//               console.log("Status & Match");
//               if (ID == 0) {
//                 // alert("You are not log in!!");
//                 res.redirect("/fingerauth");
//                 // res.render("fingerauth", { title: "AutoDispenser" });
//                 // var myvar = setTimeout(location.reload(), 2000);
//               } else {
//                 console.log("redirect to users page");
//                 // window.location = "/users";
//                 res.redirect("users/");
//                 // res.render("user", { title: "AutoDispenser" });
//                 // clearTimeout(myVar);
//               }
//             }
//             // if (Match == 0) {
//             //   console.log("Status & not Match");
//             //   // alert("Please Log in again!!");
//             //   // window.location = "/fingerauth";
//             //   // res.redirect("/fingerauth");
//             // }
//           });
//           //   console.log("Check!!");
//         }
//       });
//     });
//   }, 1000);

//   // res.redirect('/user');
// };

exports.emailauth = function(req, res, next) {
  res.render("emailauth", { title: "email authentication" });
  // res.redirect('/user');
};

exports.signin = function(req, res, next) {
  res.render("signin", { title: "Sign in" });
  // res.redirect('/user');
};

exports.signup = function(req, res, next) {
  res.render("signup", { title: "Sign up" });

  // res.redirect('/user');
};

exports.forgetpassword = function(req, res, next) {
  res.render("forgetpw", { title: "forget Password" });
  // res.redirect('/user');
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
        // next();
      }

      // res.render("user", { title: "Autodispenser" });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // alert(errorMessage);
      return res.redirect("/signin");
      // next();
    });
  //   });

  // res.redirect("/users");
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
      return res.redirect("/signup");
      console.log("Error creating new user:", error);
    });
};

// user page route
exports.users = function(req, res, next) {
  // res.render("user", { title: "Autodispenser" });
  var user = firebase.auth().currentUser;
  if (user != null) {
    user.providerData.forEach(function(profile) {
      // console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      // console.log("  Photo URL: " + profile.photoURL);
      var Name = profile.displayName;
      var Email = profile.email;
      res.render("user", {
        title: "Autodispenser",
        name: Name,
        email: Email
      });
    });
  } else {
    res.redirect("/signin");
  }
};

exports.profile = function(req, res, next) {
  // res.render("profile", { title: "Autodispenser" });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      user.providerData.forEach(function(profile) {
        // console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        var Name = profile.displayName;
        var Email = profile.email;
        return res.render("profile", {
          title: "Autodispenser",
          name: Name,
          email: Email
        });
      });
    } else {
      return res.redirect("/signin");
    }
  });

  // var user = firebase.auth().currentUser;
  // if (user != null) {
  //   user.providerData.forEach(function(profile) {
  //     console.log("Sign-in provider: " + profile.providerId);
  //     console.log("  Provider-specific UID: " + profile.uid);
  //     console.log("  Name: " + profile.displayName);
  //     console.log("  Email: " + profile.email);
  //     console.log("  Photo URL: " + profile.photoURL);
  //     var Name = profile.displayName;
  //     var Email = profile.email;
  //     res.render("profile", {
  //       title: "Autodispenser",
  //       name: Name,
  //       email: Email
  //     });
  //   });
  // } else {
  //   res.redirect("/signin");
  // }
  // firebase.auth().onAuthStateChanged(
  //   function(user) {
  //     if (user) {
  //       // User is signed in.
  //       var displayName = user.displayName;
  //       var email = user.email;
  //       // var emailVerified = user.emailVerified;
  //       var photoURL = user.photoURL;
  //       var uid = user.uid;
  //       var phoneNumber = user.phoneNumber;
  //       var providerData = user.providerData;
  //       addDataProfileUser(uid, displayName, email, photoURL, phoneNumber);
  //       // console.log("displayName :" + displayName);
  //       // console.log("email :" + email);
  //       // console.log("photoURL :" + photoURL);
  //       // console.log("uid :" + uid);
  //       // console.log(providerData);
  //       // $("#user_Name").text(displayName);
  //       // $("#user_Email").text(email);
  //       // if (phoneNumber != null) {
  //       //   $("#user_Tel").text(phoneNumber);
  //       // } else {
  //       //   $("#user_Tel").text("-");
  //       // }
  //       // $("#userName").text("Hi : " + displayName);
  //     } else {
  //       ///////////////////////////////////////////////////
  //       checkFingerlogin();
  //       // alert("Please Signin !!");
  //       // window.location.href = "index.html";
  //       ///////////////////////////////////////////////////
  //     }
  //   },
  //   function(error) {
  //     console.log(error);
  //     alert("Some Thing Worng! please login agian");
  //   }
  // );
};

exports.choosedrug = function(req, res, next) {
  // res.render("choosedrug", { title: "Autodispenser" });
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
        res.render("choosedrug", {
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

//admin page route
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
