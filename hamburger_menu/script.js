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


//Création des constantes contenant tous les types d'éléments et attributs pouvant recevoir le focus
const FOCUS_ELTS = ["a", "area", "audio", "button", "embed", "form", "iframe", "img", "input", "keygen", "label", "object", "select", "svg", "textarea", "video"];
const FOCUS_ATTRS = ["contenteditable", "focusable", "tabindex"];


//Récupération des éléments avec lesquels interagir
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


//Ajout des manager d'éléments
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
