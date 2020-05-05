function longpress(time, element)
{
    var mouseIsDown = true;
    var loadingBarProgress = 0;

    element.addEventListener("mouseup", function(){
        mouseIsDown = false;
        clearInterval(interval);
    }); 

    var interval = setInterval(function(){
        afterLongpress(element);
        
        clearInterval(interval);
        clearInterval(loadingBarInterval);
    }, time * 1000);

    var loadingBarInterval = setInterval(function(){
        loadingBar(loadingBarProgress, time);
    }, 100);
}

function loadingBar(loadingBarProgress, time)
{
    console.log(loadingBarProgress);
}

function afterLongpress(element)
{
    element.className = "activated";
}