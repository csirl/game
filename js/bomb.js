window.bombSpace = {};

bombSpace.interval = 0;

bombSpace.countdownStart = function() {
            $('#bomb-timer').text('45');
            bombSpace.interval = setInterval(bombSpace.countDown, 1000);
            soundSpace.bombHasBeenPlanted();
    
            console.log("bomb started, interval set to: " + bombSpace.interval);
        }

bombSpace.countdownStop = function() {
            $('#bomb-timer').text('00');
        }

bombSpace.countDown = function() {
            console.log("countdown interval, interval set to: " + bombSpace.interval);
    
            timerText = $('#bomb-timer').text();
            timerNumber = parseInt(timerText);
            timerNumber = timerNumber - 1;
    
            if (timerNumber < 10) {
                timerNumber = "0" + timerNumber;
            }
    
            if (timerNumber == 0) {
                clearInterval(bombSpace.interval);
            }
    
            $('#bomb-timer').text(timerNumber);
            soundSpace.bombBeep();
        }
