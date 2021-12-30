import Nav from "./Navbar/Nav.js"
import Footer from "./Footer/Footer.js"
import Container from "./Container/Container.js"
import LogInForm from "./LogInForm/LogInForm.js"
import makeAccountForm from "./MakeAccountForm/MakeAccountForm.js";
let root = document.getElementById("root");

let nav = new Nav();
let footer = new Footer();
let container = new Container();
container.element = new makeAccountForm();
root.appendChild(nav.render());
root.appendChild(footer.render());
root.appendChild(container.render());