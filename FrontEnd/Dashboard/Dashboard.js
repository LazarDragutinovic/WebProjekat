import Achivment from "../Achivment.js";



export default class Dashboard {

    constructor(parrent) {
        this.parrent = parrent;
    }
    render() {
        
        let dashboard = document.createElement("div");
        dashboard.className = "dashboard";
        

        let playerInfo = document.createElement("div");
        playerInfo.className = "playerInfo";
        dashboard.appendChild(playerInfo);
        let bestGames = document.createElement("div");
        let okvirBGAC = document.createElement("div");
        let achivments = document.createElement("table");
        achivments.className = "achivments";
        bestGames.className = "bestGames";
        okvirBGAC.appendChild(bestGames);
        okvirBGAC.className = 'okvirBGAC';
        okvirBGAC.appendChild(achivments);
        dashboard.appendChild(okvirBGAC);
        
        let header = document.createElement("div");
        header.className = "header";
        let avatarArea = document.createElement("div");
        avatarArea.className = "avatarArea";
        header.appendChild(avatarArea);

        playerInfo.appendChild(header);
        let avatar = document.createElement("div");
        avatar.className = "avatar";
        avatarArea.appendChild(avatar);
        let userName = document.createElement("p");
        userName.innerHTML = this.parrent.User.username;
        userName.className = "userName";
        header.appendChild(userName);

        let entries = ["Win Rate", "Total Games", "Wins", "Loses","Average Moves", "Average Figures Taken", "Average Figures Lost"];
        let data = [ 0,0,0,0,0,0,0,0];
        let dataField = document.createElement("div");
        dataField.className = "dataField";
        playerInfo.appendChild(dataField);
        entries.forEach((entry,indx)=>{
            let oneData = document.createElement("p");
            oneData.className = "oneData";
            oneData.innerHTML = `${entry}:`;
            oneData.id = entry;
            dataField.appendChild(oneData);
        });
        let bestGamesData = ["Ultra 12:6 5min","gogo 13:6 5min", "dda 10:3 8min"];
        let bestGamesTitle = document.createElement("h1");
        bestGamesTitle.innerHTML = "Best Games Played";
        bestGamesTitle.className = "bestGamesTitle";
        bestGames.appendChild(bestGamesTitle);
        fetch(`https://localhost:5001/Game/GetBestGames/${this.parrent.User.id}`)
        .then(resp=>{
            if (resp.ok) {
                resp.json().then(bestGamesData => {
                    let limit;
                    if(bestGamesData.length > 3) limit = 3;
                    else limit = bestGamesData.length; 
                    console.log(bestGamesData);
                    for(let i = 0 ; i < limit; i++) {
                        let p = document.createElement("p");
                        p.innerHTML = "Name: " + bestGamesData[i].name + "/Number of moves: " + bestGamesData[i].moves;
                        p.className = "bestGameData";
                        bestGames.appendChild(p);
                    }
                })
            }
        })
        
        fetch(`https://localhost:5001/Game/GetStats/${this.parrent.User.id}`)
        .then(resp => resp.json())
        .then(data=>{
            console.log(data);
            document.getElementById("Win Rate").innerHTML += data.winrate.toFixed() + "%";
            document.getElementById("Total Games").innerHTML += data.totalGamse;
            document.getElementById("Wins").innerHTML += data.wins;
            document.getElementById("Loses").innerHTML += data.loses;
            document.getElementById("Average Moves").innerHTML += data.averageMoves;
            document.getElementById("Average Figures Taken").innerHTML += data.averageFiguresTaken;
            document.getElementById("Average Figures Lost").innerHTML += data.averageFiguresLost;
        });

        fetch(`https://localhost:5001/Achivments/GetAchivments/${this.parrent.User.id}`)
        .then(resp=>{
            if(resp.ok) {
                resp.json().then(data=>{
                    data.forEach(achv=> {
                        let achivment = new Achivment(achv.id, achv.name, achv.tier,achv.compleated);
                        achivment.render(achivments);
                    })
                })
            }
            else{
                resp.json().then(msg=>alert(msg.message));
            }
        })
        return dashboard;


    }
}