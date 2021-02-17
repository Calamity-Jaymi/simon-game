let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

//keyevent
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level: " + level);
        nextSequence();
        started = true;
    }
});

//button click event
$(".btn").on("click", function() {
    let userClickedColor = $(this).attr("id");
    userClickedPattern.push(userClickedColor);

    audioColor(userClickedColor);
    animatePress(userClickedColor);

    checkAnswer(userClickedPattern.length-1);

});


//generate random sequence or something
const nextSequence = () => {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level: " + level);
    let randoNum = Math.floor(Math.random() * 4);
    let randoColor = buttonColors[randoNum];
    gamePattern.push(randoColor);
    
    
    $("#" + randoColor).fadeIn(200).fadeOut(150).fadeIn(200);
    audioColor(randoColor);
}

//check answer vs clicked
const checkAnswer = () => {
    let lastColor = userClickedPattern.length - 1;

    if (userClickedPattern[lastColor] !== gamePattern[lastColor]) {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("#level-title").text("Nice Try. Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        //restart
        startOver();
    }
    //if user is on par with rando generator
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => nextSequence(), 1000);
    }
} 

//colored button sound
function audioColor(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//button clicked animation
function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

const startOver = () => {
    level = 0;
    gamePattern = [];
    return started = false;
}