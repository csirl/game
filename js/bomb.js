window.bombSpace = {};

bombSpace.interval = 0;
bombSpace.armed = false;
bombSpace.armingInterval = 0;

bombSpace.fadeInProgressBar = function() {
    $("#bomb-progress").fadeIn('slow');
    $("#bomb-progress-bar").fadeIn('slow');
}

bombSpace.fadeOutProgressBar = function() {
    $("#bomb-progress").fadeOut('slow');
    $("#bomb-progress-bar").fadeOut('slow');
}

bombSpace.armBomb = function(socket) {
    if (bombSpace.armed == false) {
        var progressBar = $("#bomb-progress-bar"); 
        bombSpace.fadeInProgressBar();
        var width = 1;
        bombSpace.armingInterval = setInterval(frame, 50);
        function frame() {
            if (width >= 100) {
                bombSpace.armed = true;
                socket.emit('my broadcast event', {data: "bomb-planted"});
                clearInterval(bombSpace.armingInterval);
                bombSpace.fadeOutProgressBar();
            } else {
                width++; 
                $(progressBar).css('width', width + '%'); 
            }
        }
    }
}

bombSpace.defuseBomb = function(socket) {
    if (bombSpace.armed == true) {
        var progressBar = $("#bomb-progress-bar"); 
        bombSpace.fadeInProgressBar();
        var width = 100;
        bombSpace.armingInterval = setInterval(frame, 50);
        function frame() {
            if (width <= 0) {
                bombSpace.countdownStop();
                bombSpace.armed = false;
                socket.emit('my broadcast event', {data: "bomb-defused"});
                clearInterval(bombSpace.armingInterval);
                bombSpace.fadeOutProgressBar();
            } else {
                width--; 
                $(progressBar).css('width', width + '%'); 
            }
        }
    }
}

bombSpace.checkArmingProgress = function() {
    if (bombSpace.armed == false) {
        clearInterval(bombSpace.armingInterval);
        bombSpace.armingInterval = 0;
        var progressBar = $("#bomb-progress-bar");
        bombSpace.fadeOutProgressBar();
        $(progressBar).css('width', '1%'); 
    }
}

bombSpace.checkDefuseProgress = function() {
    if (bombSpace.armed == true) {
        clearInterval(bombSpace.armingInterval);
        bombSpace.armingInterval = 0;
        var progressBar = $("#bomb-progress-bar");
        bombSpace.fadeOutProgressBar();
        $(progressBar).css('width', '100%'); 
    }
}

bombSpace.bombHasBeenPlanted = function() {
            $('#bomb-timer').text('45');
            bombSpace.interval = setInterval(bombSpace.countDown, 1000);
            console.log("bomb started, interval set to: " + bombSpace.interval);
        }

bombSpace.bombHasBeenDefused = function() {
        bombSpace.countdownStop();
    }

bombSpace.terroristsWin = function() {
        soundSpace.bombExplosion();
        bombSpace.armed = false;
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
