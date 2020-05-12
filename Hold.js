//SETTINGS
var loadingBar = document.getElementById("loadingBar"); //specify id of element that you want to use as loading bar
var loadingBarUpdateRate = 10; //How often update loading bar in miliseconds (min 5)



/**
 * When held for set amount of time script executes this function, feel free to modify it.
 */
function afterLongpress(mainListener)
{
    mainListener.className = "green";
    mainListener.firstElementChild.innerHTML = "Success!";
}




//SCRIPT
var mainListeners = document.querySelectorAll('[data-holdMode="standard"]'); //elements with hold enabled  
var mainListenersBar = document.querySelectorAll('[data-holdMode="bar"]'); //elements with hold enabled and loading bar enabled

//without bar
mainListeners.forEach(function(value, index){
    mainListeners[index].addEventListener("mousedown", function(){longPress(mainListeners[index], parseInt(mainListeners[index].getAttribute("data-holdTime")))});
    mainListeners[index].addEventListener("touchstart", function(){longPress(mainListeners[index], parseInt(mainListeners[index].getAttribute("data-holdTime")), false, true)}, {passive: true}); //don't use loading bar when using mobile
});

//when using bar
mainListenersBar.forEach(function(value, index){
    mainListenersBar[index].addEventListener("mousedown", function(){longPress(mainListenersBar[index], parseInt(mainListenersBar[index].getAttribute("data-holdTime")), true)});
    mainListenersBar[index].addEventListener("touchstart", function(){longPress(mainListenersBar[index], parseInt(mainListenersBar[index].getAttribute("data-holdTime")), true, true)}, {passive: true}); //don't use loading bar when using mobile
});

var loadingBarProgress = 0; //From 0 to 100

/**
 * Main fuction for initializng intervals ant detecting hold
 * @param {*} mainListener HTML Element that is being held
 * @param {*} time How much time to hold element
 * @param {*} loadingBarEnabled Do you want to use loading bar
 * @param {*} mobile Does call come from mobile device
 */
function longPress(mainListener, time, loadingBarEnabled, mobile)
{  
    if((typeof mobile !== "undefined" && mobile == true) || typeof loadingBarEnabled === "undefined" || loadingBarEnabled == false) //Disable loading bar
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
            calculateLoadingBar(time);
        }, loadingBarUpdateRate);

        //Set loading bar position to the cursor position
        mainListener.addEventListener("mousemove", function(e){
            x = e.pageX;
            y = e.pageY;
            loadingBarPositon(x, y);
        });

        document.documentElement.style.setProperty("--loadingBarTime", time+"s");

        loadingBar.classList.add("lbAnimationClass");

        //Display loading bar
        loadingBar.style.display="block";
    }

    //Base hold interval
    var interval = setInterval(function(){



        afterLongpress(mainListener);//Execute this after to do after longpress succeeded
        


        clearIntervals(mainListener, interval, loadingBarEnabled, loadingBarUpdateInterval);
    }, time * 1000);

    //Cancel longpress
    mainListener.addEventListener("mouseup", function(){clearIntervals(mainListener, interval, loadingBarEnabled, loadingBarUpdateInterval)}); 
    mainListener.addEventListener("mouseleave", function(){clearIntervals(mainListener, interval, loadingBarEnabled, loadingBarUpdateInterval)}); 
    if(mobile)
    {
        mainListener.addEventListener('contextmenu', e => {
            e.preventDefault();
          });
        
        mainListener.addEventListener("touchcancel", function(){clearIntervals(mainListener, interval, loadingBarEnabled, loadingBarUpdateInterval)});
        mainListener.addEventListener("touchend", function(){clearIntervals(mainListener, interval, loadingBarEnabled, loadingBarUpdateInterval)});
    }
}

function calculateLoadingBar(time)
{
    //Calculating interval progress from 0 to 100
    var unit = (loadingBarUpdateRate / time)/10;
    loadingBarProgress += unit;

    //You can manipulate loading bar here

    /*document.documentElement.style.setProperty("--loadingBarProgress", 1-(loadingBarProgress/100)+"em");*/

}

//Set position of loading bar
function loadingBarPositon(x, y)
{


    //You can change offsets to whatever you like
    var offsetX = 7.5;
    var offsetY = 7.5;



    //Set loading bar position
    loadingBar.style.top = y + offsetY +"px";
    loadingBar.style.left = x + offsetX +"px";
}

function clearLoadingBar()
{
    loadingBarProgress = 0; //reset progress bar
    loadingBar.style.display = "none"; //hide loading bar
    loadingBar.classList.remove("lbAnimationClass");
}

//Clear intervals and listeners
function clearIntervals(mainListener, interval, loadingBarEnabled, loadingBarUpdateInterval)
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