import User from "../User.js";


export default class LogInForm {

    constructor(parrent) {
        this.parrent = parrent;
    }

    render() {
        let form = document.createElement("form");
        let title = document.createElement("h1");
        form.className = "loginForm";
        title.innerHTML = "Log In";
        title.className = "title";
        form.appendChild(title);
        let InputArea = document.createElement("div");
        InputArea.className = "inputarea"
        form.appendChild(InputArea);


        let polja = document.createElement("div");
        polja.className = "polja";
        let inputs = document.createElement("div");
        inputs.className = "inputs";

        form.id = "loginform";
        let poljaImena = ["Username", "Password"];
        let types = ["text","password"];
        poljaImena.forEach((polje, index)=>{
            let label = document.createElement("p");
            label.innerHTML = polje;
            label.className = "polje";
            polja.appendChild(label);
            let inp = document.createElement("input");
            inp.type = types[index];
            inp.name = polje;
            inp.id = polje;
            inp.className = "inp"
            inputs.appendChild(inp);
        })
        InputArea.appendChild(polja);
        InputArea.appendChild(inputs);

        let buttonArea = document.createElement("div");
        buttonArea.className = "buttonArea";
        
        let loginButton = document.createElement("button");
        let ptr = this.parrent;
        loginButton.onclick = (e)=> {
            e.preventDefault();
            let username = document.getElementById("Username");
            let password = document.getElementById("Password");
            
            if(username.value.length == 0) {
             
                alert("Unesite korisnicko ime.")
                return;
            }
            if(password.value.length == 0) {
                alert("Unesite lozinku.")
                return;
            }
            fetch("https://localhost:5001/User/Login/" + username.value + "/" + password.value)
            .then(resp => {
                if(resp.ok) {
                    resp.json().then(user => {
                        ptr.User = new User(user.id, user.username, user.password);
                        console.log(user);
                        ptr.state = 2;
                        ptr.rerender();
                    })
                }
                else {
                 resp.json().then(message=>alert(message.message));   
                }
            })
            // if(ptr.repo == username.value && ptr.pass == password.value) {
            //     ptr.state = 2;
                
            //     ptr.rerender();
            // }
            // else {
            //     alert("Pogresni username ili lozinka.");
            // }
        }
        loginButton.textContent = "_LOGIN";
        loginButton.className = "loginButton";

        buttonArea.appendChild(loginButton);
        form.appendChild(buttonArea);

        let makeAccountArea = document.createElement("p");
        makeAccountArea.className = "makeAccountArea";
        makeAccountArea.innerHTML = "You don't have account.Make one now!!!<br><span>Click here!!!</span>";
        
        makeAccountArea.onclick = function() {
            document.getElementById("loginform").classList.remove("loginFormTransition");
            setTimeout(() => {
                ptr.state = 3;
                ptr.rerender();
            }, 1000);
            
        }
        form.appendChild(makeAccountArea);       
        setTimeout(() =>{
            form.classList.add("loginFormTransition")
        },250);       
        return form;
    }
}