import Board from './Board.js';
import GameView from './GameView.js';





let testGameView = new GameView();
let btnPlus = document.getElementById("plus");
let btnMinus = document.getElementById("minus");
let disp = document.getElementById("disp");
let undoBtn = document.getElementById("undoBtn");
btnPlus.onclick = testGameView.makePlusDifficulty(disp,testGameView.Game);
btnMinus.onclick = testGameView.makeMinusDiffculty(disp,testGameView.Game);
undoBtn.onclick = () => {
    if(testGameView.Game.prevBoards.length != 0) {
        testGameView.Game.Undo();
        testGameView.rerender();
    }
}
let hintBtn = document.getElementById("hintBtn");
hintBtn.onclick = testGameView.makeHintGameView(testGameView);
testGameView.render();
