let moreElts = document.getElementsByClassName("more");

for (let i = 0 ; i < moreElts.length ; i++) {
    moreElts[i].addEventListener("click", function(e) {
        console.log("clic sur le lien");
        e.preventDefault();
        e.currentTarget.classList.toggle("opened");
    });
}

window.addEventListener("click", function(e) {
    console.log("clic sur la fenêtre");
    let openedMenuElts = document.querySelectorAll(".more.opened ul.submenu");
    for (let i = 0 ; i < openedMenuElts.length ; i++) {
        e.stopPropagation();
        if (e.pageY < openedMenuElts[i].offsetTop
            ||e.pageY > openedMenuElts[i].offsetTop + openedMenuElts[i].offsetheight
            || e.pageX < openedMenuElts[i].offsetLeft
            ||e.pageX > openedMenuElts[i].offsetLeft + openedMenuElts[i].offsetWidth) {
                openedMenuElts[i].parentNode.classList.toggle("opened");
            }
    }
}, true);
