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




let moreElts = document.getElementsByClassName("more");

for (let i = 0 ; i < moreElts.length ; i++) {
    /* moreElts[i].addEventListener("click", function(e) {
        console.log("Link click")
        e.preventDefault();
        toggleMenu(e.currentTarget);
    }); */

    /* moreElts[i].addEventListener("focusout", function(e) {
        console.log("Focus out");
        toggleMenu(e.currentTarget, "close");
    }); */

    moreElts[i].querySelector("a:first-child").addEventListener("focus", function(e) {
        console.log("Menu focus");
        e.preventDefault();
        toggleMenu(e.currentTarget.parentNode, "open");
    });

    moreElts[i].querySelector("a:first-child").addEventListener("blur", function(e) {
        console.log("Menu blur");
        e.preventDefault();
        toggleMenu(e.currentTarget.parentNode, "close");
    });
}

window.addEventListener("scroll", windowEventMenuCallback);

window.addEventListener("keyup", function (e) {
    if (e.key == "Escape") {
        windowEventMenuCallback(e);
    }
});
