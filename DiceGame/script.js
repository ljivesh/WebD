const rand1 = Math.floor(Math.random()*6) + 1;
const rand2 = Math.floor(Math.random()*6) + 1;

document.getElementById("img1").setAttribute("src", "images/dice" + rand1 + ".png"); 
document.getElementById("img2").setAttribute("src", "images/dice" + rand2 + ".png");

if(rand1>rand2)
{
    document.getElementById("num").innerHTML = "1";
}
else if(rand1<rand2)
{
    document.getElementById("num").innerHTML = "2";
}
else
{
    document.querySelector(".result").innerHTML = "It's a draw :(";
}