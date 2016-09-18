window.onload = function() {

    var initSession = 25;
    var leftSession;
    var initBreak = 5;
    var leftBreak;
    var timer;
    var isTimerOn = false;
    var audio = new Audio('http://www.ringelkater.de/Sounds/2geraeusche_gegenst/pendulum.wav');



    function pauseMe() {
        clearTimeout(t);
        isTimerOn = false;
    }

    function resetMe() {
        document.getElementById('txt').value = initSession;
        isTimerOn = false;
        pauseMe()
    }


    function startMe() {
        if (!isTimerOn) {
            isTimerOn = true;
            leftSession = initSession;
            countDown()
        }
    }


    function minusMin() {
        initSession--;
        console.log(initSession)
        document.getElementById("p1").innerHTML = initSession;
        document.getElementById("txt").value = initSession;
    }

    function plusMin() {
        initSession++;
        console.log(initSession)
        document.getElementById("p1").innerHTML = initSession;
        document.getElementById("txt").value = initSession;
    }


    function minusMinBreak() {
        initBreak--;
        console.log(initBreak)
        document.getElementById("p2").innerHTML = initBreak;

    }

    function plusMinBreak() {
        initBreak++;
        console.log(initBreak)
        document.getElementById("p2").innerHTML = initBreak;

    }

    function continueMe() {
        isTimerOn = true;
        if (leftSession === 0) {

            countDownBreak()
        } else {
            countDown()
        }
    }


    function countDown() {
        document.getElementById('txt').value = leftSession;
        leftSession--;
        if (leftSession === 0 || leftSession < 0) {
            isTimerOn = true;
            leftBreak = initBreak;
            audio.play();
            countDownBreak()
        } else {
            timer = setTimeout(function() {
                console.log('leftSession', leftSession)
                countDown()
            }, 1000);
        }
    }

    function countDownBreak() {
        document.getElementById('txt').value = leftBreak;
        leftBreak--;
        if (leftBreak === 0 || leftBreak < 0) {
            pauseMe()

            console.log('stopeed')
            document.getElementById('txt').value = 0;
            audio.play();
        } else {
            timer = setTimeout(function() {
                console.log('leftBreak', leftBreak)
                countDownBreak()
            }, 1000);
        }
    }


    $('#minusMin').click(function() {
        minusMin()
    })

    $('#plusMin').click(function() {
        plusMin()
    })

    $('#startBtn').click(function() {
        startMe();
    })


    $('#plusMinBreak').click(function() {
        plusMinBreak()
    })

    $('#minusMinBreak').click(function() {
        minusMinBreak()
    })

    $('#resetBtn').click(function() {
        resetMe();
    })

    $('#pauseBtn').click(function() {
        pauseMe();
    })

    $('#continueBtn').click(function() {
        continueMe();
    })
}