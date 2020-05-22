function closePopin() {
    let openedPopinElt = document.querySelector(".popin.opened");
    if (openedPopinElt !== null) {
        openedPopinElt.classList.remove("opened");
        document.body.classList.remove("popin-opened");
    }
}



function getTabElements(parentElt) {
    let query = "";

    for (let i = 0 ; i < FOCUS_ELT.length ; i++) {
        query += FOCUS_ELT[i] + ", ";
    }
    for (let i = 0 ; i < FOCUS_ATTR.length ; i++) {
        query += "[" + FOCUS_ATTR[i] + "]";
        if (i < FOCUS_ATTR.length - 1) {
            query += ", ";
        }
    }

    tabElts = parentElt.querySelectorAll(query);
    console.log(tabElts);
}



const FOCUS_ELT = ["a", "area", "audio", "button", "embed", "form", "iframe", "img", "input", "keygen", "label", "object", "select", "svg", "textarea", "video"];
const FOCUS_ATTR = ["contenteditable", "focusable", "tabindex"];

let popinOpenersElts = document.getElementsByClassName("popin-opener");
let popinCloseButtonElts = document.getElementsByClassName("popin-close");
let blurElt = document.getElementById("blur");
let contentElt = document.getElementById("content");

getTabElements(contentElt);

for (let i = 0 ; i < popinOpenersElts.length ; i++) {
    popinOpenersElts[i].addEventListener("click", function(e) {
        let popinElt = document.getElementById(e.currentTarget.dataset.popinTarget);
        popinElt.classList.add("opened");
        document.body.classList.add("popin-opened");
    });
}

for (let i = 0 ; i < popinCloseButtonElts.length ; i++) {
    popinCloseButtonElts[i].addEventListener("click", function(e) {
        closePopin();
    });
}

window.addEventListener("keyup", function(e) {
    if (e.key === "Escape" && document.body.classList.contains("popin-opened")) {
        closePopin();
    }
})

blurElt.addEventListener("click", function(e) {
    closePopin();
})
