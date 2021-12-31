


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


        return dashboard;


    }
}