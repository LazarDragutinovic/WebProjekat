



export default class Achivment {

    constructor(id, name ,tier, compleated) {
        this.id = id;
        this.name = name;
        this.tier = tier;
        this.compleated = compleated;
        
    }

    render(host) {
        let div= document.createElement("tr");
        div.className = "achivmentBody";
        let name = document.createElement("td");
        name.innerHTML = this.name;
        name.className = "achivmentText";
        let tier = document.createElement("td");
        tier.innerHTML = this.tier;
        tier.className = "rest";
        let compleated = document.createElement("td");
        compleated.className = "rest";
        compleated.innerHTML = this.compleated + "%";
        let resetBtn = document.createElement("button");
        resetBtn.innerHTML = "reset";
        let btnSpace = document.createElement("td");
        btnSpace.className = 'rest';
        btnSpace.appendChild(resetBtn);
        let ptr = this;
        resetBtn.onclick = (e)=> {
            e.preventDefault();
            fetch(`https://localhost:5001/Achivments/UpdateAchivment/${ptr.id}/0`,{
                method: "PUT"
            }).then(resp=> {
                if(resp.ok) {
                    ptr.compleated = 0;
                    compleated.innerHTML = "0%";
                }
                else {
                    resp.json().then(msg=> alert(msg.message));
                }
            })
        }
        div.appendChild(name);
        div.appendChild(tier);
        div.appendChild(compleated);
        div.appendChild(btnSpace);
        host.appendChild(div);
    }
}