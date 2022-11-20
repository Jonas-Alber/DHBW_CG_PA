/**
 * @file File Provides Functions to access the html functions
 * @Author Jonas Alber
 * @Version 1.0.0
 */

/**Start of import zone */
import { InfoScreenHandler } from '/view/infoScreen.js'
/**End of import zone */

/**
 *  Load the static data into the right Info screen
 */
export function loadRightInfoScreen() {
  var rightInfoScreen = new InfoScreenHandler("rightInfoScreen");
  rightInfoScreen.addDivWithText("<h1>Backstory</h1>");
  rightInfoScreen.addDivWithText("Hello stranger,");
  rightInfoScreen.addDivWithText("apparently Tokrok has captured you too. Inside his ship are already stranded dozens of ships. But there is a way to escape. <h3>Destroy all of Tokrok's children and freedom will be yours.</h3>");
  rightInfoScreen.addDivWithText("<h3>But be careful, they use transphasic torpedoes that can fly through backstops.</h3>");
  rightInfoScreen.addDivWithText("Good luck!");
  return rightInfoScreen;
}

/**
 * Load the static data into the left Info screen
 */
export class LeftInfoScreenLoader {
  /**
  * Load the static data into the left Info screen
  */
  constructor() {
    this.leftInfoScreen = new InfoScreenHandler("leftInfoScreen");
    this.leftInfoScreen.addDivWithText("<h1>Roffelson</h1>");
    this.leftInfoScreen.addDivWithText("<h1>The Space Warior</h1>");
    this.leftInfoScreen.addDivWithText(
      "<table style='width:90%;text-align: left; margin: 5%;'\
      <tr><td>W</td><td><i class='fa-solid fa-arrow-up'></i></td><td>Ship moves forward</td></tr>\
      <tr><td>S</td><td><i class='fa-solid fa-arrow-down'></td><td>Ship moves backward</td></tr>\
      <tr><td>A</td><td><i class='fa-solid fa-arrow-left'></td><td>Ship moves left</td></tr>\
      <tr><td>D</td><td><i class='fa-solid fa-arrow-right'></td><td>Ship moves right</td></tr>\
      <tr><td>Space</td><td><i class='fa-solid fa-meteor'></i></td><td>Ship shoot a projectile</td></tr>\
      </table>"
    );
    this.enemyCount = this.leftInfoScreen.addDivWithText("");
  }
  /**
   * Update the Enemy information section 
   * @param {int} activeEnemies - amount ov enemies alive
   * @param {int} everyEnemies - amount of all spawned enemies
   */
  setEnemyStatus(activeEnemies, everyEnemies) {
    var text = `<h3>Remaining Enemies <a>${activeEnemies}</a> out of <a>${everyEnemies}</a></h3>`
    this.leftInfoScreen.setInnerHTML(this.enemyCount, text);
  }
}

/**
 * Switch the Warning Screen which tells the player if he is near a border
 * @param {Boolean} visibility false = invisible, true = visible
 */
export function setWarningVisibility(visibility) {
  if (visibility) {
    document.getElementById('warningScreen').style.display = 'block';
  } else {
    document.getElementById('warningScreen').style.display = 'none';
  }
}

/**
 * Show the end screen with win or loose information
 * @param {Boolean} playerIsAlive false = dead, true = alive
 */
export function showGameEnd(playerIsAlive) {
  document.getElementById('endScreen').style.display = 'block';
  if (!playerIsAlive) {
    document.getElementById('endScreenType').innerHTML = "<h2>You have lost!</h2";
  }
  else {
    document.getElementById('endScreenType').innerHTML = "<h2>You have won!</h2";
  }
}

/**
 * Switch from the loadingScreen to the game Screen
 */
export function showGame() {
  document.getElementById('controler').style.display = 'grid';
  document.getElementById('loadingScreen').style.display = 'none';
}
