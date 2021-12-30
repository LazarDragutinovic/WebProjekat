



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
    render() {
        this.area.appendChild(this.element.render());
        return this.area;
    }
}