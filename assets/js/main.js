window.onload = function() {
'use strict';

  var initMinSession = 25;
  var initSecSession = 59;
  var leftMinSession;
  var leftSecSession;


  var initMinBreak = 5;
  var initSecBreak = 59;
  var leftMinBreak;
  var leftSecBreak;

  var t;
  var isRunning = false;
  var audioSrc = '../assets/audio/sound.mp3';
  var audio = new Audio(audioSrc);


  // Object timer which contains timer method
  var timer = {
      pauseMe: function() {
        clearTimeout(t);
        isRunning = false;
      },
      resetMe: function() {
        document.getElementById('seconds').innerHTML = initSecSession;
        isRunning = false;
        clearTimeout(t);
      },
      minusMin: function() {
        if (initMinSession > 1) {
          initMinSession--;
          document.getElementById("p1").innerHTML = initMinSession;
          document.getElementById("minutes").innerHTML = initMinSession;
        } else {
          initMinSession = 1;
        }
      },

      plusMin: function() {
        initMinSession++;
        document.getElementById("p1").innerHTML = initMinSession;
        document.getElementById("minutes").innerHTML = initMinSession;
      },
      minusMinBreak: function() {
        console.log('minusMinBreak')
        if (initMinBreak > 1) {
          initMinBreak--;
          document.getElementById("p2").innerHTML = initMinBreak;
        } else {
          initMinBreak = 1;
        }
      },
      plusMinBreak: function() {
        console.log('plusMinBreak')
        initMinBreak++;
        document.getElementById("p2").innerHTML = initMinBreak;
      },
      continueMe: function() {
        console.log('continueMe')
        isRunning = true;
        if (leftSecSession === 0) {
          timer.countDownBreak()
        } else {
          timer.countDown()
        }
      },
      startMe: function() {
        console.log('startMe')
        if (!isRunning) {
          isRunning = true;
          leftSecSession = initSecSession;
          leftMinSession = initMinSession - 1;
          document.getElementById('minutes').innerHTML = leftMinSession;
          timer.countDown()
        }
      },
      startBreak: function() {
        console.log('startBreak')
        leftMinBreak = initMinBreak;
        leftSecBreak = initSecBreak;
        timer.countDownBreak()
      },
      countDown: function() {
        console.log('countDown')
        isRunning = true;
        document.getElementById('seconds').innerHTML = leftSecSession;
        leftSecSession--;
        if (leftMinSession === -1) {
          isRunning = false;
          audio.play();
          return timer.startBreak();
        } else if (leftSecSession === -1) {
          leftMinSession--;
          document.getElementById('minutes').innerHTML = leftMinSession;
          leftSecSession = initSecSession;
          return timer.countDown();
        } else {
          t = setTimeout(timer.countDown, 1000);
        }
      },
      countDownBreak: function() {
        console.log('countDownBreak')
        document.getElementById('minutes').innerHTML = leftMinBreak;
        document.getElementById('seconds').innerHTML = leftSecBreak;
        leftSecBreak--;
        if ((leftMinBreak === 0 && leftSecBreak === 0) || leftMinBreak < 0) {
          isRunning = false;
          return audio.play();
        } else if (leftSecBreak === -1 || leftSecBreak < -1) {
          leftMinBreak--;
          document.getElementById('minutes').innerHTML = leftMinBreak;
          leftSecBreak = initSecSession;
          return timer.countDownBreak()
        } else {
          t = setTimeout(timer.countDownBreak, 1000);
        }
      }
    }
    // initiate state
  $('.reset').hide()
  $('.continue').hide()
  $('.pause').prop("disabled", true);

  $('#minusMin').click(function() {
    timer.minusMin()
  })

  $('#plusMin').click(function() {
    timer.plusMin()
  })

  $('#startBtn').click(function() {
    timer.startMe();
    $(this).hide()
    $('.reset').show()
    $('.pause').prop("disabled", false);
  })

  $('#plusMinBreak').click(function() {
    timer.plusMinBreak()
  })

  $('#minusMinBreak').click(function() {
    timer.minusMinBreak()
  })

  $('#resetBtn').click(function() {
    timer.resetMe();
    $(this).hide()
    $('.start').show()
    $('.pause').prop("disabled", true);
  })

  $('#pauseBtn').click(function() {
    timer.pauseMe();
    $(this).hide()
    $('.continue').show()
  })

  $('#continueBtn').click(function() {
    timer.continueMe();
    $(this).hide()
    $('.pause').show()
  })
}