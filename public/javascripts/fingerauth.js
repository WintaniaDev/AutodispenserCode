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

function activeStatus(status) {
  var updates = {};
  updates["/Device/fingerSearch/Status/"] = status;
  return database.ref().update(updates);
}

$(document).ready(function() {
  $("#load").hide();
  $("#btnFPScan").show();
  // $("#btnFPScan").click(function() {
  //   $.post("/checkfingauth", function(data, status) {
  //     alert("Data: " + data + "\nStatus: " + status);
  //   });
  //   // console.log("Test !!!");
  // });
  $("#btnFPScan").click(function() {
    // console.log("On Click!!!");
    $("#load").show();
    $("#btnFPScan").hide();
    activeStatus(1);

    setInterval(function() {
      var Status;
      var ID;
      var Match;
      var ref = database.ref("Device/fingerSearch/");
      var ref1 = database.ref("Device/fingerSearch/Found_ID/");
      var ref2 = database.ref("/Device/fingerSearch/StatusSearch/");

      ref1.once("value").then(function(snapshot) {
        ID = snapshot.child("ID").val(); // {first:"Ada",last:"Lovelace"}
        // console.log(ID);
      });

      ref.once("value").then(function(snapshot) {
        Status = snapshot.child("Status").val(); // {first:"Ada",last:"Lovelace"}
        // console.log(Status);

        if (Status == 0) {
          ref2.once("value").then(function(snapshot) {
            Match = snapshot.child("Status").val(); // {first:"Ada",last:"Lovelace"}
            // console.log(Status);
            if (Match == 1) {
              if (ID == 0) {
                alert("You are not log in!!");
                var myvar = setTimeout(location.reload(), 2000);
              } else {
                // window.location = "/users";
                window.location = "/fingerauth";
                // clearTimeout(myVar);
              }
            }
            if (Match == 0) {
              alert("Please Log in again!!");
              window.location = "/fingerauth";
            }
          });
          //   console.log("Check!!");
        }
      });
    }, 1000);
  });
});
