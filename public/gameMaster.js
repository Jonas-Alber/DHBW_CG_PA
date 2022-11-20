/**
 * @file Manage the Game which is shown in the center canvas of the index.html file
 * @Author Jonas Alber
 * @Version 1.0.0
 */

/**Start of import zone */
import { ModelLoader } from '/view/modelLoader.js';
import { AudioLoader } from '/view/audioLoader.js';
import {hideStartScreen, LeftInfoScreenLoader, loadRightInfoScreen, setWarningVisibility, showGameEnd, showGame } from '/view/htmlHandler.js';
import { WorldGen } from '/controller/worldGen.js'
import { render,getListener } from '/view/view.js';
/**End of import zone */

/**Start of constant definition zone */
const setFPS = 30;
//If false game will wait with loading until the user press l on his keyboard
const autoHideLoadingScreen = true;
/**End of constant definition zone */

/**Start of undefined variable zone */
let timeHandler;
let worldGen;
let leftInfoScreen;
/**End of undefined variable zone */

/**Start of defined variable zone */
var activeControlButton = [];
var modelLoader = new ModelLoader();
var audioLoader = new AudioLoader(getListener());
var playerIsAlive = true;
/**End of defined variable zone */

/** Start of Load 3D Model zone */
await modelLoader.loadModel('asteroid1', '3Dmodels/asteroid.glb');
//await modelLoader.loadModel('asteroid2', '3Dmodels/asteroid2.glb');
//await modelLoader.loadModel('asteroid3', '3Dmodels/asteroid3.glb');
await modelLoader.loadModel('player', '3Dmodels/spaceship.glb');
await modelLoader.loadModel('projectile', '3Dmodels/projectile-magma-ball.glb');
await modelLoader.loadModel('enemy', '3Dmodels/enemy-red.glb');
/** End of Load 3D Model zone */

// One-liner to resume playback when user interacted with the page.
document.getElementById("startGameButton").addEventListener('click', function() {
  var context = new AudioContext();
  context.resume().then(() => {
    console.log('Playback resumed successfully');
    audioLoader.playAudio(bgAudioIndex);
    hideStartScreen(true);
    startGame()
  });
});

var bgAudioIndex = await audioLoader.loadAudio('background', 'sound/background.mp3');
var winAudioIndex = await audioLoader.loadAudio('win', 'sound/winSound.mp3');
var looseAudioIndex = await audioLoader.loadAudio('loose', 'sound/looseSound.mp3');
//Start Game after loading all 3D model
initGame();
function startGame(){
  timeHandler = setInterval(function () { task30ms(); }, 1000 / setFPS);
}

/**
 * Initializes the game and all necessary class instances
 * After initialization, it starts the game
 */
function initGame() {
  //Initialize the WorldGen and transfers the loaded 3D models
  worldGen = new WorldGen(modelLoader, 130, 1);

  //Add Event Listener for Keyboard Button Press and Release
  document.addEventListener("keydown", function (event) {
    __pressControlButton(event.key);
  });
  document.addEventListener("keyup", function (event) {
    __releaseControlButton(event.key);
  });

  //Set Data into the Left and Right Info Screen 
  loadRightInfoScreen();
  leftInfoScreen = new LeftInfoScreenLoader();

  if (autoHideLoadingScreen) {
    //Start the Rendering Process via call task30ms 
    //Switch to the gameScreen
    showGame();
  }
  else {
    document.addEventListener("keydown", function (event) {
      if (event.key == "l") {
        //Start the Rendering Process via call task30ms 
        //Switch to the gameScreen
        showGame();
      }
    });
  }


}

/**
 * Function to be called every 30Ms
 * Handler the game rendering and movement of the objects
 */
function task30ms() {
  //Call the render function to render all 3D objects
  render();

  //Check if playerObject didn't exist
  if (!worldGen.checkLoadStatus(worldGen.entityHandler.getPlayerEntityIndex())) {
    //If the playerObject didn't exist, the player is dead and the game ends.
    playerIsAlive = false;
    stopGame();
  }

  //Check if the player destroyed all enemies
  else if (worldGen.enemyAmount - worldGen.entityHandler.destroyedEnemies <= 0) {
    //if the player destroyed all enemies, the game ends.
    stopGame();
  }

  //If the game not stops,call makeDecision on every entity in the entity handler
  else {
    //Call every Entities makeDecision function
    worldGen.entityHandler.moveObjects();
  }
  //Update the info field which shows the enemys that are alive
  leftInfoScreen.setEnemyStatus(worldGen.enemyAmount - worldGen.entityHandler.destroyedEnemies, worldGen.enemyAmount);
}

/**
 * Stop the game and show the end screen
 */
function stopGame() {
  //Show end screen
  showGameEnd(playerIsAlive);
  audioLoader.stopAudio(bgAudioIndex);
  if(playerIsAlive){
    audioLoader.stopAudio(winAudioIndex);
  }
  else{
    audioLoader.playAudio(looseAudioIndex);
  }

  //Clear task30ms interval
  clearInterval(timeHandler);

  //Add Event Listener for Keyboard Button Press and Release
  document.removeEventListener("keydown", function (event) {
    __pressControlButton(event.key);
  });
  document.removeEventListener("keyup", function (event) {
    __releaseControlButton(event.key);
  });
}

/**
 * Called up when a button on the keyboard is pressed. 
 * Adds the button to the userInput call.
 * @param {event.key} parameter - Key of the Pressed Keyboard button
 */
function __pressControlButton(parameter) {
  var parameterNotExists = true;

  //Loop over all buttons pressed
  for (var indexPoint in activeControlButton) {
    //If the button is already pressed, break the loop and end the function
    if (activeControlButton[indexPoint].key === parameter) {
      parameterNotExists = false;
      break;
    }
  }
  //If the button not exists, add it to the intervals
  if (parameterNotExists) {
    //Create Interval which add the Button every Frame to the player pressed buttons.
    var interval = setInterval(function () {
      var playerIndex = worldGen.entityHandler.objects.findIndex(worldGen.entityHandler.checkIsPlayerEntity);
      worldGen.entityHandler.getObject(playerIndex).storeUserInput(parameter);
      setWarningVisibility(worldGen.isPlayerNearBorder(0))
    }, 1000 / setFPS);
    //Add the Interval to the activeControlButton Array
    activeControlButton.push({ key: parameter, function: interval });
  }
}

/**
 * Called up when a button on the keyboard is released. 
 * Remove the button to the userInput call.
 * @param {event.key} parameter - Key of the Released Keyboard button
 */
function __releaseControlButton(parameter) {
  //Loop over all buttons pressed
  for (var indexPoint in activeControlButton) {
    //Check if the button is in the array
    if (activeControlButton[indexPoint].key == parameter) {
      //If the button is in the array, clear the Interval
      //Then remove the Button from the activeControlButton Array
      clearInterval(activeControlButton[indexPoint].function);
      activeControlButton.splice(indexPoint, 1);
      break;
    }
  }
}
