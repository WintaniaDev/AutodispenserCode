var config = {
  apiKey: "AIzaSyAcZzq7B-iLvfHCS2EthACEE1tZp-7e-40",
  authDomain: "autodispenser-de64e.firebaseapp.com",
  databaseURL: "https://autodispenser-de64e.firebaseio.com",
  projectId: "autodispenser-de64e",
  storageBucket: "autodispenser-de64e.appspot.com",
  messagingSenderId: "637755215079"
};
firebase.initializeApp(config);

function reloadPage() {
  location.reload();
}

$(document).ready(function() {
  $("#Register").hide();
  $("#notRegister").show();

  $("#OutStock1").hide();
  $("#OutStock2").hide();
  $("#OutStock3").hide();
  $("#OutStock4").hide();
  $("#OutStock5").hide();
  $("#OutStock6").hide();
  $("#OutStock7").hide();
  $("#OutStock8").hide();
  $("#OutStock9").hide();
  $("#OutStock10").hide();

  // $("#registForm")[0].reset();
  $("#adminName").text("Hi Admin : Sarawut");
  // $('#addUser').click(function() {
  //       addUsertoDB();
  //       setTimeout(reloadPage(),2000);
  // });
});
///////////////////////////////////////////////////////////////////////////
var statusStock = [];
var Count = 0;
var CountStock = [];
var arrSize = 3;
var j = 1;
var rnd = 0;
function empty() {
  //empty your array
  CountStock = [];
  // while (CountStock.length) {
  //   CountStock.pop();
  // }
}

// var stockRef = firebase.database().ref("/DrugStock/Stock/");
// var stockRef = firebase.database().ref("/Test/FSR_Data/");

var stockRef = firebase.database().ref("/DrugStock/");
stockRef.orderByKey().on("value", function(snapshot) {
  // stockRef.on("child_changed", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    $("#Dname" + childKey).text(childData.Name);
    $("#Dos" + childKey).text(childData.Dosage);
    $("#Stk" + childKey).text(10 - childData.Stock + " / 10");
    var outStock_ID = "";
    var stock_ID = "";
    if (childData.Stock == 10) {
      // console.log(childData.Stock);
      stock_ID += "#Stock" + parseInt(childKey).toString();
      outStock_ID += "#OutStock" + parseInt(childKey).toString();
      $(stock_ID).hide();
      $(outStock_ID).show();
    }
    if (childData.Stock != 10) {
      stock_ID += "#Stock" + parseInt(childKey).toString();
      outStock_ID += "#OutStock" + parseInt(childKey).toString();
      $(stock_ID).show();
      $(outStock_ID).hide();
    }
  });
});
// ref1.orderByChild("F_ID").on("value", function(snapshot) {

//  console.log(i);
//   for (rnd in CountStock) {
//     if (CountStock[rnd] === 3) {
//       outStock_ID = "";
//       stock_ID = "";
//       stock_ID += "#Stock" + (parseInt(rnd) + 1).toString();
//       outStock_ID += "#OutStock" + (parseInt(rnd) + 1).toString();
//       //   // // console.log(btnLock_ID);
//       //   // // console.log(btnUnLock_ID);
//       $(stock_ID).hide();
//       $(outStock_ID).show();
//       // Count = 0;
//     }
//     rnd = 0;
//   }
//   console.log(rnd);
//   // while (CountStock.length) {
//   //   CountStock.pop();
//   // }
// }
// //////////////////////////////////////////////////////////////////////////////////////////////

function addStock(Data, CH) {
  var stockUpdate = {};
  stockUpdate["/DrugStock/" + (parseInt(CH) + 1).toString() + "/Stock/"] = Data;
  firebase
    .database()
    .ref()
    .update(stockUpdate);
}
//
// function addUsertoDB(){
//        var  First_Name = $('#firstName').val();
//        var  Last_Name = $('#lastName').val();
//        var  Email =  $('#inputEmail').val();
//        var  Tel =  $('#Tel').val();
//        var  User_ID = $('#id').val();
//
//
//        console.log(User_ID);
//        if(First_Name == ""  || Last_Name == "" || Email == "" || Tel == "" || User_ID == "" ){
//            alert("Please complete the information.");
//        }
//        else{
//          firebase.database().ref('/User/ID/').push({
//                user_ID : User_ID,
//                First_Name : First_Name.toString(),
//                Last_Name : Last_Name.toString(),
//                Email:Email.toString(),
//                Tel : Tel.toString()
//
//           });
//
//           firebase.database().ref('/User/LastID/').set({
//                 ID : parseInt(User_ID)
//            });
//
//         var updates = {};
//         updates['/Device/enrollMode/Status'] = 1;
//         firebase.database().ref().update(updates);
//         return true;
//        }
//
// }

