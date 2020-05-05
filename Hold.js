//TODO
//CHANGE mainListener TO ARRAY
//MAKE PASSIVE LISTENER FOR TOUCH

//SETTINGS
var time = 2; //Time to wait in seconds
var mainListener = document.getElementById("holdThis"); //specify id of element that you want to hold           

var loadingBarEnabled = true; //Do you want to use loading bar?
var loadingBar = document.getElementById("loadingBar"); //specify id of element that you want to use as loading bar
var loadingBarUpdateRate = 10; //How often update loading bar in miliseconds

/**
 * When held for set amount of time script executes this function, feel free to modify it.
 */
function afterLongpress()
{
    mainListener.className = "green";
    mainListener.firstElementChild.innerHTML = "Success!";
}



//SCRIPT
mainListener.addEventListener("mousedown", function(){longPress()});
mainListener.addEventListener("touchstart", function(){longPress(true)}); //don't use loading bar when using mobile

var loadingBarProgress = 0; //From 0 to 100

/**
 * Hold HTML element for set amount of time to execute afterLongpress function
 * @param {bool} mobile (optional) Determines if used on mobile device
 */
function longPress(mobile)
{  
    if(typeof mobile !== "undefined" && mobile == true) //Disable loading bar when using mobile
    {
        loadingBarEnabled = false;
    }

    mainListener.style.cursor = "wait";

    if(loadingBarEnabled) 
    {
        //Loading bar position default position
        var x = 0;
        var y = 0;

        //Initialize loading bar progress update
        var loadingBarUpdateInterval = setInterval(function(){
            calculateLoadingBar();
        }, loadingBarUpdateRate);

        //Set loading bar position to the cursor position
        mainListener.addEventListener("mousemove", function(e){
            x = e.clientX;
            y = e.clientY;
            loadingBarPositon(x, y);
        });

        //Display loading bar
        loadingBar.style.display="inline";
    }

    //Base hold interval
    var interval = setInterval(function(){



        afterLongpress();//Execute this after to do after longpress succeeded
        


        clearIntervals(interval, loadingBarUpdateInterval);
    }, time * 1000);


    //Cancel longpress
    mainListener.addEventListener("mouseup", function(){clearIntervals(interval, loadingBarUpdateInterval)}); 
    mainListener.addEventListener("mouseleave", function(){clearIntervals(interval, loadingBarUpdateInterval)}); 
    if(mobile)
    {
        mainListener.addEventListener("touchcancel", function(){clearIntervals(interval, loadingBarUpdateInterval)});
        mainListener.addEventListener("touchend", function(){clearIntervals(interval, loadingBarUpdateInterval)});
    }
}

function calculateLoadingBar()
{
    //Calculating interval progress from 0 to 100
    var unit = (loadingBarUpdateRate / time)/10;
    loadingBarProgress += unit;



    //You can manipulate loading bar here
    loadingBar.style.width = 1-(loadingBarProgress/100)+"em";
    loadingBar.style.height = 1-(loadingBarProgress/100)+"em";


}

//Set position of loading bar
function loadingBarPositon(x, y)
{
    

    //You can change offsets to whatever you like
    var offsetX = 10;
    var offsetY = 10;



    //Set loading bar position
    loadingBar.style.top = y+offsetY+"px";
    loadingBar.style.left = x+offsetX+"px";
}

function clearLoadingBar()
{
    loadingBarProgress = 0; //reset progress bar
    loadingBar.style.display = "none"; //hide loading bar
}

//Clear intervals and listeners
function clearIntervals(interval, loadingBarUpdateInterval)
{
    mainListener.style.cursor = "auto";

    if(loadingBarEnabled)
    {
        clearLoadingBar();
        clearInterval(loadingBarUpdateInterval);
    }
    clearInterval(interval);

    mainListener.removeEventListener("mouseup", function(){clearIntervals(interval, loadingBarUpdateInterval)}); 
    mainListener.removeEventListener("mouseleave", function(){clearIntervals(interval, loadingBarUpdateInterval)}); 
    mainListener.removeEventListener("touchcancel", function(){clearIntervals(interval, loadingBarUpdateInterval)});
    mainListener.removeEventListener("touchend", function(){clearIntervals(interval, loadingBarUpdateInterval)});
}