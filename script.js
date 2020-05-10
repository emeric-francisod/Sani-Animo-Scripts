function toggleMenu (plusLinkElt) {
    if (plusLinkElt.classList.contains("opened")) {
        plusLinkElt.classList.remove("opened");
        console.log(plusLinkElt);
        plusLinkElt.querySelector("a:first-child").focus();
    } else {
        plusLinkElt.classList.add("opened");
        plusLinkElt.querySelector(".submenu li:first-child a").focus();

    }

}

let moreElts = document.getElementsByClassName("more");

for (let i = 0 ; i < moreElts.length ; i++) {
    moreElts[i].addEventListener("click", function(e) {
        e.preventDefault();
        toggleMenu(e.currentTarget);
    });
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

window.addEventListener("scroll", function(e) {
    let openedMenuElts = document.querySelectorAll(".more.opened ul.submenu");
    for (let i = 0 ; i < openedMenuElts.length ; i++) {
        e.stopPropagation();
        toggleMenu(openedMenuElts[i].parentNode);
    }
});
