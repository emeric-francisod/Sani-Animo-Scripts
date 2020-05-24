function hamburgerMenuAction(action) {
    hamburgerElt.focus();
    if (action === "hide" || action === "toggle" && document.body.classList.contains("opened")) {
        document.body.classList.remove("opened");
        document.body.classList.add("closed");
        giveTabNavigation(bodyTabOrderElts);
        removeTabNavigation(sidebarTabOrderElts);
    } else if (action === "show" || action === "toggle" && !document.body.classList.contains("opened")) {
        document.body.classList.add("opened");
        document.body.classList.remove("closed");
        removeTabNavigation(bodyTabOrderElts);
        giveTabNavigation(sidebarTabOrderElts);
    }
}

let hamburgerElt = document.getElementById("hamburger-button");
let sidebarElt = document.getElementById("sidebar");
let blurElt = document.getElementById("blur");
let contentElt = document.getElementById("content");

let bodyTabOrderElts = getTabElements(contentElt);
let sidebarTabOrderElts = getTabElements(sidebarElt);

removeTabNavigation(sidebarTabOrderElts);

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
