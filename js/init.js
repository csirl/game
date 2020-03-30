$(document).ready(function () {
    var socket = io.connect('http://localhost:5000/csirl');

    // Respond to any broadcast messages that come from the server
    socket.on('response', function (msg) {
        console.log(msg.data);

        if (msg.data == "counter-terrorists-win") {
            soundSpace.counterTerroristsWin();
        }
        if (msg.data == "terrorists-win") {
            soundSpace.terroristsWin();
        }
        if (msg.data == "bomb-planted") {
            soundSpace.bombHasBeenPlanted();
            bombSpace.bombHasBeenPlanted();
        }
        if (msg.data == "bomb-defused") {
            soundSpace.bombHasBeenDefused();
            bombSpace.bombHasBeenDefused();
        }
        if (msg.data == "bomb-dropped") {
            soundSpace.playDroppedBomb();
        }
        if (msg.data == "bomb-ping") {
            soundSpace.playDroppedBombPing();
        }
        if (msg.data == "match-started") {
            soundSpace.startMatch();
        }
    });

    // Hide buttons based on the device the user is carrying BOMB or PLAYER
    $("input[name='devicetype']").click(function () {
        var devicetype = $("input[name='devicetype']:checked").val();
        if (devicetype == "player") {
            $("#btn-start-match").hide();
            $("#btn-bomb-drop").hide();
            $("#btn-bomb-pu").hide();
            $("#btn-counter-terrorists-win").show();
            $("#btn-terrorists-win").show();
        }
        if (devicetype == "bomb") {
            $("#btn-start-match").show();
            $("#btn-bomb-drop").show();
            $("#btn-bomb-pu").show();
            $("#btn-counter-terrorists-win").hide();
            $("#btn-terrorists-win").hide();
        }
    });

    // Wire up the CT WIN button, used to indicate all Ts are dead and match is over
    $('#btn-counter-terrorists-win').click(function () {
        socket.emit('broadcast', { data: "counter-terrorists-win" });
        return false;
    });

    // Wire up the T WIN button, used to indicate all CTs are dead and match is over
    $('#btn-terrorists-win').click(function () {
        socket.emit('broadcast', { data: "terrorists-win" });
        return false;
    });

    // Wire up the bombing arm sequence, mousedown to arm, and check progress to show arming progress bar
    $('#bomb-keypad').on('touchstart mousedown', function () {
        bombSpace.armBomb(socket);
    }).on('touchend mouseup', function () {
        bombSpace.checkArmingProgress();
    });

    // Wire up the defuse sequence, mousedown to defuse, and check progress to show defusing progress bar
    $('#bomb-wires').on('touchstart mousedown', function () {
        bombSpace.defuseBomb(socket);
    }).on('touchend mouseup', function () {
        bombSpace.checkDefuseProgress();
    });

    // Wire up the drop bomb button, used when the person carrying the bomb is killed, they must press to alert others the bomb has been dropped
    $('#btn-bomb-drop').click(function () {
        bombSpace.bombHasBeenDropped(socket);
        soundSpace.toggleDroppedBombPing(true);
    });

    // Wire up the drop bomb button, used when the person carrying the bomb is killed, they must press to alert others the bomb has been dropped
    $('#btn-bomb-pu').click(function () {
        soundSpace.toggleDroppedBombPing(false);
    });

    $('#btn-start-match').click(function () {
        bombSpace.startMatch(socket);
    });

    // Trigger a click event on the radio buttons to hide buttons properly
    $("input[name='devicetype']:first").trigger("click");
});