var NumID = 0;
var Num_RUN = 0;

let allUser = [];
let allRegist = [];

let diff = [];
var difference = [];
var ref = firebase.database().ref("users/");
var Ref = firebase.database().ref("/User/usersRegistStatus/");
ref.once("value").then(function(snapshot) {
  var Val = snapshot.val();
  var num = 0;
  snapshot.forEach(function(childSnapshot1) {
    var childKey = childSnapshot1.key;
    var childData = childSnapshot1.val();
    allUser.push(childKey.toString());
  });
  Ref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      allRegist.push(childKey.toString());
    });

    diff = _.difference(allUser, allRegist);
    // console.log(diff);

    Object.keys(Val).map(function(key) {
      for (var i in diff) {
        if (diff[i] == key) {
          // console.log(diff[i] + " = " + key + "  OK");
          $(".U_Table_Noregist").append(
            '<tr style="justify-content:center;">' +
              '<td style="text-align: center;">' +
              ++num +
              "</td>" +
              '<td style="text-align: center">' +
              Val[key].username +
              "</td>" +
              '<td style="text-align: center">' +
              Val[key].email +
              "</td>" +
              '<td style="text-align: center">' +
              key.toString() +
              "</td>" +
              '<td style="text-align: center">' +
              '<button class="btn btn-primary" style="margin: 10px" onclick="registFinger(\'' +
              key +
              "' ,  '" +
              num +
              "')\">Register</button>" +
              "</td>" +
              "</tr>"
          );
        }
      }
    });
    // // diff.push(_.difference(allUser,allRegist));
    //  console.log(_.difference(allUser,allRegist));
  });
});

// var ref = firebase.database().ref('users/');
// ref.on("value", function(snapshot) {
//   // var reload =  setTimeout(reloadPage(),1000);
//     var Val = snapshot.val();
//     var num = 0;
//
//     Object.keys(Val).map(function (key) {
//        // if(Val[key].registStatus !== "Registered"){
//
//         $('.U_Table_Noregist').append('<tr style="justify-content:center;">' +
//             '<td style="text-align: center;">' + ++num +'</td>' +
//             '<td style="text-align: center">' + Val[key].username +'</td>' +
//             '<td style="text-align: center">' + Val[key].email + '</td>' +
//             '<td style="text-align: center">' + key.toString()+ '</td>' +
//             '<td style="text-align: center">' + '<button class="btn btn-primary" style="margin: 10px" onclick="registFinger(\''+ key +'\' ,  \'' + num + '\')">Register</button>'+'</td>' +
//             // '<td style="text-align: center">' + '<button class="btn btn-danger" style="margin: 10px" >Not Register</button>'+ '</td>' +
//             '</tr>')
//           // }
//     });
// });

var registStatusRef = firebase.database().ref("/User/usersRegistStatus/");
var enrollStatusRef = firebase.database().ref("/User/EnrollSuccess/");
registStatusRef.once("value", function(snapshot) {
  enrollStatusRef.on("value", function(snapshot) {
    var Val = snapshot.val();
    if (Val.Status == 1) {
      var reload = setTimeout(reloadPage(), 1000);
    }
  });
  var Val = snapshot.val();
  var num = 0;
  Object.keys(Val).map(function(key) {
    if (Val[key].registStatus == "Registered") {
      $(".U_Table_regist").append(
        '<tr style="justify-content:center;">' +
          '<td style="text-align: center;">' +
          ++num +
          "</td>" +
          '<td style="text-align: center">' +
          Val[key].username +
          "</td>" +
          '<td style="text-align: center">' +
          Val[key].email +
          "</td>" +
          '<td style="text-align: center">' +
          Val[key].F_ID +
          "</td>" +
          // '<td style="text-align: center">' + '<button class="btn btn-primary" style="margin: 10px" onclick="registFinger(\''+ key +'\' ,  \'' + num + '\')">Register</button>'+'</td>' +
          // '<td style="text-align: center">' + Val[key].f_ID + '</td>' +
          "</tr>"
      );
      NumID += 1;
    }
  });

  // console.log(NumID);
});

