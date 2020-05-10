function toggleMenu (plusLinkElt) {
    if (plusLinkElt.classList.contains("opened")) {
        console.log("Menu closing");
        plusLinkElt.classList.remove("opened");
    } else {
        console.log("Menu opening");
        plusLinkElt.classList.add("opened");
        // plusLinkElt.querySelector(".submenu li:first-child a").focus();

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
    moreElts[i].addEventListener("click", function(e) {
        e.preventDefault();
        toggleMenu(e.currentTarget);
    });

    /* moreElts[i].querySelector("a:first-child").addEventListener("focus", function(e) {
        e.preventDefault();
        console.log("focus lien ");
        toggleMenu(e.currentTarget.parentNode);
    }, true); */
}

window.addEventListener("click", function(e) {
    let openedMenuElts = document.querySelectorAll(".more.opened ul.submenu");
    for (let i = 0 ; i < openedMenuElts.length ; i++) {
        e.preventDefault();
        e.stopPropagation();
        if (e.pageY < openedMenuElts[i].offsetTop
            ||e.pageY > openedMenuElts[i].offsetTop + openedMenuElts[i].offsetheight
            || e.pageX < openedMenuElts[i].offsetLeft
            ||e.pageX > openedMenuElts[i].offsetLeft + openedMenuElts[i].offsetWidth) {
                toggleMenu(openedMenuElts[i].parentNode);
            }
    }
}, true);

window.addEventListener("scroll", windowEventMenuCallback);

window.addEventListener("keyup", function (e) {
    if (e.key == "Escape") {
        windowEventMenuCallback(e);
    }
});
