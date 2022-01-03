

export default class LogInForm {

    constructor(parrent) {
        this.parrent = parrent;
    }

    render() {
        let form = document.createElement("form");
        let title = document.createElement("h1");
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
            ptr.state = 2;
            ptr.rerender();
        }
        loginButton.textContent = "_LOGIN";
        loginButton.className = "loginButton";

        buttonArea.appendChild(loginButton);
        form.appendChild(buttonArea);

        let makeAccountArea = document.createElement("p");
        makeAccountArea.className = "makeAccountArea";
        makeAccountArea.innerHTML = "You don't have account.Make one now!!!<br><span>Click here!!!</span>";
        form.appendChild(makeAccountArea);       
        
        return form;
    }
}