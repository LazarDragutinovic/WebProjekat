



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
            ptr.state = 2;
            ptr.rerender();
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

        return form;
    }
}