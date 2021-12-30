

export default class Footer {



    render() {
        let footer = document.createElement("footer");

        let copyright = document.createElement("p");
        copyright.innerHTML = `©Chessminator ${(new Date()).getFullYear()}`;
        footer.appendChild(copyright);
        copyright.className = "copyright";

        return footer;
    }
}