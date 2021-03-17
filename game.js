var buttonColors = ["red", "blue", "green", "yellow"]; /*create array with colors*/

/*create arrays for click pattern and gamePattern*/
var userClickedPattern = [];
var gamePattern = [];

/*create variables to check if game started and level of game*/
var started = false;
var level = 0;
var highestScore = 0;

/*jQuery Function to Detect first keypress and start game*/
$(".ss").click(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true
    $(".ss").hide();
    $("h3").hide();
    $("h4").hide();
  }
});

/*jQuery Function to extract user click and save it to user click pattern array. Then check answer*/
$(".bttn").click(function() {

  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);

  if (started === false) {

  } else {
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

/*Function to check answer*/
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    /*First if statemet will loop till second is met*/
    if (userClickedPattern.length === gamePattern.length) {
      /*Second if statemt will loop till condition is met*/
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3"); /*adding link to audio file*/
    audio.play();
    /*Showing Game over and color red for 200ms*/
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over!");
    var yourScore = gamePattern.length - 1;
    if (yourScore > highestScore) {
      highestScore = yourScore;
    }
    $("h3").text("Your Score = " + yourScore);
    $("h4").text("Highest Score = " + highestScore);
    startOver();
    $(".ss").show();
    $("h3").show();
    $("h4").show();
  }
}

/*Function to generate random sqeuence*/
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100); /*animation to highlight*/
  playSound(randomChosenColor);
}

/*Function to play audio*/
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); /*adding link to audio file*/
  audio.play();
}

/*Function to animate button press*/
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/*Function to restart game button press*/
function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
