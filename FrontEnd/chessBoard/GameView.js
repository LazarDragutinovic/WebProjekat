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
        //let board = document.getElementById("board");
        //boardArea.removeChild(board);
        GameView.parrent.moves++;
        GameView.rerender();
        if(gameView.Game.end(gameView.Game.currentBoard)) {
            alert("Cestitamo pobedili ste!");
            if(confirm("Da li zelite da sacuvate igru?")) {
                let name = prompt("Unesite ime igre");
    
                let board = "";
                for(let i = 0; i < 8 ; i++) {
                    for(let j = 0; j < 8; j++) {
                        board += GamePtr.currentBoard.boardMatrix[i][j];

                    }
                }
                fetch(`https://localhost:5001/Game/AddGame/w/${GameView.parrent.gameDifficulty}/${board}/${GameView.parrent.User.id}/${name}/${GameView.parrent.moves}`, {

                method: "POST"
                }).then(resp => {
                    if (resp.ok) {
                        fetch(`https://localhost:5001/Achivments/GetAchivments/${gameView.parrent.User.id}`).then(resp=>{
                            if(resp.ok) {
                                resp.json().then(achvs=>{
                                    achvs.forEach(ach=> {
                                        if(gameView.parrent.gameDifficulty == 3 && ach.tier == "three" && ach.compleated < 100) {
                                            fetch(`https://localhost:5001/Achivments/UpdateAchivment/${ach.id}/${ach.compleated + 20}`,{method: "PUT"})
                                            .then(resp=>{
                                                GameView.parrent.state = 2;
                                                GameView.parrent.rerender();
                                            });        
                                        }
                                        else if(gameView.parrent.gameDifficulty == 2 && ach.tier == "two" && ach.compleated < 100) {
                                            fetch(`https://localhost:5001/Achivments/UpdateAchivment/${ach.id}/${ach.compleated + 20}`,{method: "PUT"})
                                            .then(resp=>{
                                                GameView.parrent.state = 2;
                                                GameView.parrent.rerender();
                                            });
                                        }
                                        else if (gameView.parrent.gameDifficulty == 1 && ach.tier == "one" && ach.compleated < 100) {
                                            fetch(`https://localhost:5001/Achivments/UpdateAchivment/${ach.id}/${ach.compleated + 20}`,{method: "PUT"})
                                            .then(resp=>{
                                                GameView.parrent.state = 2;
                                                GameView.parrent.rerender();
                                            });
                                        }
                                    })
                                    
                                    
                                })    
                            }
                            else {

                            }
                        })
                        
                    }
                    else {
                        alert("Nije sacuvana igra.")
                    }
                })
            }
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


export default class GameView {

    constructor(parrent, board) {
        this.Game = new Game(board);
        console.log(this.Game.difficulty);
        this.hintBuffer = [];
        this.parrent = parrent;        
    }

    makeXY(x, y) {
        let innerx = x;
        let innery = y;
        
        return [x,y];
    }

    imgURL(slovo) {
        let urls = {
            p:"./chessBoard/figure/beliPiun.png",
            r:"./chessBoard/figure/beliTop.png",
            n:"./chessBoard/figure/beliKonj.png",
            b:"./chessBoard/figure/beliLovac.png",
            q:"./chessBoard/figure/belaKraljica.png",
            k:"./chessBoard/figure/beliKralj.png",
            P:"./chessBoard/figure/crniPiun.png",
            R:"./chessBoard/figure/crniTop.png",
            N:"./chessBoard/figure/crniKonj.png",
            B:"./chessBoard/figure/crniLovac.png",
            Q:"./chessBoard/figure/crnaKraljica.png",
            K:"./chessBoard/figure/crniKralj.png"
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
        let boardArea = document.createElement("div");
        boardArea.id = "boardArea";
        boardArea.style.margin = '0 auto';
        boardArea.className = "boardArea";
        this.drawBoard(boardArea);
        /*let board = document.createElement('div');
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
        boardArea.appendChild(board);*/
        return boardArea;
    }
    drawBoard(boardArea) {
        
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
                if(colorControl) square.style.backgroundColor = 'rgb(98,95,95)';
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
        if(this.Game.end(this.Game.currentBoard)) return;
        let board = document.getElementById("board");
        let boardArea = document.getElementById("boardArea");
        boardArea.removeChild(board);
        this.drawBoard(boardArea);
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
         if(this.parrent.gameDifficulty > 1) {
            this.Game.currentBoard.children.forEach(child=> {
                this.Game.MakeChildren("white",child);
                if(this.parrent.gameDifficulty > 2) {
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
         
         let boardArea = document.getElementById("boardArea");
         let staraTabla = document.getElementById("board");
         setTimeout(()=>{
            this.rerender(boardArea);
         },500);
         
         if(this.Game.end(this.Game.currentBoard)) {
            alert("Pobedio je kompljuter");
            if(confirm("Da li zelite da sacuvate igru?")) {
                let name = prompt("Unesite ime igre:");
                let board = ""
                for(let i = 0; i < 8; i++) {
                    for(let j = 0 ; j < 8 ; j++) {
                        board += this.Game.currentBoard.boardMatrix[i][j];
                    }
                }
        
                let ptr = this.parrent;
                fetch(`https://localhost:5001/Game/AddGame/l/${this.parrent.gameDifficulty}/${board}/${this.parrent.User.id }/${name}/${ptr.moves}`
                ,{method: "POST"})
                .then(resp => {
                    ptr.state = 2;
                    ptr.rerender();
                });
            }
        
         }
     }
}