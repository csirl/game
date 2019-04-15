# CSIRL (Counter Strike In Real Life)
CSIRL is meant to be played as a real life version of Counter Strike. This game is played by two teams using Nerf, Laser Tag, or similar weapons. Best played in a large building or area.

This game only focuses on DE style maps, Bomb Defusal & Arsenal Demolition. As such the game includes a virtual reality bomb that must be planted in a target zone. Once armed the bomb can be defused by the counter terrorist team to win. The game also allows for bomb drops (person holding the bomb is killed), as well as the event of the entire team is killed before a bomb is planted.

This game is meant to be played on mobile devices, where one of the devices is the "bomb". The players will all be on the same screen that displays the bomb, however an additional device should be utilized as the true one "bomb". We recommend an iPad or Android tablet in a sturdy case (it will get dropped, a lot).

*PLEASE NOTE* - This game requires a back end running for real time communication between players. Simply running this repo will not do it. See the back end component in this GitHub Org for the complete game engine.

## Playing the game
This repo contains a single page application "game" to simulate the Counter Strike experience. 

<img src="https://github.com/csirl/game/blob/master/images/instructions/game-screen.png?raw=true" width="250" />

### Arming the bomb
You can arm the bomb by simply touching and holding the keypad on the bomb. This will bring up a progress bar to show you how long you have left to hold the keypad in order to arm. Once the progress bar is full, it will disappear. The timer on the bomb will be set to 0:45 and will begin to countdown. In addition, all players will be notified that the bomb has been planted.

<img src="https://github.com/csirl/game/blob/master/images/instructions/arming-bomb.png?raw=true" width="250" />

If the opposing team does not disarm the bomb by the time the timer hits 0:00, all players will be notified that the terrorists win and an explosion sound will be heard.

### Disarming the bomb
You can disarm the bomb by simply touching and holding the wires to the right of the bomb keypad. This will bring up a progress bar to show you how long you have left to hold the keypad in order to disarm. Once the progress bar is empty, it will disappear. In addition, all players will be notified that the bomb has been defused and that the counter terrorists have won.

<img src="https://github.com/csirl/game/blob/master/images/instructions/disarming-bomb.png?raw=true" width="250" />

### Additional actions
There are three buttons across the bottom of the screen. They can be used for the following actions:
* Drop or Pick Up the bomb - If the person carrying the bomb is killed, they will need to drop the bomb for another teammate to pick it up. You can press this button and it will play a "dropping" sound that will notify all players the bomb has been dropped. In addition, the device where the button was pressed will begin to issue a "ping" sound, so that all players can pin point its position. When the bomb is picked up, you can press this button again to turn off the ping.
* Counters Win - In the event that all members of the terrorists team is killed, prior to planting the bomb, press this button to notify all players the round is over.
* Terrorists Win - In the event that all members of the counter terrorists team is killed, prior to planting the bomb, press this button to notify all players the round is over.

### Links and Credits
https://gaming.stackexchange.com/questions/120218/how-many-seconds-count-until-bomb-detonates-in-counter-strike
