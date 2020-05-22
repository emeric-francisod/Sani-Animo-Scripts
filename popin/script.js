function openPopin( popinElt ) {
    popinElt.classList.add( "opened" );
    document.body.classList.add( "popin-opened" );

    removeTabulation(tabableElements);
}



function closePopin() {
    let openedPopinElt = document.querySelector(".popin.opened");
    if (openedPopinElt !== null) {
        openedPopinElt.classList.remove("opened");
        document.body.classList.remove("popin-opened");
    }

    giveTabulation(tabableElements);
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

    let tabElts = parentElt.querySelectorAll(query);
    for (let i = 0 ; i < tabElts.length ; i++) {
        let elementTabIndex = tabElts[i].getAttribute("tabindex");
        if (elementTabIndex !== "-1") {
            tabableElements.push([tabElts[i], elementTabIndex]);
        }
    }
}



function removeTabulation(tabableElements) {
    for (let i = 0 ; i < tabableElements.length ; i++) {
        tabableElements[i][0].setAttribute("tabindex", "-1");
    }
}



function giveTabulation(tabableElements) {
    for (let i = 0 ; i < tabableElements.length ; i++) {
        if (tabableElements[i][1] === null) {
            tabableElements[i][0].removeAttribute("tabindex");
        } else {
            tabableElements[i][0].setAttribute("tabindex", tabableElements[i][1]);
        }
    }
}



const FOCUS_ELT = ["a", "area", "audio", "button", "embed", "form", "iframe", "img", "input", "keygen", "label", "object", "select", "svg", "textarea", "video"];
const FOCUS_ATTR = ["contenteditable", "focusable", "tabindex"];

let popinOpenersElts = document.getElementsByClassName("popin-opener");
let popinCloseButtonElts = document.getElementsByClassName("popin-close");
let blurElt = document.getElementById("blur");
let contentElt = document.getElementById("content");

let tabableElements = [];

getTabElements(contentElt);

for (let i = 0 ; i < popinOpenersElts.length ; i++) {
    popinOpenersElts[i].addEventListener("click", function(e) {
        let popinElt = document.getElementById(e.currentTarget.dataset.popinTarget);
        openPopin(popinElt);
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
