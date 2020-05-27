(function () {
    function hamburgerMenuToggle () {
        if (hamburgerMenuElt.classList.contains("opened")) {
            hamburgerMenuClose();
        } else {
            hamburgerMenuOpen();
        }
    }

    function hamburgerMenuClose () {
        if (hamburgerMenuElt.classList.contains("opened")) {
            hamburgerMenuElt.classList.add("closed");
            hamburgerMenuElt.classList.remove("opened");
            hamburgerButtonElt.classList.add("hamburger");
            hamburgerButtonElt.classList.remove("close");
            document.body.classList.remove("menu-opened");
            giveTabulation(tabableElements);
        }
    }

    function hamburgerMenuOpen () {
        hamburgerMenuElt.classList.remove("closed");
        hamburgerMenuElt.classList.add("opened");
        hamburgerButtonElt.classList.remove("hamburger");
        hamburgerButtonElt.classList.add("close");
        document.body.classList.add("menu-opened");
        removeTabulation(tabableElements);
    }

    let hamburgerButtonElt = document.getElementById("hamburger-menu-button");
    let hamburgerMenuElt = document.getElementById("hamburger-menu-wrapper");
    let blurElt = document.getElementById("blur");
    let contentElt = document.getElementById("content");

    let tabableElements = getTabElements(contentElt);

    hamburgerButtonElt.addEventListener("click", function(e) {
        hamburgerMenuToggle();
    });

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
