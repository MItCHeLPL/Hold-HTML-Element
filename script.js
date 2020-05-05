var loadingBarProgress = 0;

function longpress(time, loadingBarId, element)
{
    var mouseIsDown = true;

    //Loading bar position
    var x = 0;
    var y = 0;

    var loadingBarUpdateRate = 50; //min 5

    //Display loading bar
    document.getElementById(loadingBarId).style.display="block";

    //Loading bar progress update
    var loadingBarUpdateInterval = setInterval(function(){
        loadingBar(loadingBarId, time, loadingBarUpdateRate);
    }, loadingBarUpdateRate);

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

function loadingBar(loadingBarId, time, updateRate)
{
    var unit = (updateRate / time)/10;
    loadingBarProgress += unit;

    console.log(loadingBarProgress+"%/100%"); //temp

    //loadingBarId.style. ;
}

//set position of loading bar
function loadingBarPositon(loadingBarId, x, y)
{
    var bar = document.getElementById(loadingBarId);
    
    var offsetX = 7.5;
    var offsetY = 7.5;

    bar.style.top = y+offsetY+"px";
    bar.style.left = x+offsetX+"px";
}

function clearLoadingBar(loadingBarId)
{
    loadingBarProgress = 0; //reset progress bar

    //hide loading bar
    var bar = document.getElementById(loadingBarId);
    bar.style.display = "none";
}


//When succesfully longpressed
//You can change inside of this function to whatever you want
function afterLongpress(element)
{
    element.className = "activated";
    element.firstElementChild.innerHTML = "Success!";
}