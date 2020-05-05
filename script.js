function longpress(time, loadingBarId, element)
{
    var mouseIsDown = true;
    var loadingBarProgress = 0;

    //Loading bar position
    var x = 0;
    var y = 0;

    //Display loading bar
    document.getElementById(loadingBarId).style.display="block";

    //Loading bar progress update
    var loadingBarUpdateInterval = setInterval(function(){
        loadingBar(loadingBarProgress, time);
    }, 100);

    //Loading bar position by the cursor
    element.addEventListener("mousemove", function(e){
        x = (e.pageX-element.offsetLeft);
        y = (e.pageY-element.offsetTop);
    });

    var loadingBarPositionUpdateInterval = setInterval(function(){
        loadingBarPositon(loadingBarId, x, y);
    }, 1);


    //Base interval for longpress
    var interval = setInterval(function(){
        afterLongpress(element);
        
        clearLoadingBar(loadingBarId);
        clearInterval(loadingBarPositionUpdateInterval);
        clearInterval(loadingBarUpdateInterval);
        clearInterval(interval);
    }, time * 1000);


    //Cancel longpress
    element.addEventListener("mouseup", function(){
        mouseIsDown = false;

        clearInterval(interval);
        clearInterval(loadingBarPositionUpdateInterval);
        clearInterval(loadingBarUpdateInterval);
        clearLoadingBar(loadingBarId);
    }); 
}

function loadingBar(loadingBarProgress, time)
{
    
    

}

function loadingBarPositon(loadingBarId, x, y)
{
    var bar = document.getElementById(loadingBarId);
    
    bar.style.top = y+"px";
    bar.style.left = x+"px";
}

function clearLoadingBar(loadingBarId)
{
    var bar = document.getElementById(loadingBarId);

    bar.style.display = "none";
}


//When succesfully longpressed
//You can change inside of this function to whatever you want
function afterLongpress(element)
{
    console.log("Success!");
    element.className = "activated";
    element.firstElementChild.innerHTML = "Success!";
}