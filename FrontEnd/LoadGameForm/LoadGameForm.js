

export default class LoadGameForm {

    constructor(parrent) {
        this.parrent = parrent;
    }

    render() {
        let form = document.createElement("form");
        form.className = "LoadGameForm";
        
        let ptr = this.parrent;

        let table = document.createElement("table");
        let thead = document.createElement("tr");
        table.appendChild(thead);
        let headings = ["broj","ime", "aktiviraj"];
        let th;
        headings.forEach(heading=>{
            th = document.createElement("th");
            th.textContent = heading;
            thead.appendChild(th);
        });
        
        fetch(`https://localhost:5001/Game/GetGames/${this.parrent.User.id}`)
        .then(resp=> {
            if(resp.ok) {
                resp.json().then(data => {
                    let tr;
                    let i = 1;
                    data.forEach(game =>{
                        tr = document.createElement("tr");
                        let number = document.createElement("td");
                        number.textContent = i;
                        i++;
                        let name = document.createElement("td");
                        name.textContent = game.name;
                        //let date = document.createElement("td");
                        //date.textContent = game.date
                        let buttonArea = document.createElement("td");
                        let button = document.createElement("button");
                        buttonArea.appendChild(button);
                        button.textContent = "LOAD"
                        button.onclick = (e)=>{
                                e.preventDefault();
                               ptr.load = true;
                               ptr.state = 5;
                               ptr.gameDifficulty = game.difficulty;
                               ptr.gameBoard = game.board;
                               ptr.moves = game.moves;
                               ptr.rerender();                        
                        }
                        tr.appendChild(number);
                        tr.appendChild(name);
                        tr.appendChild(buttonArea);
                        table.appendChild(tr);
                    });
                });
            }
            else {
                console.log("Doslo je do greske.");
            }
        })
        form.appendChild(table);
        return form;
    }
}