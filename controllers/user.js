var firebase = require("firebase");

var database = firebase.database();
var ref = database.ref("/users"); //Set the current directory you are working in

exports.user = function(req, res, next) {
  // var user = firebase.auth().currentUser;
  // if (user != null) {
  //   user.providerData.forEach(function(profile) {
  //     res.render("user", {
  //       title: "userpage",
  //       displayName: profile.displayName,
  //       email: profile.email
  //     });
  //     console.log("Sign-in provider: " + profile.providerId);
  //     console.log("  Provider-specific UID: " + profile.uid);
  //     console.log("  Name: " + profile.displayName);
  //     console.log("  Email: " + profile.email);
  //     console.log("  Photo URL: " + profile.photoURL);
  //     console.log("  phone Number: " + profile.phoneNumber);
  //   });
  //   // ref.once("value", function(snapshot) {
  //   //   var data = snapshot.val(); //Data is in JSON format.
  //   //   console.log(data);
  //   //   res.write(JSON.stringify(data));
  //   // });
  // }
  // // else {
  // //   res.redirect("/signin");
  // // }

  firebase.auth().onAuthStateChanged(
    function(user) {
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

        // $("#user_Name").text(displayName);
        // $("#user_Email").text(email);
        // if (phoneNumber != null) {
        //   $("#user_Tel").text(phoneNumber);
        // } else {
        //   $("#user_Tel").text("-");
        // }
        // $("#userName").text("Hi : " + displayName);
      } else {
        ///////////////////////////////////////////////////
        checkFingerlogin();

        // alert("Please Signin !!");
        // window.location.href = "index.html";
        ///////////////////////////////////////////////////
      }
    },
    function(error) {
      console.log(error);
      alert("Some Thing Worng! please login agian");
    }
  );
};

function checkFingerlogin() {
  var Found_ID;
  var query = firebase.database().ref("/User/usersRegistStatus/");
  var ref = firebase.database().ref("Device/fingerSearch/Found_ID/");

  ref.once("value").then(function(snapshot) {
    Found_ID = snapshot.child("ID").val(); // {first:"Ada",last:"Lovelace"}
    query.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        // console.log(childData);
        var user_ID = childData.F_ID;
        var Name = childData.username;
        var Email = childData.email;
        var Tel = childData.phoneNumber;
        var RegistStatus = childData.registStatus;
        // console.log(user_ID);

        console.log(Found_ID);
        if (user_ID === Found_ID) {
          console.log(user_ID + " == " + Found_ID);
          if (RegistStatus == "Registered") {
            // $("#user_Name").text(Name);
            // $("#user_Email").text(Email);
            // $("#user_Tel").text(Tel);
            // $("#userName").text("Hi : " + Name);
          } else {
            alert("Please contact admin to regist fingerprint");
            window.location.href = "/users/home/";
          }

          // console.log(F_name);
          // console.log(L_name);
        }
      });
    });
  });
  // if(
}

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

  //  var ref = firebase.database().ref('users/');
  //  ref.on("value", function(snapshot) {
  //    snapshot.forEach(function(childSnapshot) {
  //        var childKey = childSnapshot.key;
  //        var childData = childSnapshot.val();
  //        // console.log(childKey + childData.uid );
  //        if(childData.uid == userId ){
  //            // console.log(childData.uid);
  //            // console.log(childData.registStatus);
  //          if(childData.registStatus == ""){
  //              updateData['/users/'+ userId + '/'] = data;
  //              firebase.database().ref().update(updateData);
  //                  console.log("Add Data No regist finger ");
  //                  console.log(childData.uid);
  //            }
  //          if(childData.registStatus == "Registered"){
  //                  console.log("Regist finger ");
  //                  console.log(childData.uid);
  //          }
  //
  //        }
  //        else{
  //          if(childData.registStatus !== ""){
  //              updateData['/users/'+ userId + '/'] = data;
  //              firebase.database().ref().update(updateData);
  //                  console.log("Add Data No regist finger ");
  //                  console.log(childData.uid);
  //            }
  //        }
  //     //   console.log( Key + " " + Name + " "+ Stock + " " + Dosage);
  //            // $("#userName").text("Hi : " +  F_name  );
  // });
  //
  //
  //          //  Object.keys(Val).map(function (key) {
  //          //       if(key == userId){
  //          //         if(Val[key].registStatus !== "Registered"){
  //          //           // updateData['/users/'+ userId + '/'] = data;
  //          //           // firebase.database().ref().update(updateData);
  //          //            console.log("Add Data No regist finger ");
  //          //         }
  //          //       }
  //          //      if(key !== userId){
  //          //        if(Val[key].registStatus !== "Registered"){
  //          //          updateData['/users/'+ userId + '/'] = data;
  //          //          firebase.database().ref().update(updateData);
  //          //           console.log("data");
  //          //        }
  //          //      }
  //          // });
  //
  //
  //  });
}

exports.profile = function(req, res, next) {
  res.render("profile", { title: "Autodispenser" });
};

exports.choosedrug = function(req, res, next) {
  res.render("choosedrug", { title: "Autodispenser" });
};
