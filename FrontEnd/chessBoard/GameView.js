import Game from './Game.js';
import Board from './Board.js';

function makeTriggerChoseMove(shadowBoard,game,gameView,i,j,x,y) {
    
    return function() {
        let boardArea = document.getElementById("boardArea");
        boardArea.removeChild(shadowBoard);
        let GamePtr = game;
        let GameView = gameView;
        GamePtr.pushBoard();//Save current board for returning to it...                
        GamePtr.currentBoard.boardMatrix[i][j] = GamePtr.currentBoard.boardMatrix[x][y];
        GamePtr.currentBoard.boardMatrix[x][y] = "E";
        let board = document.getElementById("board");
        boardArea.removeChild(board);
        GameView.render();
        if(gameView.Game.end(gameView.Game.currentBoard)) {
            alert("Cestitamo pobedili ste!");
        }
        else {
            gameView.MakeMove();
        }
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
        console.log(this.Game.difficulty);
        this.hintBuffer = [];        
    }

    makeXY(x, y) {
        let innerx = x;
        let innery = y;
        
        return [x,y];
    }

    imgURL(slovo) {
        let urls = {
            p:"./figure/beliPiun.png",
            r:"./figure/beliTop.png",
            n:"./figure/beliKonj.png",
            b:"./figure/beliLovac.png",
            q:"./figure/belaKraljica.png",
            k:"./figure/beliKralj.png",
            P:"./figure/crniPiun.png",
            R:"./figure/crniTop.png",
            N:"./figure/crniKonj.png",
            B:"./figure/crniLovac.png",
            Q:"./figure/crnaKraljica.png",
            K:"./figure/crniKralj.png"
        }
        return urls[slovo];
    }
    makeHintGameView(gv) {
        return function() {
            let copy = new Board(gv.Game.currentBoard.boardMatrix);
            gv.Game.MakeChildren("white",copy);
            copy.children.forEach(child=>{
                gv.Game.MakeChildren("black",child);
                child.children.forEach(child1=>{
                    gv.Game.MakeChildren("white",child1);
                })
            })
            copy.onMove = "white";
            gv.Game.Evaluate(copy);
            let bestBoard = gv.Game.search(copy);
            gv.hintBuffer = bestBoard.buffInfo;
            gv.rerender();
            gv.hintBuffer = [];
        }
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
                square.className = "square";
                if(colorControl) square.style.backgroundColor = '#898889';
                else square.style.backgroundColor = 'brown';
                if(this.hintBuffer.length != 0) {
                    if(this.hintBuffer[0] == i && this.hintBuffer[1] ==j)
                        square.style.backgroundColor = "aqua";
                    if(this.hintBuffer[2] == i && this.hintBuffer[3] == j)
                        square.style.backgroundColor = "aqua";
                }
                
                
            
        
                if(this.Game.currentBoard.boardMatrix[i][j] != 'E') {
                    let figura = document.createElement('img');
                    figura.src = this.imgURL(this.Game.currentBoard.boardMatrix[i][j]);
                    //square.innerHTML = this.Game.currentBoard.boardMatrix[i][j];
                    figura.className ="figura";
                    square.appendChild(figura);
                }
                colorControl = !colorControl;
                
                square.onclick = makeTriggerMakeMoves(i,j,this);
                row.appendChild(square);
            }
            board.appendChild(row);
            colorControl = !colorControl;
        }
        boardArea.appendChild(board);
    }
    rerender() {
        let board = document.getElementById("board");
        let boardArea = document.getElementById("boardArea");
        boardArea.removeChild(board);
        this.render();
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
     //Ai potez
     
    count(board) {
        let sum = 0;
        if(board.children.length == 0) {
            return 1;
        }
        else {
            for(let i =0; i < board.children.length;i++) {
                sum += this.count(board.children[i]);
            }
            return sum;
        }
    }

    makePlusDifficulty(disp,Game) {
        return function() {
            Game.difficulty = Game.difficulty + 1>3? 3: Game.difficulty+1;
            disp.innerHTML = Game.difficulty;
        }
    }
    makeMinusDiffculty(disp,Game) {
        return function() {
            Game.difficulty = Game.difficulty -1 < 1? 1: Game.difficulty -1;
            disp.innerHTML = Game.difficulty;
        }
    }

     MakeMove() {
         this.Game.MakeChildren("black",this.Game.currentBoard);
         if(this.Game.difficulty > 1) {
            this.Game.currentBoard.children.forEach(child=> {
                this.Game.MakeChildren("white",child);
                if(this.Game.difficulty > 2) {
                    child.children.forEach(child1=>{
                        this.Game.MakeChildren("black", child1);
                 
                 });
                }
            });
        }
         this.Game.currentBoard.onMove ="black";
         this.Game.Evaluate(this.Game.currentBoard);
         console.log(this.count(this.Game.currentBoard));
         let bestBoard = this.Game.search(this.Game.currentBoard);
         this.Game.currentBoard = bestBoard;
         this.Game.currentBoard.children = [];
         let staraTabla = document.getElementById("board");
         let boardArea = document.getElementById("boardArea");
         setTimeout(()=>{
            boardArea.removeChild(staraTabla);
            this.render();
         },500);
         
         if(this.Game.end(this.Game.currentBoard))
            alert("Pobedio je kompljuter");
     }
}