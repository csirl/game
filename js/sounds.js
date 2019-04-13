window.soundSpace = {};

soundSpace.bombHasBeenPlanted = function() {
        $('#bomb-has-been-planted').trigger('play');
    }

soundSpace.bombBeep = function() {
        $('#bomb-beep').trigger('play');
        $('#bomb-beep')[0].volume = 0.2;
    }
    