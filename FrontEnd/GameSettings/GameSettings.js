

export default class GameSettings {


    constructor(parrent) {
        this.parrent = parrent;
    }
    render() {
        let form = document.createElement("form");
        form.className ="settingsForm";
        let formTitle = document.createElement("h1");
        formTitle.className ="settingsTitle";
        formTitle.innerHTML = "Game Settings";
        form.appendChild(formTitle);

        let options = document.createElement("div");
        options.className = "options";
        form.appendChild(options);
        let settings = [
            "Don't hurt me",
            "Normal experience",
            "Bring it on",
            "Please have mercy"
        ];

        let radioArea = document.createElement("div");
        radioArea.className = "radioArea";
        let optionText = document.createElement("div");
        optionText.className = "optionText"; 
        settings.forEach(setting => {
            let select = document.createElement("input");
            select.type ="radio";
            select.name = "setting";
            select.value = setting;
            select.className = "sellectSetting";
            radioArea.appendChild(select);
            let option = document.createElement("p");
            option.className = "option";
            option.innerHTML = setting;
            optionText.appendChild(option);

        });
        options.appendChild(radioArea);
        options.appendChild(optionText);


        let settingsControl = document.createElement("div");
        settingsControl.className = "settingsControl";
        form.appendChild(settingsControl);

        let letsgo = document.createElement("button");
        letsgo.innerHTML = "_LET'S GO"
        let abort = document.createElement("button");
        abort.innerHTML = "_ABORT";
        abort.className = "abort";
        let ptr = this.parrent;
        letsgo.onclick = (e)=>{
            e.preventDefault();
            ptr.state = 5;
            ptr.rerender();
        }
        abort.onclick = (e)=>{
            e.preventDefault();
            ptr.state = 2;
            ptr.rerender();
        }
        settingsControl.appendChild(letsgo);
        settingsControl.appendChild(abort);


        return form; 
    }
}