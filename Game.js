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

        this.currentBoard = new Board(defaultBoardMatrix);

    }

    AIMove() {
        //for later
    }

    
}