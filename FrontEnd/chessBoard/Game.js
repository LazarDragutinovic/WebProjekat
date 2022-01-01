import Board from "./Board.js";


export default class Game {

    constructor() {
        let defaultBoardMatrix = [['R','N','B','Q','K','B','N','R'],
                                  ['P','P','P','P','P','P','P','P'],
                                  ['E','E','E','E','E','E','E','E'],
                                  ['E','E','E','E','E','E','E','E'],
                                  ['E','E','E','E','E','E','E','E'],
                                  ['E','E','E','E','E','E','E','E'],
                                  ['p','p','p','p','p','p','p','p'],
                                  ['r','n','b','q','k','b','n','r']
                                ];
        this.difficulty = 4;
        this.currentBoard = new Board(defaultBoardMatrix);
        this.prevBoards = [];

    }

    Undo() {
        let prevBoard = this.prevBoards.pop();
        this.currentBoard = prevBoard;
    }

    pushBoard() {
        let copy = new Board(this.currentBoard.boardMatrix);
        this.prevBoards.push(copy);
    }

    end(board) {
        
        let k = false;
        let K = false;
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                if(board.boardMatrix[i][j] == 'k')
                    k = true;
                if(board.boardMatrix[i][j] == 'K')
                    K = true;
            }
        }
        return !(k&&K);
    } 

    search(board) {
        for (let i = 0 ; i < board.children.length; i++) {
            if(board.value == board.children[i].value)
                return board.children[i];
        }
    }

    Evaluate(board) {
        if(board.children.length == 0 ) {
            let suma = 0;
            let vrednoca = {
                p:10,
                r:20,
                n:40,
                b:50,
                q:90,
                k:900,
                P:-10,
                R:-20,
                N:-40,
                B:-50,
                Q:-90,
                K:-900,
                E:0
            }
            for(let i = 0 ; i < 8; i++) {
                for(let j = 0; j < 8; j++) {
                    suma += vrednoca[board.boardMatrix[i][j]];
                }
            }
            board.value = suma;
        }
        else {
            if(board.onMove == "black") {
                let bestValue = 10000;
                board.children.forEach(child => {
                    this.Evaluate(child);
                    bestValue = Math.min(child.value,bestValue);
                });
                board.value = bestValue;
            }
            else {
                let bestValue = -10000;
                board.children.forEach(child => {
                    this.Evaluate(child);
                    bestValue = Math.max(child.value, bestValue);
                });
                board.value = bestValue;
            }
        }
    }
    MakeChildren(side,board) {
        if(board.Finished)return;
        if(side === "black") {
            for(let i = 0 ; i < 8; i++) {
                for(let j = 0 ; j < 8; j++) {
                    if(board.boardMatrix[i][j] != "E" && board.nasaFigura(i,j,"R")) {
                        let moves = board.potezi(i,j);
                        moves.forEach(move => {
                            let newboard = new Board(board.boardMatrix);
                            newboard.buffInfo = [move[0],move[1],i,j];
                            newboard.onMove = "white";
                            newboard.boardMatrix[move[0]][move[1]] = newboard.boardMatrix[i][j];
                            newboard.boardMatrix[i][j] = "E";
                            if(this.end(newboard))
                                newboard.Finished = true;
                            board.children.push(newboard);
                        })
                    }
                }
            }
        }
        else {
            for(let i=0;i<8;i++) {
                for(let j = 0; j < 8; j++) {
                    if(board.boardMatrix[i][j] != "E" && board.nasaFigura(i,j,"r")) {
                        let moves = board.potezi(i,j);
                        moves.forEach(move=>{
                            let newboard = new Board(board.boardMatrix);
                            newboard.buffInfo = [move[0],move[1],i,j];
                            newboard.onMove = "black";
                            newboard.boardMatrix[move[0]][move[1]] = newboard.boardMatrix[i][j];
                            newboard.boardMatrix[i][j] = "E";
                            if(this.end(newboard))
                                newboard.Finished = true;
                            board.children.push(newboard);
                        });
                    }
                }
            }
        }
    }
}