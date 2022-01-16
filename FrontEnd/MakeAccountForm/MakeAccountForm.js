



export default class makeAccountForm {

    constructor(parrent) {
        this.parrent = parrent;
    }
    render() {
        let form = document.createElement("form");
        form.className = "makeAccountForm";

        let title = document.createElement("h1");
        title.className = "title";
        title.innerHTML = "Enter Your Data";
        form.appendChild(title);

        let inputArea = document.createElement("div");
        inputArea.className = "inputArea";
        form.appendChild(inputArea)


        let poljaDiv = document.createElement("div");
        poljaDiv.className = "poljaDiv";
        let inputs = document.createElement("div");
        inputs.className = "inputs";

        let polja = ["Username","Password", "Confirm-Password"];
        let types = ["text","password", "password"];

        polja.forEach((ime,indx)=>{
            let polje = document.createElement("p");
            polje.innerHTML = ime;
            polje.className ="polje";
            poljaDiv.appendChild(polje);
            let inp = document.createElement("input");
            inp.type = types[indx];
            inp.id = ime;
            inp.className = "inp";
            inputs.appendChild(inp);
        })
        


        inputArea.appendChild(poljaDiv);
        inputArea.appendChild(inputs);

        let QArea = document.createElement("div");
        QArea.className = "QArea";
        let questionTitle = document.createElement("h2");
        questionTitle.innerHTML = "Enter question for retriving password.";
        questionTitle.className = "qtitle";
        QArea.appendChild(questionTitle);

        let textArea = document.createElement("textarea");
        textArea.id = "PQuestion";
        textArea.rows = 4;
        textArea.cols = 26;
        
        textArea.name = "passwordQuestion";
        QArea.appendChild(textArea);       

        form.appendChild(QArea);
        let formControls = document.createElement("div");
        formControls.className = "formControls";

        let buttonFinish = document.createElement("button");
        let buttonCancel = document.createElement("button");
        buttonFinish.className = "Finish";
        buttonFinish.textContent = "_FINISH";
        buttonCancel.textContent = "_CANCEL";
        let ptr = this.parrent;
        buttonFinish.onclick = (e)=> {
            e.preventDefault();
            let usernameEl = document.getElementById("Username");
            let passwordEl = document.getElementById("Password");
            let confirmPasswordEl = document.getElementById("Confirm-Password");
            let passwordTextEl = document.getElementById("PQuestion");
            if(usernameEl.value.length < 10) {
                alert("Unesite korisnicko ime koje je bar 10 karaktera.")
                return;
            }
            if(passwordEl.value.length < 10) {
                alert("Unesite lozinku koja je barem 10 karaktera");
                return;
            }
            if(passwordEl.value != confirmPasswordEl.value) {
                alert("Lozinke vam se ne poklapaju.");
                return;
            }
            fetch("https://localhost:5001/User/AddUser", {method: "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    username: usernameEl.value,
                    password: passwordEl.value,
                    passwordText: passwordTextEl.value
                })
            }).then(resp => {
                        if(resp.ok) {
                            resp.json().then(user=> {
                                ptr.User = user;
                                ptr.state = 2;
                                ptr.rerender();
                            }
                            );
                        }
                        else {
                            resp.json().then(msg =>{
                                alert(msg.message);
                            })
                        }
                    })
            .catch(error=>console.log(error))
            
        }
        buttonCancel.onclick = (e)=>{
            e.preventDefault();
            ptr.state = 1;
            ptr.rerender();
        }
        buttonCancel.className = "Cancel";
        formControls.appendChild(buttonFinish);
        formControls.appendChild(buttonCancel);

        form.appendChild(formControls);
        setTimeout(()=> {
            form.classList.add("makeAccountFormTransition");
        }, 250);
        return form;
    }
}