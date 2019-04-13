window.soundSpace = {};

soundSpace.interval = 0;

soundSpace.bombHasBeenPlanted = function() {
        $('#bomb-has-been-planted').trigger('play');
    }

soundSpace.bombHasBeenDefused = function() {
        $('#bomb-has-been-defused').trigger('play');
    }

soundSpace.bombBeep = function() {
        $('#bomb-beep').trigger('play');
        $('#bomb-beep')[0].volume = 0.2;
    }

soundSpace.bombExplosion = function() {
        $('#bomb-explosion').trigger('play');
    }

soundSpace.terroristsWin = function() {
        $('#terrorists-win').trigger('play');
    }

soundSpace.counterTerroristsWin = function() {
        $('#counter-terrorists-win').trigger('play');
    }

soundSpace.toggleDroppedBombPing = function() {
        if (soundSpace.interval == 0) {
            $('#dropped-bomb').trigger('play');
            soundSpace.interval = setInterval(soundSpace.playDroppedBombPing, 3000);
        } else {
            clearInterval(soundSpace.interval);
            soundSpace.interval = 0;
        }
    }

soundSpace.playDroppedBombPing = function() {
    $('#dropped-bomb-ping').trigger('play');
}