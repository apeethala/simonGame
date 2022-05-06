var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var startGame=false;
var userChosenColour="";
var level;
function nextSequence(){
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playRound(gamePattern);
    level++;
}
function settingtime(randomChosenColour){  
    setTimeout(function(){
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        makesound(randomChosenColour);
    },300);
}
function playRound(gamePattern1) {
    gamePattern1.forEach((color, index) => {
      setTimeout(() => {
        settingtime(color);
      }, (index + 1) * 600);
    });
  }
function makesound(soundColour){
   // alert(soundColour);
    var audio = new Audio("sounds/" + soundColour + ".mp3");
    audio.play();
}
$(".btn").click(userSequence);
function userSequence(){
    userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    makesound(userChosenColour); 
    animatePress(userChosenColour);
    if(userClickedPattern.length === gamePattern.length){
        checkAnswer(userClickedPattern);
    }
    else{
        $("#level-title").text("enter remaining sequence"); 
    }
     }
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$('#'+currentColour).removeClass("pressed");},200);
}

$("body").keypress(function(){
    if(startGame===false){
        startGame=true;
        level=0
        nextSequence();
        //$("#level-title").text("Level 0");
    }  
  });

  function checkAnswer(currentpattern){

        if (JSON.stringify(currentpattern)==JSON.stringify(gamePattern)){
          setTimeout(function () {
            userClickedPattern=[];
            nextSequence();
          }, 1000);
        }
       
      else {
        makesound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
  }
  function startOver() {
    level = 0;
    gamePattern=[];
    userClickedPattern=[];
    startGame = false;
  }