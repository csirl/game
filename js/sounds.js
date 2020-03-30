window.soundSpace = {};

soundSpace.interval = 0;

soundSpace.startMatch = function () {
    $('#get-in-position').trigger('play');

    setTimeout(function () {
        $('#lock-load').trigger('play');
    }, 5000);

    setTimeout(function () {
        $('#go-go-go').trigger('play');
    }, 8000);
}

soundSpace.bombHasBeenPlanted = function () {
    $('#bomb-has-been-planted').trigger('play');
}

soundSpace.bombHasBeenDefused = function () {
    $('#bomb-has-been-defused').trigger('play');
    setTimeout(function () {
        soundSpace.counterTerroristsWin();
    }, 2000);
}

// This should only play on the device acting as the bomb, its an audio signal for players to know where the bomb is
soundSpace.bombBeep = function () {
    $('#bomb-beep').trigger('play');
    // this mp3 came out way too loud, lowering the volume to match the other mp3 files
    $('#bomb-beep')[0].volume = 0.4;
}

soundSpace.bombExplosion = function () {
    $('#bomb-explosion').trigger('play');
}

soundSpace.terroristsWin = function () {
    $('#terrorists-win').trigger('play');
}

soundSpace.counterTerroristsWin = function () {
    $('#counter-terrorists-win').trigger('play');
}

soundSpace.playDroppedBombPing = function () {
    $('#dropped-bomb-ping').trigger('play');
}

soundSpace.playDroppedBomb = function () {
    $('#dropped-bomb').trigger('play');
}

// This should only play on the device acting as the bomb, its an audio signal for players to know where the bomb is
soundSpace.toggleDroppedBombPing = function (toggle) {
    if (toggle) {
        soundSpace.interval = setInterval(soundSpace.playDroppedBombPing, 3000);
    } else {
        clearInterval(soundSpace.interval);
        soundSpace.interval = 0;
    }
}