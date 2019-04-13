window.bombSpace = {};

bombSpace.interval = 0;

bombSpace.bombHasBeenPlanted = function() {
            $('#bomb-timer').text('45');
            bombSpace.interval = setInterval(bombSpace.countDown, 1000);
            soundSpace.bombHasBeenPlanted();
    
            console.log("bomb started, interval set to: " + bombSpace.interval);
        }

bombSpace.bombHasBeenDefused = function() {
        bombSpace.countdownStop();
        bombSpace.counterTerroristsWin();
    }

bombSpace.terroristsWin = function() {
        soundSpace.bombExplosion();
        setTimeout(function(){ 
            soundSpace.terroristsWin();
        }, 2000);
    }

bombSpace.counterTerroristsWin = function() {
        soundSpace.bombHasBeenDefused();
        setTimeout(function(){ 
            soundSpace.counterTerroristsWin();
        }, 2000);
    }

bombSpace.countdownStop = function() {
            $('#bomb-timer').text('00');
            clearInterval(bombSpace.interval);
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
                bombSpace.countdownStop();
                bombSpace.terroristsWin();
            }
    
            $('#bomb-timer').text(timerNumber);
            soundSpace.bombBeep();
        }
