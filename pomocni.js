class Demo {
    demoCSB() {
        for(let i = 0; i< 4; i++) {
            let dugme = document.createElement("div");
            dugme.innerHTML = i;
            dugme.onclick = () => {
                console.log(i);
            }
            document.body.appendChild(dugme);
        }
    }
}

let demo = new Demo();
demo.demoCSB();