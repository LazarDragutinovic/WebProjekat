


export default class Dashboard {

    render() {
        let dashboard = document.createElement("div");
        dashboard.className = "dashboard";


        let playerInfo = document.createElement("div");
        playerInfo.className = "playerInfo";
        dashboard.appendChild(playerInfo);
        let bestGames = document.createElement("div");
        bestGames.className = "bestGames";
        dashboard.appendChild(bestGames);

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
        userName.innerHTML = "Lazar Dragutinivic";
        userName.className = "userName";
        header.appendChild(userName);

        let entries = ["Win Rate", "Total Games", "Wins", "Loses","Average Time Per Game","Average Moves", "Average Figures Taken", "Average Figures Lost"];
        let data = [ 0,0,0,0,0,0,0,0];
        let dataField = document.createElement("div");
        dataField.className = "dataField";
        playerInfo.appendChild(dataField);
        entries.forEach((entry,indx)=>{
            let oneData = document.createElement("p");
            oneData.className = "oneData";
            oneData.innerHTML = `${entry}: ${data[indx]}`;
            dataField.appendChild(oneData);
        });
        let bestGamesData = ["Ultra 12:6 5min","gogo 13:6 5min", "dda 10:3 8min"];
        let bestGamesTitle = document.createElement("h1");
        bestGamesTitle.innerHTML = "Best Games Played";
        bestGamesTitle.className = "bestGamesTitle";
        bestGames.appendChild(bestGamesTitle);
        bestGamesData.forEach((data)=>{
            let p = document.createElement("p");
            p.innerHTML = data;
            p.className = "bestGameData";
            bestGames.appendChild(p);
        });

        return dashboard;


    }
}