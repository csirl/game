window.bombSpace = {};

bombSpace.interval = 0;
bombSpace.armed = false;
bombSpace.armingInterval = 0;

bombSpace.armBomb = function() {
    if (bombSpace.armed == false) {
        var progressBar = document.getElementById("bomb-progress-bar"); 
        $(progressBar).fadeIn('slow');
        var width = 1;
        bombSpace.armingInterval = setInterval(frame, 50);
        function frame() {
            if (width >= 100) {
                bombSpace.armed = true;
                bombSpace.bombHasBeenPlanted();
                clearInterval(bombSpace.armingInterval);
                $(progressBar).fadeOut('slow');
            } else {
                width++; 
                progressBar.style.width = width + '%'; 
            }
        }
    }
}

bombSpace.defuseBomb = function() {
    if (bombSpace.armed == true) {
        var progressBar = document.getElementById("bomb-progress-bar"); 
        $(progressBar).fadeIn('slow');
        var width = 100;
        bombSpace.armingInterval = setInterval(frame, 50);
        function frame() {
            if (width <= 0) {
                bombSpace.countdownStop();
                bombSpace.armed = false;
                bombSpace.counterTerroristsWin();
                clearInterval(bombSpace.armingInterval);
                $(progressBar).fadeOut('slow');
            } else {
                width--; 
                progressBar.style.width = width + '%'; 
            }
        }
    }
}

bombSpace.checkArmingProgress = function() {
    if (bombSpace.armed == false) {
        clearInterval(bombSpace.armingInterval);
        bombSpace.armingInterval = 0;
        var progressBar = document.getElementById("bomb-progress-bar");
        $(progressBar).fadeOut('slow');
        progressBar.style.width = '1%';
    }
}

bombSpace.checkDefuseProgress = function() {
    if (bombSpace.armed == true) {
        clearInterval(bombSpace.armingInterval);
        bombSpace.armingInterval = 0;
        var progressBar = document.getElementById("bomb-progress-bar");
        $(progressBar).fadeOut('slow');
        progressBar.style.width = '100%';
    }
}

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
        window.setTimeout(function(){ 
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
