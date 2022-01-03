import Nav from "./Navbar/Nav.js"
import Footer from "./Footer/Footer.js"
import Container from "./Container/Container.js"
import LogInForm from "./LogInForm/LogInForm.js"
import makeAccountForm from "./MakeAccountForm/MakeAccountForm.js";
import Dashboard from "./Dashboard/Dashboard.js"
import GameSettings from "./GameSettings/GameSettings.js"
import GameView from "./chessBoard/GameView.js"
import Button from "./Button/Button.js"


class App {

    constructor() {
        this.state = 1;
    }

    start() {
        let root = document.getElementById("root");
        this.render(root);
    }

    render(root) {
        let nav;
        let container = new Container();
        let ptr = this;
        if(this.state == 1) {
            
            function goToDashboard() {
                ptr.state = 2;
                ptr.rerender();
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
            let startGame = new Button("_START",goToNewGame,"white","rgb(0,101,145)");
            let loadGame = new Button("_LOAD",null,"white","gray");
            let logoutBtn = new Button("_LOGOUT",goToLogin,"white","red");
            nav = new Nav([startGame,loadGame,logoutBtn]);
            container.element = new Dashboard();
        }
        else if(this.state == 3) {
            nav = new Nav([]);
            container.element = new makeAccountForm(this);
        }
        else if (this.state == 4) {
            let letsgoBtn = new Button("_LETSGO",null,"white","rgb(0,101,145)");
            let abortBtn = new Button("_ABORT",null,"white","red");
            nav = new Nav([letsgoBtn,abortBtn]);
            container.element = new GameSettings(this);
        }
        else if(this.state == 5) {
            nav = new Nav([]);
            container.element = new GameView();
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


let root = document.getElementById("root");

let app = new App();
app.start();

