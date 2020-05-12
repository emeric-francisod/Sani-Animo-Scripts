function toggleMenu (plusLinkElt, action = "hey!") {
    if (plusLinkElt.classList.contains("opened") && action !== "open" || action === "close") {
        console.log("Menu closing");
        plusLinkElt.classList.remove("opened");
    } else if (!plusLinkElt.classList.contains("opened") || action === "open"){
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
        console.log("Link click")
        e.preventDefault();
        toggleMenu(e.currentTarget);
    });

    /*moreElts[i].querySelector("a:first-child").addEventListener("focus", function(e) {
        e.preventDefault();
        toggleMenu(e.currentTarget.parentNode, "open");
    }); */
}

window.addEventListener("click", function(e) {
    console.log("Window click");
    let openedMenuElts = document.querySelectorAll(".more.opened ul.submenu");
    for (let i = 0 ; i < openedMenuElts.length ; i++) {
        e.preventDefault();
        // e.stopPropagation();
        let plusMenuElt = openedMenuElts[i].parentNode;
        if ((e.pageY < openedMenuElts[i].offsetTop
            ||e.pageY > openedMenuElts[i].offsetTop + openedMenuElts[i].offsetHeight
            ||e.pageX < openedMenuElts[i].offsetLeft
            ||e.pageX > openedMenuElts[i].offsetLeft + openedMenuElts[i].offsetWidth)
            && (e.pageY < plusMenuElt.offsetTop
            ||e.pageY > plusMenuElt.offsetTop + plusMenuElt.offsetHeight
            ||e.pageX < plusMenuElt.offsetLeft
            ||e.pageX > plusMenuElt.offsetLeft + plusMenuElt.offsetWidth)) {
                toggleMenu(openedMenuElts[i].parentNode, "window click");
            }
    }
}, true);

window.addEventListener("scroll", windowEventMenuCallback);

window.addEventListener("keyup", function (e) {
    if (e.key == "Escape") {
        windowEventMenuCallback(e);
    }
});
