



export default class Container {
    constructor() {
        this.element = null;
        this.area = document.createElement("div");
        this.area.id = "container"
    }

    switchElement(newElement) {
        this.area.removeChild(this.element);
        this.element = newElement;
    }
    render(root) {
        this.area.appendChild(this.element.render());
        root.appendChild(this.area);
    }
}