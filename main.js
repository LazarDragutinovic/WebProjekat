import Board from './Board.js';
import GameView from './GameView.js';





let testGameView = new GameView();
let btnPlus = document.getElementById("plus");
let btnMinus = document.getElementById("minus");
let disp = document.getElementById("disp");
btnPlus.onclick = testGameView.makePlusDifficulty(disp,testGameView.Game);
btnMinus.onclick = testGameView.makeMinusDiffculty(disp,testGameView.Game);
testGameView.render();
