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




let moreElts = document.getElementsByClassName("more");

let hamburgerElt = document.getElementById("hamburger-button");
let sidebarElt = document.getElementById("sidebar");
let blurElt = document.getElementById("blur");
let contentElt = document.getElementById("content");

let bodyTabOrderElts = getTabElements(contentElt);
let sidebarTabOrderElts = getTabElements(sidebarElt);

removeTabNavigation(sidebarTabOrderElts);


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
