var config = {
  apiKey: "AIzaSyAcZzq7B-iLvfHCS2EthACEE1tZp-7e-40",
  authDomain: "autodispenser-de64e.firebaseapp.com",
  databaseURL: "https://autodispenser-de64e.firebaseio.com",
  projectId: "autodispenser-de64e",
  storageBucket: "autodispenser-de64e.appspot.com",
  messagingSenderId: "637755215079"
};
firebase.initializeApp(config);
var database = firebase.database();

////////////////////////////////////////////////////////////////////////////////

// function addDataProfileUser(userId, name, email, imageUrl, phoneNumber) {
//   if (imageUrl == null) {
//     imageUrl = "-";
//   }
//   if (phoneNumber == null) {
//     phoneNumber = "-";
//   }

//   var data = {
//     uid: userId,
//     username: name,
//     email: email,
//     profile_picture: imageUrl,
//     phoneNumber: phoneNumber
//     // registStatus: "" ,
//     // F_ID : 0
//   };

//   var updateData = {};
//   updateData["/users/" + userId + "/"] = data;
//   firebase
//     .database()
//     .ref()
//     .update(updateData);

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

function reloadPage() {
  location.reload();
}

var Data = [];
var Drawer = [];
var Str = "";
var CheckOutofOrder = 0;
$(document).ready(function() {
  $("#Unlock1").hide();
  $("#Unlock2").hide();
  $("#Unlock3").hide();
  $("#Unlock4").hide();
  $("#Unlock5").hide();
  $("#Unlock6").hide();
  $("#Unlock7").hide();
  $("#Unlock8").hide();
  $("#Unlock9").hide();
  $("#Unlock10").hide();
  $("#Lock1").click(function() {
    activeDrawer_Status(1);
  });
  $("#Lock2").click(function() {
    activeDrawer_Status(2);
  });
  $("#Lock3").click(function() {
    activeDrawer_Status(3);
  });
  $("#Lock4").click(function() {
    activeDrawer_Status(4);
  });
  $("#Lock5").click(function() {
    activeDrawer_Status(5);
  });
  $("#Lock6").click(function() {
    activeDrawer_Status(6);
  });
  $("#Lock7").click(function() {
    activeDrawer_Status(7);
  });
  $("#Lock8").click(function() {
    activeDrawer_Status(8);
  });
  $("#Lock9").click(function() {
    activeDrawer_Status(9);
  });
  $("#Lock10").click(function() {
    activeDrawer_Status(10);
  });
  $("#btnLogout").click(function() {
    // var signOut = setTimeout(Signout, 1000);
    // $.post("/logout");
    var clearStatusfinger = {};
    var clearFoundID = {};
    var clearStatusActive = {};
    clearStatusfinger["/Device/fingerSearch/StatusSearch/Status/"] = 0;
    clearFoundID["/Device/fingerSearch/Found_ID/ID/"] = 0;
    // clearStatusActive["/Device/fingerSearch/Status/"] = 0;

    firebase
      .database()
      .ref()
      .update(clearStatusfinger);
    firebase
      .database()
      .ref()
      .update(clearFoundID);
    firebase
      .database()
      .ref()
      .update(clearStatusActive);
    Clear_Status();
    window.location.href = "/";
  });

  function Clear_Status() {
    var updatedelelteStatus = {};
    var updateenrollStatus = {};
    var updatefingersearchStatus = {};
    var updateopendrawStatus = {};

    updatedelelteStatus["/Device/deleteFinger/Status/"] = 0;
    updateenrollStatus["/Device/enrollMode/Status/"] = 0;
    updatefingersearchStatus["/Device/fingerSearch/Status/"] = 0;
    updateopendrawStatus["/Device/openDrawer/Status/"] = 0;

    firebase
      .database()
      .ref()
      .update(updatedelelteStatus);
    firebase
      .database()
      .ref()
      .update(updateenrollStatus);
    firebase
      .database()
      .ref()
      .update(updatefingersearchStatus);
    firebase
      .database()
      .ref()
      .update(updateopendrawStatus);

    //Lock all Drug Drawer
    for (var i = 1; i <= 10; i++) {
      var lockAll_State = {};
      lockAll_State[
        "/Device/openDrawer/drugDrawer/" + i.toString() + "/Status/"
      ] = 1;
      firebase
        .database()
        .ref()
        .update(lockAll_State);
    }
    // clearTimeout(reload);
    // clearTimeout(Homepage);
    // return true;
  }

  $("#btnChooseDrug").click(function() {
    var updateOpendrug = {};
    updateOpendrug["/Device/openDrawer/Status/"] = 1;
    firebase
      .database()
      .ref()
      .update(updateOpendrug);
  });

  $("#chooseDrug_btn").click(function() {
    var updateOpendrug = {};
    updateOpendrug["/Device/openDrawer/Status/"] = 1;
    firebase
      .database()
      .ref()
      .update(updateOpendrug);
  });

  var RegistRef = database.ref("/User/usersRegistStatus/");
  var FoundRef = database.ref("Device/fingerSearch/Found_ID/");
  // var CheckRef = database.ref("Device/fingerSearch/");

  var checkfoundInfo;
  var uname;
  var uemail;
  // var checkfound_ID;

  FoundRef.once("value").then(function(snapshot) {
    Found_ID = snapshot.child("ID").val(); // {first:"Ada",last:"Lovelace"}
    if (Found_ID == 0) {
      alert(
        "Your Fingerprint ID are not registed OR not signin with Fingerprint  \n Please contact to admin or try again to scan your Finger"
      );

      var clearStatefinger = {};
      clearStatefinger["/Device/fingerSearch/StatusSearch/Status/"] = 0;
      firebase
        .database()
        .ref()
        .update(clearStatefinger);
      checkfoundInfo = 0;
      window.location.href = "/"; // clear in Hardware
    }
    RegistRef.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        // console.log(childData);
        var user_ID = childData.F_ID;
        var Name = childData.username;
        var Email = childData.email;
        var Tel = childData.phoneNumber;
        var RegistStatus = childData.registStatus;
        // console.log(user_ID);
        // console.log(Found_ID);
        if (user_ID == Found_ID) {
          // console.log(user_ID + " == " + Found_ID);
          if (RegistStatus == "Registered") {
            checkfoundInfo = 1;
            uname = Name;
            uemail = Email;
            // var Name = Name;
            // var Email = Email;
            // window.location.href = "/profiles";
            // window.location("/profiles");
          }
        }
      });
      // console.log(checkfoundInfo);
      if (checkfoundInfo == 1) {
        $("#user_Name").text(uname);
        $("#user_Email").text(uemail);
        // $("#user_Tel").text(Tel);
        $("#userName").text("Hi : " + uname);
      } else {
        window.location.href = "/";
      }
      checkfoundInfo = 0;
    });
  });
});

