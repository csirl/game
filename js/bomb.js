window.bombSpace = {};

bombSpace.interval = 0;
bombSpace.armed = false;
bombSpace.armingInterval = 0;


// Handles broadcasting the match has started
bombSpace.startMatch = function (socket) {
    socket.emit('broadcast', { data: "match-started" });
}

// Handles fading in the progress bar for arming/defusing
bombSpace.fadeInProgressBar = function () {
    $("#bomb-progress").fadeIn('slow');
    $("#bomb-progress-bar").fadeIn('slow');
}

// Handles fading out the progress bar for arming/defusing
bombSpace.fadeOutProgressBar = function () {
    $("#bomb-progress").fadeOut('slow');
    $("#bomb-progress-bar").fadeOut('slow');
}

// Handles process for arming the bomb
bombSpace.armBomb = function (socket) {
    if (bombSpace.armed == false) {
        var progressBar = $("#bomb-progress-bar");
        bombSpace.fadeInProgressBar();
        var width = 1;
        bombSpace.armingInterval = setInterval(frame, 50);
        function frame() {
            if (width >= 100) {
                bombSpace.armed = true;
                socket.emit('broadcast', { data: "bomb-planted" });
                clearInterval(bombSpace.armingInterval);
                bombSpace.fadeOutProgressBar();
            } else {
                width++;
                $(progressBar).css('width', width + '%');
            }
        }
    }
}

// Handles process for defusing the bomb
bombSpace.defuseBomb = function (socket) {
    if (bombSpace.armed == true) {
        var progressBar = $("#bomb-progress-bar");
        bombSpace.fadeInProgressBar();
        var width = 100;
        bombSpace.armingInterval = setInterval(frame, 50);
        function frame() {
            if (width <= 0) {
                bombSpace.countdownStop();
                bombSpace.armed = false;
                socket.emit('broadcast', { data: "bomb-defused" });
                clearInterval(bombSpace.armingInterval);
                bombSpace.fadeOutProgressBar();
            } else {
                width--;
                $(progressBar).css('width', width + '%');
            }
        }
    }
}

// Checks the progress of the arming sequence, if bomb is not armed on mouseup of keypad, the progress bar is set to 0
bombSpace.checkArmingProgress = function () {
    if (bombSpace.armed == false) {
        clearInterval(bombSpace.armingInterval);
        bombSpace.armingInterval = 0;
        var progressBar = $("#bomb-progress-bar");
        bombSpace.fadeOutProgressBar();
        $(progressBar).css('width', '1%');
    }
}

// Checks the progress of the defuse sequence, if bomb is not defused on mouseup of keypad, the progress bar is set to 0
bombSpace.checkDefuseProgress = function () {
    if (bombSpace.armed == true) {
        clearInterval(bombSpace.armingInterval);
        bombSpace.armingInterval = 0;
        var progressBar = $("#bomb-progress-bar");
        bombSpace.fadeOutProgressBar();
        $(progressBar).css('width', '100%');
    }
}

// Sets the timer to 45 seconds and sets the countdown in 1 second intervals
bombSpace.bombHasBeenPlanted = function () {
    $('#bomb-timer').text('45');
    bombSpace.interval = setInterval(bombSpace.countDown, 1000);
    console.log("bomb started, interval set to: " + bombSpace.interval);
}

// Stops the countdown on the bomb timer in the event of a defusal
bombSpace.bombHasBeenDefused = function () {
    bombSpace.countdownStop();
}

// Broadcasts that the bomb has been dropped to all players, this happens in the event the bomb carrier is killed
bombSpace.bombHasBeenDropped = function (socket) {
    socket.emit('broadcast', { data: "bomb-dropped" });
}

// Stops the countdown on the bomb timer
bombSpace.countdownStop = function () {
    $('#bomb-timer').text('00');
    clearInterval(bombSpace.interval);
}

// Performs the actual countdown on the bomb timer
bombSpace.countDown = function () {
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

// Play bomb explosion, reset the bomb armed flag, and play terrorists win sound
bombSpace.terroristsWin = function () {
    soundSpace.bombExplosion();
    bombSpace.armed = false;
    window.setTimeout(function () {
        soundSpace.terroristsWin();
    }, 2000);
}

// Placeholder
bombSpace.counterTerroristsWin = function () {

}
