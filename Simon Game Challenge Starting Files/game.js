var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var started = false; var level = 1;
$(document).keydown(function(){
    if(!started)
    {
        $("h1").text("level "+level);
        nextSequence();
        started = true;
    }
})
$(".btn").click(function(){
    var userChosenColour = this.id;
     userClickedPattern.push(userChosenColour);
     playSound(userChosenColour);
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(userClickedPattern);
    console.log(level);
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
    if(JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern)){
        setTimeout(function(){
            nextSequence();
        },1000)
        $("h1").text("Level "+level);
    }
    
    }
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press any key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*(3+1));
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    var audio=new Audio("./sounds/"+randomChosenColour+".mp3");
    audio.play();
    level++;
}
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level=1;
    gamePattern=[];
    started=false;
}