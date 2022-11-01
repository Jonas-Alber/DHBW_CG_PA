import * as WorldGenFactory from 'controller/worldGen'
import * as EntityHandler from 'controller/entityHandler'

const setFPS = 30;

class GameMaster{

  /**
   * Initializes the game
   */
  constructor(){
    var entityHandler = new EntityHandler();
    var worldGenFactory = new WorldGenFactory();
  }

  /**
   * Start the game
   */
  startGame(){
    this.resumeGame();
  }

  /**
   * Stop the game
   */
  stopGame(){
    this.pauseGame();
  }

  /**
   * Stop the animation rendering process
   */
  pauseGame(){
    clearInterval(this.__task30ms);
  }

  /**
   * Start the animation rendering process
   */
  resumeGame(){
    setInterval(this.__task30ms, setFPS);
  }

  /**
   * Tasks to be executed every frame
   */
  __task30ms(){
    
  }
}
