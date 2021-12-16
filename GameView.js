import Game from './Game.js';
import Board from './Board.js';

function makeTriggerChoseMove(shadowBoard,game,gameView,i,j,x,y) {
    
    return function() {
        let boardArea = document.getElementById("boardArea");
        boardArea.removeChild(shadowBoard);
        let GamePtr = game;
        let GameView = gameView;
                        
        GamePtr.currentBoard.boardMatrix[i][j] = GamePtr.currentBoard.boardMatrix[x][y];
        GamePtr.currentBoard.boardMatrix[x][y] = "E";
        let board = document.getElementById("board");
        boardArea.removeChild(board);
        GameView.render();
    }
}

function makeTriggerMakeMoves(i,j,gameView) {
    return function() {
        gameView.createShadowBoard(gameView.Game.currentBoard.potezi(i,j),i,j);
    }

}

function makeReales() {
    return function() {

    }
}

export default class GameView {

    constructor() {
        this.Game = new Game();
        
    }

    makeXY(x, y) {
        let innerx = x;
        let innery = y;
        
        return [x,y];
    }
    render() {
        let boardArea = document.getElementById("boardArea");
        boardArea.style.margin = '0 auto';
        boardArea.className = "boardArea";
        let board = document.createElement('div');
        board.id = "board";
        board.className = "board";
        let colorControl = true;
        for(let i = 0; i < 8; i++) {
            let row = document.createElement('div');
            row.className = "row";
            
            for(let j = 0 ; j < 8; j++) {
                let square = document.createElement('div');
                square.className = "square"
                if(colorControl) square.style.backgroundColor = 'white';
                else square.style.backgroundColor = 'brown';
                square.style.fontSize = 40+'px';
                
                if(this.Game.currentBoard.boardMatrix[i][j] != 'E') square.innerHTML = this.Game.currentBoard.boardMatrix[i][j];
                colorControl = !colorControl;
                
                square.onclick = makeTriggerMakeMoves(i,j,this);
                row.appendChild(square);
            }
            board.appendChild(row);
            colorControl = !colorControl;
        }
        boardArea.appendChild(board);
    }
    createShadowBoard(potezi, x,y) {
        if(!this.Game.currentBoard.nasaFigura(x,y,'p')) return;
        let boardArea = document.getElementById("boardArea");
        let shadowBoard = document.createElement("div");
        shadowBoard.className = "shadowBoard";
        let shadowRow;
        if (potezi == null) return;
        let shadowSquare;
        for (let i = 0; i < 8; i++) {
            shadowRow = document.createElement("div");
            shadowRow.className = "shadowRow";
            
            for(let j =0; j < 8; j++) {
                shadowSquare = document.createElement("div");
                shadowSquare.className = "shadowSquare";
                
                let potezArr = potezi.filter(p => p[0] == i && p[1] == j);//potezArr ima jedan potez

                if (potezArr.length != 0) {
                    shadowSquare.style.backgroundColor = "yellow";
                    shadowSquare.style.opacity = "0.6";
                    let potez = potezArr[0];
                    let game = this.Game;
                    let gameView = this;
                    shadowSquare.onclick = makeTriggerChoseMove(shadowBoard,game,gameView,i,j,x,y);//function() {
                        
                }
                else {
                    shadowSquare.onclick = () => {
                        boardArea.removeChild(shadowBoard);
                    }
                }

                shadowRow.appendChild(shadowSquare);
            }

            shadowBoard.appendChild(shadowRow);
        }
        boardArea.appendChild(shadowBoard);
     }
}