//Feel free to modify these functions to your needs 

//When holding started
function holdStart(mainListener, time)
{
    mainListener.style.cursor = "wait";

    document.documentElement.style.setProperty("--holdTime", time+"s");

    mainListener.classList.add("loadingAnimationClass");

    console.log("Started holding");
}

//While holding
function duringHold(mainListener, time)
{
    console.log(Math.ceil(loadingProgress)+"%");
}

//When mouse button is up before time passed
function canceledHold(mainListener, time)
{
    mainListener.style.cursor = "auto";

    mainListener.classList.remove("loadingAnimationClass");

    console.log("Canceled holding");
}

//When succesfuly held for set amount of time
function afterHold(mainListener, time)
{
    mainListener.className = "green";
    mainListener.firstElementChild.innerHTML = "Success!";

    mainListener.classList.remove("loadingAnimationClass");

    mainListener.style.cursor = "auto";

    console.log("Finished holding");
}




//SCRIPT
var mainListeners = document.querySelectorAll('[data-hold]'); //elements with hold enabled  

mainListeners.forEach(function(value, index){
    mainListeners[index].addEventListener("mousedown", function(){longPress(mainListeners[index], parseInt(mainListeners[index].getAttribute("data-hold")))});
    mainListeners[index].addEventListener("touchstart", function(){longPress(mainListeners[index], parseInt(mainListeners[index].getAttribute("data-hold")), true)}, {passive: true}); //mobile
});

var loadingProgress = 0; //From 0 to 100
var loadingUpdateRate = 10; //(min 5) how often check progress in ms

/**
 * Main fuction for initializng intervals ant detecting hold
 * @param {*} mainListener HTML Element that is being held
 * @param {*} time How much time to hold element
 * @param {*} mobile Does call come from mobile device
 */
function longPress(mainListener, time, mobile)
{  
    //Initialize loading progress update
    var loadingUpdateInterval = setInterval(function(){
        calculateLoading(mainListener, time);
    }, loadingUpdateRate);

    holdStart(mainListener, time);//execute at the start of hold

    //Base hold interval
    var interval = setInterval(function(){



        afterHold(mainListener, time);//Execute this after to do after hold succeeded
        


        clearIntervals(mainListener, interval, loadingUpdateInterval);
    }, time * 1000);

    //Cancel longpress
    mainListener.addEventListener("mouseup", function(){clearIntervals(mainListener, interval, loadingUpdateInterval); canceledHold(mainListener, time)}); 
    mainListener.addEventListener("mouseleave", function(){clearIntervals(mainListener, interval, loadingUpdateInterval); canceledHold(mainListener, time)}); 
    if(mobile)
    {
        mainListener.addEventListener('contextmenu', e => {
            e.preventDefault();
          });
        
        mainListener.addEventListener("touchcancel", function(){clearIntervals(mainListener, interval, loadingUpdateInterval); canceledHold(mainListener, time)});
        mainListener.addEventListener("touchend", function(){clearIntervals(mainListener, interval, loadingUpdateInterval); canceledHold(mainListener, time)});
    }
}

function calculateLoading(mainListener, time)
{
    //Calculating interval progress from 0 to 100
    var unit = (loadingUpdateRate / time)/10;
    loadingProgress += unit;

    duringHold(mainListener, time); //Execute this during holding
}

//Clear intervals and listeners
function clearIntervals(mainListener, interval, loadingUpdateInterval)
{
    clearInterval(loadingUpdateInterval);
    
    loadingProgress = 0; //reset progress

    clearInterval(interval);

    mainListener.removeEventListener("mouseup", function(){clearIntervals(mainListener, interval, loadingUpdateInterval); canceledHold(mainListener, time)}); 
    mainListener.removeEventListener("mouseleave", function(){clearIntervals(mainListener, interval, loadingUpdateInterval); canceledHold(mainListener, time)}); 
    mainListener.removeEventListener("touchcancel", function(){clearIntervals(mainListener, interval, loadingUpdateInterval); canceledHold(mainListener, time)});
    mainListener.removeEventListener("touchend", function(){clearIntervals(mainListener, interval, loadingUpdateInterval); canceledHold(mainListener, time)});
}