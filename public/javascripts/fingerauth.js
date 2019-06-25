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
  $("#btnFPScan").click(function() {
    $("#load").show();
    $("#btnFPScan").hide();
    var updates = {};
    updates["/Device/fingerSearch/FingerNotfound/Status/"] = 0;
    database.ref().update(updates);
    activeStatus(1);
   
  });

  var Checkref = database.ref("Device/fingerSearch/");
  var CheckstatusSearch = database.ref("Device/fingerSearch/StatusSearch/");
  var CheckFingernotFound = database.ref("Device/fingerSearch/FingerNotfound/")
  CheckstatusSearch.on("value", function(snapshot) {
    var Status = snapshot.child("Status").val();
    Checkref.on("value", function(snapshot) {
      var checkStatus = snapshot.child("Status").val();
      CheckFingernotFound.on("value",function(snapshot){
        var CheckNotfound = snapshot.child("Status").val();;
        // console.log("checkStatus :" + checkStatus);
        // console.log("Status : " + Status);
        // console.log("check not found : " + CheckNotfound);
        if (checkStatus == 0) {
          // $.get("/checkfingauth");
          if (Status == 1) {
            window.location.href = "/checkfingauth";
          }
         
        }
        else{
          if(CheckNotfound == 1){
            alert("Fingerprint Not Found!! \n Please try to login with fingerprint again");
            window.location.href = "/fingerauth";
          }
        }
      });
    });
  });
});