var ref1 = firebase.database().ref("/User/usersRegistStatus/");
ref1.orderByChild("F_ID").on("value", function(snapshot) {
  var Val = snapshot.val();
  var num = 0;
  Object.keys(Val).map(function(key) {
    if (Val[key].registStatus == "Registered") {
      // console.log("Success!!!");
      // NumID =  Object.keys(Val).length ;
      Num_RUN += 1;
      $(".U_Table_manage").append(
        '<tr style="justify-content:center;">' +
          '<td style="text-align: center;">' +
          ++num +
          "</td>" +
          '<td style="text-align: center">' +
          Val[key].username +
          "</td>" +
          '<td style="text-align: center">' +
          Val[key].email +
          "</td>" +
          '<td style="text-align: center">' +
          Val[key].F_ID +
          "</td>" +
          '<td style="text-align: center">' +
          '<button class="btn btn-danger" style="margin: 10px" onclick="deleteUser(\'' +
          key +
          "' ,  '" +
          Val[key].F_ID +
          "')\">Delete</button>" +
          "</td>" +
          "</tr>"
      );
    }
  });

  // console.log(Num_RUN);
});

// I need a means of getting a specific auth user.

// var ref3 = firebase.database().ref('/User/EnrollSuccess/');
var deleteRef = firebase.database().ref("/Device/deleteFinger/");
function deleteUser(UID, FID) {
  var deleteUpdate = {};
  var deleteUpdateID = {};
  var deleteUpdatedelID = {};

  deleteUpdate["/Device/deleteFinger/Status/"] = 1;
  deleteUpdateID["/Device/deleteFinger/byID/Status/"] = 1;
  deleteUpdatedelID["/Device/deleteFinger/delID/"] = FID;
  // updateID['/User/LastID/ID'] = NumID+1;
  // updateUID['/User/LastUID/UID'] = UID;

  // firebase.database().ref().update(deleteUpdate);
  // firebase.database().ref().update(deleteUpdateID);
  // firebase.database().ref().update(deleteUpdatedelID);

  var userRef = firebase.database().ref("/users/" + UID.toString() + "/");
  var UserRef = firebase
    .database()
    .ref("/User/usersRegistStatus/" + UID.toString() + "/");
  // userRef.remove();
  //  UserRef.remove();
  console.log("Uid:" + UID + "ID :" + FID);
  // alert("Uid:  " + UID.toString() + "   ID :   " + FID.toString());
}

function registFinger(UID, ID) {
  ref.on("value", function(snapshot) {
    // var reload =  setTimeout(reloadPage(),1000);
    var Val = snapshot.val();
    // var num = 0;
    Object.keys(Val).map(function(key) {
      if (key == UID) {
        var Uname = Val[key].username;
        var Uemail = Val[key].email;
        var Uuid = Val[key].uid;
        var UphoneNumber = Val[key].phoneNumber;
        var Uprofilepicture = Val[key].profile_picture;

        var updateRegist = {};
        var UserData;
        UserData = {
          username: Uname,
          email: Uemail,
          uid: UID,
          phoneNumber: UphoneNumber,
          profile_picture: Uprofilepicture
        };
        updateRegist["/User/usersRegistStatus/" + UID + "/"] = UserData;
        firebase
          .database()
          .ref()
          .update(updateRegist);
        var updateRegistStatus = {};
        var updateF_ID = {};
        updateRegistStatus[
          "/User/usersRegistStatus/" + UID + "/registStatus/"
        ] = "Registered";
        // updateF_ID['/User/usersRegistStatus/'+ UID + '/F_ID/'] = NumID+=1;
        firebase
          .database()
          .ref()
          .update(updateRegistStatus);
        firebase
          .database()
          .ref()
          .update(updateF_ID);
      } else {
        NumID = 0;
      }
    });
    console.log(NumID);
  });
  var updates = {};
  var updateID = {};
  var updateUID = {};

  updates["/Device/enrollMode/Status"] = 1;
  updateID["/User/LastID/ID"] = NumID + 1;
  updateUID["/User/LastUID/UID"] = UID;

  firebase
    .database()
    .ref()
    .update(updates);
  firebase
    .database()
    .ref()
    .update(updateID);
  firebase
    .database()
    .ref()
    .update(updateUID);

  NumID = 0;
  Num_RUN = 0;
  // var reload = setTimeout(reloadPage(),10000);
  // return true;
}
