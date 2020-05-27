(function () {
    function hamburgerMenuToggle (buttonElt) {
        if (menuElt.classList.contains("close")) {
            hamburgerMenuClose();
        } else {
            hamburgerMenuOpen(buttonElt);
        }
    }

    function hamburgerMenuClose () {
        let openedMenuElt = document.querySelector(".hamburger-menu-wrapper.opened");
        let menuTriggerElt = document.querySelector(".hamburger-menu-button[data-hamburger-menu-target=\"" + openedMenuElt.id + "\"]");
        if (openedMenuElt !== null) {
            openedMenuElt.classList.add("closed");
            openedMenuElt.classList.remove("opened");
            menuTriggerElt.classList.add("hamburger");
            menuTriggerElt.classList.remove("close");
            document.body.classList.remove("menu-opened");
            giveTabulation(tabableElements);
        }
    }

    function hamburgerMenuOpen (buttonElt) {
        let menuElt = document.getElementById(buttonElt.dataset.hamburgerMenuTarget);
        hamburgerMenuClose();
        buttonElt.classList.add("close");
        buttonElt.classList.remove("hamburger");
        menuElt.classList.add("opened");
        menuElt.classList.remove("closed");
        document.body.classList.add("menu-opened");
        removeTabulation(tabableElements);
    }

    let hamburgerButtonElts = document.getElementsByClassName("hamburger-menu-button");
    let blurElt = document.getElementById("blur");
    let contentElt = document.getElementById("content");

    let tabableElements = getTabElements(contentElt);

    for (let i = 0 ; i < hamburgerButtonElts.length ; i++) {
        hamburgerButtonElts[i].addEventListener("click", function(e) {
            let menuElt = document.getElementById(e.currentTarget);
            hamburgerMenuToggle(menuElt);
        });
    }

    window.addEventListener("keyup", function(e) {
        if (e.key === "Escape") {
            hamburgerMenuClose();
        }
    });

    blurElt.addEventListener("click", function(e) {
        hamburgerMenuClose();
    })
})();


/*
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
 */
