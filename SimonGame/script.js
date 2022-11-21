
//initial variables
var order = []; //order of colours
const colourSet = ["red", "blue", "green", "yellow"]; //possible colors
var userClickedPattern = []; //sequence given by user
var gameLevel = 0; //game level
var gameStarted = false; //game state


//animate function for buttons
function animate(color)
{
    
    $("#"+color).addClass("pressed"); //adding the pressed animate class

    //playing the sound
    var sound = new Audio("sounds/"+color+".mp3");
    sound.play();

    //removing the pressed animate class
    setTimeout(function () {
        
        $("#"+color).removeClass("pressed");

    }, 500);
    
}

//function to reset the game by reseting all variables.
function resetGame()
{
    gameLevel = 0;
    gameStarted = false;
    userClickedPattern = [];
    order = [];

}

//function to progress the game to next level
function nextSequence()
{
    //updating the game level
    userClickedPattern = [];
    gameLevel++;
    $("h1").text("Level "+ gameLevel);
   
   //genrating a new random color
    var rand_index = Math.floor(Math.random()*4); //selecting a random index of colour
    order.push(colourSet[rand_index]); //adding the colour to the random sequence
    
    //animating the boxes in order
    animate(colourSet[rand_index]);
}

//actual game logic
function checkAnswer(currentLevel)
{
    
    //correct answer
    if(userClickedPattern[currentLevel] === order[currentLevel])
    {
        //weather if user completed the order in current level
        if(userClickedPattern.length === order.length) 
            setTimeout(()=> { nextSequence(); }, 1000); //progressing the user to next level

    }

    //wrong answer
    else
    {
        //play wrong answer sound
        const gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();
        
        //animating the game over state
        $("body").addClass("game-over");
        setTimeout( ()=> { $("body").removeClass("game-over"); }, 200);
        $("h1").text("Game Over! Press any key to restart");
        
        //reseting the game
        resetGame();
    }
}



//Lisenting user input
$(".box").click(function () { 
    
    animate($(this).attr('id')); //animating the selected box

    userClickedPattern.push($(this).attr('id')); // adding the selected box color to userClickPattern
    checkAnswer(userClickedPattern.length-1);
});


//game start
$(document).keydown(()=>{
    
    //logic to start the game when a key is pressed.
    if(!gameStarted)
    {
        nextSequence();
        gameStarted = true;
    }
});