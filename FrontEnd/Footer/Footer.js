

export default class Footer {



    render(root) {
        let footer = document.createElement("footer");

        let copyright = document.createElement("p");
        copyright.innerHTML = `©Chessminator ${(new Date()).getFullYear()}`;
        footer.appendChild(copyright);
        copyright.className = "copyright";

        root.appendChild(footer);
    }
}