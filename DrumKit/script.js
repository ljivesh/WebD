
var buttons = document.querySelectorAll(".play_area button");
const audio1 = new Audio("sounds/tom-1.mp3");

// buttons[0].addEventListener("click", function () {

//     audio1.play();
// });

// buttons[1].addEventListener("click", function () {

//     audio2.play();
// });

// buttons[2].addEventListener("click", function () {

//     audio3.play();
// });

// buttons[3].addEventListener("click", function () {

//     audio4.play();
// });

// buttons[4].addEventListener("click", function () {

//     audio5.play();
// });

// buttons[5].addEventListener("click", function () {

//     audio6.play();
// });

// buttons[6].addEventListener("click", function () {

//     audio7.play();
// });

for(var i=0; i<buttons.length; i++) buttons[i].addEventListener("click", function () {
        var button = this.innerHTML;
        var list = this.classList;
        makeSound(button);
        animate(this);
    // this.classList.remove("pressed");

});

document.addEventListener("keydown", function (event) {
        var letter = event.key;
        makeSound(event.key);
        animate(document.getElementById(event.key+"-play"));
        
});


function makeSound(key)
{
    switch(key)
        {
            case "w": 
                const audio1 = new Audio("sounds/tom-1.mp3");
                audio1.play();
                break;
                
            case "a": 
                const audio2 = new Audio("sounds/tom-2.mp3");
                audio2.play(); 
                break;

            case "s": 
                const audio3 = new Audio("sounds/tom-3.mp3");
                audio3.play(); 
                break;

            case "d": 
                const audio4 = new Audio("sounds/tom-4.mp3");
                audio4.play();
                break;

            case "j": 
                const audio5 = new Audio("sounds/snare.mp3");
                audio5.play();
                break;
                
            case "k": 
                const audio6 = new Audio("sounds/crash.mp3");
                audio6.play(); 
                break;
                
            case "l": 
                const audio7 = new Audio("sounds/kick-bass.mp3");
                audio7.play(); 
                break;
        }
}

function animate(key)
{
    key.classList.add("pressed");
    setTimeout(function () {
        key.classList.remove("pressed");
    }, 100);
}