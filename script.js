const FOCUS_ELTS = ["a", "area", "audio", "button", "embed", "form", "iframe", "img", "input", "keygen", "label", "object", "select", "svg", "textarea", "video"];
const FOCUS_ATTRS = ["contenteditable", "focusable", "tabindex"];





function toggleMenu (plusLinkElt, action = "hey!") {
    if (plusLinkElt.classList.contains("opened") && action !== "open" || action === "close") {
        console.log("Menu closing");
        plusLinkElt.classList.remove("opened");
    } else if (!plusLinkElt.classList.contains("opened") || action === "open"){
        console.log("Menu opening");
        plusLinkElt.classList.add("opened");
    }

}




function windowEventMenuCallback (e) {
    let openedMenuElts = document.querySelectorAll(".more.opened ul.submenu");
    for (let i = 0 ; i < openedMenuElts.length ; i++) {
        e.stopPropagation();
        toggleMenu(openedMenuElts[i].parentNode);
    }
}



function tabulationAction(action, targetArray) {
    if (action === "give") {
        for (let i = 0 ; i < targetArray.length ; i++) {
            if (targetArray[i][1] === null) {
                targetArray[i][0].removeAttribute("tabindex");
            } else {
                targetArray[i][0].setAttribute("tabindex", targetArray[i][1]);
            }
        }
    } else if (action === "remove") {
        for (let i = 0 ; i < targetArray.length ; i++) {
            targetArray[i][0].setAttribute("tabindex", "-1");
        }
    }
}



function hamburgerMenuAction(action) {
    hamburgerElt.focus();
    if (action === "hide" || action === "toggle" && document.body.classList.contains("opened")) {
        document.body.classList.remove("opened");
        tabulationAction("give", bodyTabOrderElts);
        tabulationAction("remove", sidebarTabOrderElts);
    } else if (action === "show" || action === "toggle" && !document.body.classList.contains("opened")) {
        document.body.classList.add("opened");
        tabulationAction("remove", bodyTabOrderElts);
        tabulationAction("give", sidebarTabOrderElts);
    }
}




let moreElts = document.getElementsByClassName("more");

let hamburgerElt = document.getElementById("hamburger-button");
let sidebarElt = document.getElementById("sidebar");
let blurElt = document.getElementById("blur");

//Création de la requête pour obtenir tpus les éléments focusables
let sidebarFocusableEltsQuerry = "";
let bodyFocusableEltsQuerry = "";
for (let i = 0 ; i < FOCUS_ELTS.length ; i++) {
    bodyFocusableEltsQuerry += "#content " + FOCUS_ELTS[i] + ", ";
    sidebarFocusableEltsQuerry += "#sidebar " + FOCUS_ELTS[i] + ", ";
}
for (let i = 0 ; i < FOCUS_ATTRS.length ; i++) {
    bodyFocusableEltsQuerry += "#content [" + FOCUS_ATTRS[i] + "]";
    sidebarFocusableEltsQuerry += "#sidebar [" + FOCUS_ATTRS[i] + "]";
    if (i < FOCUS_ATTRS.length - 1) {
        bodyFocusableEltsQuerry += ", ";
        sidebarFocusableEltsQuerry += ", ";
    }
}

//Récupération des éléments pouvant être tabulés dans la sidebar
let sidebarFocusableElts = document.querySelectorAll(sidebarFocusableEltsQuerry);
let sidebarTabOrderElts = [];
for (let i = 0 ; i < sidebarFocusableElts.length ; i++) {
    if (sidebarFocusableElts[i].getAttribute("tabindex") !== "-1") {
        sidebarTabOrderElts.push([sidebarFocusableElts[i], sidebarFocusableElts[i].getAttribute("tabindex")]);
    }
}

console.log(sidebarFocusableEltsQuerry);
console.log(sidebarFocusableElts);
console.log(sidebarTabOrderElts);

//Récupération des éléments pouvant être tabulés dans le corps
let bodyFocusableElts = document.querySelectorAll(bodyFocusableEltsQuerry);
let bodyTabOrderElts = [];
for (let i = 0 ; i < bodyFocusableElts.length ; i++) {
    if (bodyFocusableElts[i].getAttribute("tabindex") !== "-1") {
        bodyTabOrderElts.push([bodyFocusableElts[i], bodyFocusableElts[i].getAttribute("tabindex")]);
    }
}

console.log(bodyTabOrderElts);


tabulationAction("remove", sidebarTabOrderElts);



for (let i = 0 ; i < moreElts.length ; i++) {
    moreElts[i].querySelector("a:first-child").addEventListener("click", function(e) {
        console.log("Link click")
        e.preventDefault();
        toggleMenu(e.currentTarget.parentNode);
    });

    moreElts[i].addEventListener("focusout", function(e) {
        console.log("Focus out");
        toggleMenu(e.currentTarget, "close");
    });
}

window.addEventListener("scroll", windowEventMenuCallback);

window.addEventListener("keyup", function (e) {
    if (e.key == "Escape") {
        windowEventMenuCallback(e);
    }
});


hamburgerElt.addEventListener("click", function(e){
    hamburgerMenuAction("toggle");
});

blurElt.addEventListener("click", function(e) {
    hamburgerMenuAction("hide");
});

window.addEventListener("keyup", function(e) {
    if (e.key == "Escape" && this.document.body.classList.contains("opened")) {
        hamburgerMenuAction("hide")
    }
});

window.addEventListener("resize", function(e) {
    hamburgerMenuAction("hide");
});
