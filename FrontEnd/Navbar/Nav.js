


export default class Nav {

    constructor(dugmici) {
        this.dugmici = dugmici;
    }

    render(root) {
        let nav = document.createElement('nav');
        
        //ovde dorada u zavisnosti od toga u kom stanju se nalazi
        let okvir = document.createElement("div");
        okvir.className = "okvir";
        let okvirZaLogo = document.createElement("div");
        okvir.appendChild(okvirZaLogo);
        okvirZaLogo.className = "okvirZaLogo";
        let logo = document.createElement("p");
        logo.innerHTML = "The Chessminator C-800";
        logo.className = "logo";
        let sublogotext = document.createElement("p");
        sublogotext.innerHTML = "the web edition";
        sublogotext.className = "subLogoText";
        okvirZaLogo.appendChild(logo);
        okvirZaLogo.appendChild(sublogotext);
        nav.appendChild(okvir);

        let okvirZaKontrole = document.createElement("div");
        this.dugmici.forEach(dugme => {
           dugme.render(okvirZaKontrole); 
        });

        okvir.appendChild(okvirZaKontrole);
        
        okvirZaKontrole.className = "okvirZaKontrole";


        root.appendChild(nav);
    }
}
