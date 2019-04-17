
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCRLz9AfNt4QN3_2Y-KTZq838_FkHv2MgU",
    authDomain: "traintime-f12c0.firebaseapp.com",
    databaseURL: "https://traintime-f12c0.firebaseio.com",
    projectId: "traintime-f12c0",
    storageBucket: "traintime-f12c0.appspot.com",
    messagingSenderId: "259567393278"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = "";

// Capture Button Click
$(".btn").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#firstTrain").val().trim(); 
  frequency = $("#frequency").val().trim();

  // Code for handling the push
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.firstTrain);
      console.log(sv.frequency);

      // Change the HTML to reflect
    //   $("#name-display").text(sv.trainName);
    //   $("#email-display").text(sv.destination);
    //   $("#age-display").text(sv.firstTrain);
    //   $("#comment-display").text(sv.frequency);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });








