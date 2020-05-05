var loadingBarProgress = 0;

function longpress(time, element, loadingBarId)
{
    var loadingBarEnabled = false;

    if(typeof loadingBarId !== "undefined") //loading bar is optional
    {
        var loadingBarEnabled = true;
    }

    if(loadingBarEnabled) 
    {
        //Loading bar position
        var x = 0;
        var y = 0;
        var loadingBarUpdateRate = 10; //min 5
    

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
    }

    //Base interval for longpress
    var interval = setInterval(function(){

        afterLongpress(element);//you can change this line to whatever you like script to do after longpress succeded
        
        if(loadingBarEnabled)
        {
            clearLoadingBar(loadingBarId);
            clearInterval(loadingBarPositionUpdateInterval);
            clearInterval(loadingBarUpdateInterval);
        }
        clearInterval(interval);
    }, time * 1000);


    //Cancel longpress
    element.addEventListener("mouseup", function(){
        clearInterval(interval);
        if(loadingBarEnabled)
        {
            clearLoadingBar(loadingBarId);
            clearInterval(loadingBarPositionUpdateInterval);
            clearInterval(loadingBarUpdateInterval);
        }
    }); 
}

function loadingBar(loadingBarId, time, updateRate)
{
    var bar = document.getElementById(loadingBarId);

    var unit = (updateRate / time)/10;
    loadingBarProgress += unit;

    bar.style.width = 1-(loadingBarProgress/100)+"em";
    bar.style.height = 1-(loadingBarProgress/100)+"em";
}

//set position of loading bar
function loadingBarPositon(loadingBarId, x, y)
{
    var bar = document.getElementById(loadingBarId);
    
    //You can change offsets to whatever you like
    var offsetX = 10;
    var offsetY = 10;

    //Set loading bar position
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