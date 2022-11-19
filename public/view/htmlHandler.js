import { InfoScreenHandler } from '/view/infoScreen.js'
export function loadRightInfoScreen() {
  var rightInfoScreen = new InfoScreenHandler("rightInfoScreen");
  rightInfoScreen.addDivWithText("<h1>Backstory</h1>");
  rightInfoScreen.addDivWithText("Hello stranger,");
  rightInfoScreen.addDivWithText("apparently Tokrok has captured you too. Inside his ship are already stranded dozens of ships. But there is a way to escape. <h3>Destroy all of Tokrok's children and freedom will be yours.</h3>");
  rightInfoScreen.addDivWithText("<h3>But be careful, they use transphasic torpedoes that can fly through backstops.</h3>");
  rightInfoScreen.addDivWithText("Good luck!");
  return rightInfoScreen;
}

export class LeftInfoScreenLoader {
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

  setEnemyStatus(activeEnemies, everyEnemies) {
    var text = `<h3>Remaining Enemies <a>${activeEnemies}</a> out of <a>${everyEnemies}</a></h3>`
    this.leftInfoScreen.setInnerHTML(this.enemyCount, text);
  }
}

export function setWarningVisibility(visibility) {
  if (visibility) {
    document.getElementById('warningScreen').style.display = 'block';
  } else {
    document.getElementById('warningScreen').style.display = 'none';
  }
}

export function showGameEnd(playerIsAlive) {
  document.getElementById('endScreen').style.display = 'block';
  if (!playerIsAlive) {
    document.getElementById('endScreenType').innerHTML = "<h2>You have lost!</h2";
  }
  else {
    document.getElementById('endScreenType').innerHTML = "<h2>You have won!</h2";
  }
}

export function showGame() {
  document.getElementById('controler').style.display = 'grid';
  document.getElementById('loadingScreen').style.display = 'none';
}
