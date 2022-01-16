import Nav from "./Navbar/Nav.js"
import Footer from "./Footer/Footer.js"
import Container from "./Container/Container.js"
import LogInForm from "./LogInForm/LogInForm.js"
import makeAccountForm from "./MakeAccountForm/MakeAccountForm.js";
import Dashboard from "./Dashboard/Dashboard.js"
import GameSettings from "./GameSettings/GameSettings.js"
import GameView from "./chessBoard/GameView.js"
import Button from "./Button/Button.js"
import LoadGameForm from "./LoadGameForm/LoadGameForm.js";


class App {

    constructor() {
        this.state = 1;
        this.logedin = false;
        this.gameState = null;
        this.gameDifficulty = null;
        this.gameBoard = "";
        this.load = false;
        this.moves = 0;
    }

    start() {
        let root = document.getElementById("root");
        this.render(root);
    }

    render(root) {
        let nav;
        let container = new Container();
        let ptr = this;
        let sidebar = document.querySelector(".sidebar");
        if (sidebar != null) {
            document.body.removeChild(sidebar);
        }
        if(this.state == 1) {
            
            function goToDashboard() {
                let username = document.getElementById("Username");
                let password = document.getElementById("Password");
                
                if(ptr.repo == username.value && ptr.pass == password.value) {
                    ptr.logedin = true;
                    ptr.state = 2;
                    ptr.rerender();
                }
                else {
                    alert("Pogresni username ili lozinka.");
                }
            }
            function goToMakeAccount() {
                ptr.state = 3;
                ptr.rerender();
            }
            let firstButton = new Button("_LOGIN",goToDashboard,"white","rgb(0,101,145)");
            let secondButton = new Button("_MAKE_ACCOUTN",goToMakeAccount,"white","gray");
            nav = new Nav([firstButton,secondButton]);
            container.element = new LogInForm(this);
        }
        else if(this.state == 2) {
            function goToLogin() {
                ptr.state = 1;
                ptr.rerender();
            }
            function goToNewGame() {
                ptr.state = 4;
                ptr.rerender();
            }
            function goToLoad() {
                ptr.state = 6;
                ptr.rerender();
            }
            let startGame = new Button("_START",goToNewGame,"white","rgb(0,101,145)");
            let loadGame = new Button("_LOAD",goToLoad,"white","gray");
            let logoutBtn = new Button("_LOGOUT",goToLogin,"white","red");
            nav = new Nav([startGame,loadGame,logoutBtn]);
            container.element = new Dashboard(this);
        }
        else if(this.state == 3) {
            nav = new Nav([]);
            container.element = new makeAccountForm(this);
        }
        else if (this.state == 4) {
            function goToDashboard() {
                ptr.state = 2;
                ptr.rerender();
            }
            let abortBtn = new Button("_ABORT",goToDashboard,"white","red");
            nav = new Nav([abortBtn]);
            container.element = new GameSettings(this);
        }
        else if(this.state == 5) {
            function goToDashboard() {
                ptr.state = 2;
                ptr.rerender();
            }
            let saveBtn = new Button("_SAVE",saveGame,"white","rgb(0,101,145)");
            let quitBtn = new Button("_QUIT",goToDashboard,"white","red");
            nav = new Nav([saveBtn,quitBtn]);
            container.element = new GameView(this,this.load ? this.gameBoard : null);
            if(!this.load) {
                this.moves = 0;
            }
            this.load = false;
            function saveGame() {
                let gv = container.element;
                let name = prompt("Unesite ime igre");
                
            
                
                let board = "";
                for(let i = 0; i < 8 ; i ++) {
                    for(let j = 0 ; j < 8 ; j++) {
                        board+= gv.Game.currentBoard.boardMatrix[i][j]
                    }
                }
                
                fetch(`https://localhost:5001/Game/AddGame/${ptr.gameState}/${ptr.gameDifficulty}/${board}/${ptr.User.id}/${name}/${ptr.moves}`,
                {method: "POST"}).
                then(rsp=>console.log(rsp.status));
            }
        }
        else {
            function goToDashboard() {
                ptr.state = 2;
                ptr.rerender();
            }
            let abortBtn = new Button("_ABORT", goToDashboard, "white","red");
            nav = new Nav([abortBtn]);
            container.element = new LoadGameForm(this);
        }
        let footer = new Footer();
        
        
        
        nav.render(root);

        container.render(root);

        footer.render(root);
    }

    rerender() {
        let root = document.getElementById("root");
        let nav = document.querySelector("nav");
        root.removeChild(nav);
        let container = document.getElementById("container");
        root.removeChild(container);
        let footer = document.querySelector("footer");
        root.removeChild(footer);
        this.render(root);
    }
    



}




let app = new App();
app.start();

