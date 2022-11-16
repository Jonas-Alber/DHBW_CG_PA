import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import {GameMaster} from '/controller/gameMaster.js';
import {ModelLoader} from '/view/modelLoader.js';

/**
* Start the game
*/
const setFPS = 30;

let activeControlButton = [];
let modelHandler = new ModelLoader();
let timeHandler;
await modelHandler.loadModel('asteroid1','3Dmodels/asteroid.glb');
await modelHandler.loadModel('asteroid2','3Dmodels/asteroid2.glb');
await modelHandler.loadModel('asteroid3','3Dmodels/asteroid3.glb');
await modelHandler.loadModel('player','3Dmodels/spaceship.glb');
await modelHandler.loadModel('projectile','3Dmodels/asteroid3.glb');
await modelHandler.loadModel('enemy','3Dmodels/enemy-red.glb');

var gameMaster = new GameMaster(modelHandler);
gameMaster.initGame();
setTimeout(3000);
startGame();


function startGame() {
    //TODO: Example Code to be Removed
    
    //End of Example Code

    //TODO: Example Code for Animation Rendering
    //ExampleAnimation.animateBlock();
    //End of Example Code

    //Load Player Entity

    //End of Player Load
    resumeGame();
    document.getElementById('controler').style.display = 'grid';
    //document.getElementById('animateScene').style.display = 'block';
    document.getElementById('loadingScreen').style.display = 'none';

  }

  /**
   * Stop the game
   */
  function stopGame() {
    pauseGame();
  }

  /**
   * Stop the animation rendering process
   */
  function pauseGame() {
    clearInterval(this.__task30ms);
  }

  /**
   * Start the animation rendering process
   */
  function resumeGame() {
    document.addEventListener("keydown", function(event){
      pressControlButton(event.key);
    });
    document.addEventListener("keyup", function(event){
      releaseControlButton(event.key);
    });
    registerControlButtonEventListener("controlMoveUp",'w');
    registerControlButtonEventListener("controlMoveDown",'s');
    registerControlButtonEventListener("controlMoveLeft",'a');
    registerControlButtonEventListener("controlMoveRight",'d');
    registerControlButtonEventListener("controlShoot",' ');
    timeHandler = setInterval(function(){
        if(!gameMaster.__task30ms()){
          clearTick();
        }
    }, 
    1000/setFPS
    );
  }

  function clearTick(){
    clearInterval(timeHandler);
  }

  function pressControlButton(parameter){
    var parameterExists = false;
    for(var indexPoint in activeControlButton){
      if(activeControlButton[indexPoint].key === parameter){
        parameterExists = true;
        break;
      }
    }
    if(!parameterExists){
      var interval = setInterval(function(){
        gameMaster.userInputHandler(parameter);
      }, 1000/setFPS);
      activeControlButton.push({key: parameter, function: interval});
    }
  }

/**Test */
  function releaseControlButton(parameter){
    for(var indexPoint in activeControlButton){
      if(activeControlButton[indexPoint].key == parameter){
        clearInterval(activeControlButton[indexPoint].function);
        activeControlButton.splice(indexPoint, 1);
        break;
      }
    }
  }

  function registerControlButtonEventListener(buttonId, buttonValue){
    document.getElementById(buttonId).addEventListener("mousedown", function(){
      pressControlButton(buttonValue);
    });
    document.getElementById(buttonId).addEventListener("mouseup", function(){
      releaseControlButton(buttonValue);
    });
  }
