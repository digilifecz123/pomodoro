var timer = {
    //variables used in the countdown function
    tempMin: 0,
    tempSec: 0,
    //session variables
    sesMin: 25,
    sesSec: 0,
    //break variables
    breakMin: 5,
    breakSec: 0,
    //monitors if the break time is running or not
    breakTime: false,
    //monitors if the button is for the start or reset
    start: true,
    //monitors if the button if for pause or continue
    pause: true,
    //selecting this.spans for animations
    spans: document.getElementById("clock").getElementsByTagName("span"),
    //starting the countdown
    startTimer: function(callback){
        //start the countdown
        //variable that controls when the countdown was paused
        this.timeInterval = setInterval(callback, 1000)
    },
    //controls the countdown
    countdown: function() {
        //subtract one minute when seconds are at 0 and set seconds to 59
        if(this.tempSec === 0){
            this.tempMin -= 1;
            this.tempSec = 59;
            //animate a minute change
            this.animateClock(this.spans[0]);
        }
        //subtract one second
        else{
           this.tempSec -= 1;
        }
        //animate a second change
        this.animateClock(this.spans[1]);
        //display new values
        $(this.spans[0]).html(this.tempMin);
        $(this.spans[1]).html(this.tempSec);
        //check for the end of the current countdown and start a new countdown
        if(this.tempSec === 0 && this.tempMin === 0){
            //start the break
            if(this.breakTime === false){
                //adapt variables to the break values
                this.tempMin = this.breakMin;
                this.tempSec = this.breakSec;
                //play audio when the session is finished
                this.audioPlay('sound/Cow_Moo.mp3');
                this.breakTime = true;
            }
            //start the session
            else{
                //adapt variables to the session values
                this.tempMin = this.sesMin;
                this.tempSec = this.sesSec;
                //play audio when the break is finished
                this.audioPlay('sound/Music_box.mp3');
                this.breakTime = false;
            }
            //stop the old countdown
            clearInterval(this.timeInterval);
            //start a new countdown
            this.startTimer(function(){
                timer.countdown()
            });
        }
    },
    //controls animations
    animateClock: function(span){
        //add a class that controls animation to a span element for 0.7 seconds
        span.className = "turn";
        setTimeout(function(){
            span.className = "";
        }, 700)
    },
    //controls sound
    audioPlay: function(sound){
        var audio = new Audio(sound);
        audio.play();
    }
}   //end of the timer object

//when the start/reset button is clicked
$("#start").on("click", function(){
    //when the start button is clicked
    if(timer.start === true){
        //adapt time values
        timer.tempMin = timer.sesMin;
        timer.tempSec = timer.sesSec;
        //start the session countdown
        timer.startTimer(function(){
            timer.countdown();
        });
        //enable the pause button and animation
        pauseButton(false, "paused", "pause_true");
        //rename the start button
        $(this).text("Reset");
        timer.start = false;
    }
    //when the reset button is clicked
    else{
        //stop the countdown
        clearInterval(timer.timeInterval)
        //reset countdown
        resetTimer();
        //disable the pause button and animation
        pauseButton(true, "pause_true", "paused");
        //rename the reset button
        $(this).text("Start");
    }
})
//when the pause/continue button is clicked
$("#pause").on("click", function(){
    //when the pause button is clicked
    if(timer.pause === true){
        //pause the countdown
        clearInterval(timer.timeInterval)
        timer.pause = false;
        //rename the pause button
        $(this).text("Cont");
    }
    //when the continue button is clicked
    else{
      //continue the countdown
      timer.startTimer(function(){
          timer.countdown()});
      timer.pause = true;
      //rename the continue button
      $(this).text("Pause");
    }
})
//add session minutes
$("#ses_plus").on("click",function(){
    //prevents changing the mins when the countdown is running
    if(timer.tempMin === 0){
        timer.sesMin += 1;
        $("#ses_num").text(timer.sesMin);
        $("#minutes").text(timer.sesMin);
    }
})
//subtract session minutes
$("#ses_min").on("click",function(){
    //prevents changing the mins when the countdown is running
    if(timer.tempMin === 0){
        //the value cannot be lower than 1
        if(timer.sesMin <= 1){
            timer.sesMin = 1;
        }
        else{
            timer.sesMin -= 1;
        }
        $("#ses_num").text(timer.sesMin)
        $("#minutes").text(timer.sesMin)
    }
})
//add break minutes
$("#break_plus").on("click",function(){
    //prevents changing the mins when the countdown is running
    if(timer.tempMin === 0){
        timer.breakMin += 1;
        $("#break_num").text(timer.breakMin)
    }
})
//subtract break minutes
$("#break_min").on("click",function(){
    //prevents changing the mins when the countdown is running
    if(timer.tempMin === 0){
        //the value cannot be lower than 1
        if(timer.breakMin <= 1){
            timer.breakMin = 1;
        }
        else{
            timer.breakMin -= 1;
        }
        $("#break_num").text(timer.breakMin)
    }
})
//reset countdown
function resetTimer(){
    //reset the countdown
    timer.timeInterval = 0;
    //set variabled to the default values and display them
    timer.tempMin = 0,
    timer.tempSec = 0,
    timer.sesMin = 25;
    timer.sesSec = 0;
    timer.breakMin = 5;
    timer.breakSec = 0;
    timer.breakTime = false;
    timer.start = true;
    timer.pause = true;
    $("#ses_num").text(timer.sesMin);
    $("#break_num").text(timer.breakMin);
    $("#pause").text("Pause");
    $(timer.spans[0]).text(timer.sesMin);
    $(timer.spans[1]).text(timer.sesSec);
}
//enable/disable the pause button and animation
function pauseButton(disabled, removed, added){
    $("#pause").prop("disabled", disabled);
    $("#pause").removeClass(removed);
    $("#pause").addClass(added);
}