function setImageSource(imageId, imageSrc) {
  $("#" + imageId).attr("src", imageSrc);
}

function LockAll_Status() {
  var updateStatus = {};
  updateStatus["/Device/openDrawer/Status/"] = 0;
  firebase
    .database()
    .ref()
    .update(updateStatus);
  return true;
}

var Drawchoose = [];
// function reloadStatus(){
var ref = firebase.database().ref("/Device/openDrawer/drugDrawer/");
ref.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    Drawchoose.push(childData);
  });
  // console.log(Drawchoose);
  StatusDrawer();
});
// }

var btnLock_ID;
var btnUnLock_ID;

function activeDrawer_Status(numofButton) {
  var UnLock_ID = "";
  var Lock_ID = "";
  Lock_ID += "#Lock" + parseInt(numofButton).toString();
  UnLock_ID += "#Unlock" + parseInt(numofButton).toString();

  var updates = {};
  updates[
    "/Device/openDrawer/drugDrawer/" + numofButton.toString() + "/Status/"
  ] = 0;

  firebase
    .database()
    .ref()
    .update(updates);

  $(Lock_ID).hide();
  $(UnLock_ID).show();
}

function StatusDrawer() {
  for (i in Drawchoose) {
    // console.log("Draw" + (parseInt(i)+1) + " status is : " + Drawchoose[i].Status);
    if (Drawchoose[i].Status === 0) {
      btnUnLock_ID = "";
      btnLock_ID = "";
      btnLock_ID += "#Lock" + (parseInt(i) + 1).toString();
      btnUnLock_ID += "#Unlock" + (parseInt(i) + 1).toString();
      // console.log(btnLock_ID);
      // console.log(btnUnLock_ID);
      $(btnLock_ID).hide();
      $(btnUnLock_ID).show();
    }
  }
}

function Drugchoose() {
  var query = firebase
    .database()
    .ref("DrugStock/")
    .orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      var Key = childKey;
      var Name = childData.Name;
      var Stock = childData.Stock;
      var Dosage = childData.Dosage;
      Data.push(childData);
      //   console.log( Key + " " + Name + " "+ Stock + " " + Dosage);
      // $("#userName").text("Hi : " + F_name);
    });
  });
  return true;
}

function submit() {
  if (CheckOutofOrder) {
    var updates = {};
    updates["/Device/openDrawer/Status/"] = 0;
    firebase
      .database()
      .ref()
      .update(updates);
    CheckOutofOrder = 0;
  } else {
    var updates = {};
    updates["/Device/openDrawer/Status/"] = 1;
    firebase
      .database()
      .ref()
      .update(updates);
  }

  for (i in Data) {
    for (j in Drawer) {
      if (Data[i].Name == Drawer[j]) {
        // console.log(Data[i].Name);
        updates[
          "/Device/openDrawer/drugDrawer/" + (parseInt(i) + 1) + "/Status/"
        ] = 0;
        firebase
          .database()
          .ref()
          .update(updates);
      }
    }
  }
  return true;
}

function LockAlldrawer() {
  for (var i = 1; i <= 10; i++) {
    var updateStatusDrawer = {};
    updateStatusDrawer[
      "/Device/openDrawer/drugDrawer/" + parseInt(i) + "/Status/"
    ] = 1;
    firebase
      .database()
      .ref()
      .update(updateStatusDrawer);
  }
  return true;
}
