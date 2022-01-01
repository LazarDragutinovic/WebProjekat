


export default class Button {

    constructor(text,callback,color,background) {
        this.text = text;
        this.color = color;
        this.background = background;
        this.callback = callback;
    }

    render() {
        let button = document.createElement("button");

        button.innerHTML = this.text;
        button.style.color = this.color;
        button.style.backgroundColor = this.background;
        button.className = "skbutton";
        button.onclick = this.callback;


        return button;
    }
}