
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





// Capture Button Click
$(".btn").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
var trainName = $("#trainName").val().trim();
var destination = $("#destination").val().trim();
var trainFirstTime =$("#firstTime").val().trim();
var frequency = $("#frequency").val().trim();

var newTrain= {
    name: trainName,
    destination: destination,
    firstTime: trainFirstTime,
    frequency: frequency,
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
    // everyXMin: frequency
};

  // Code for handling the push
  database.ref().push(newTrain);
    alert("Your Train Has Been Added.");
$("#trainName").val("");
$("#destination").val("");
$("#frequency").val("");
$("#firstTime").val("");


});

database.ref().on("child_added", function(childSnapshot) {
      // storing the snapshot.val() in a variable for convenience
      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var frequency = childSnapshot.val().frequency;
      var trainFirstTime= childSnapshot.val().firstTime;

      // Console.loging the last user's data
      console.log(childSnapshot.name);
      console.log(childSnapshot.destination);
      console.log(childSnapshot.trainFirstTime);
      console.log(childSnapshot.frequency);

      // Change the HTML to reflect
    //   $("#trainName").text(sv.trainName);
    //   $("#destination").text(sv.destination);
    //   $("#firstTrain").text(sv.firstTrain);
    //   $("#frequency").text(sv.frequency);

      // Handle the errors
    // }, function(errorObject) {
    //   console.log("Errors handled: " + errorObject.code);
  

    // var tFrequency = $("#frequency").val().trim();
    // var trainTime = moment.unix(firstTime).format("hh:mm");
    // Time is 3:30 AM
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainTimeCalc = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    console.log(trainFirstTime);

    // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeCalc), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var trainArrival = moment(nextTrain).format("hh:mm");
		//calculate difference between times
		// var difference =  moment().diff(moment(trainTime),"minutes");

		// //time apart(remainder)
		// var trainRemain = difference % frequency;

		// //minutes until arrival
		// var minUntil = frequency - trainRemain;

		// //next arrival time
		// var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
    var newROw = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(trainArrival),
        $("<td>").text(tMinutesTillTrain),
    );
        $("#schedule > tbody").append(newROw);
    });
    // I don't really understand the timing becuase it give me the current time
    // instead of the time I put in as the train time




