function openPopin( popinElt ) {
    popinElt.classList.add( "opened" );
    document.body.classList.add( "popin-opened" );

    removeTabulation(tabableElements);
}

function closePopin() {
    let openedPopinElt = document.querySelector(".popin.opened");
    if (openedPopinElt !== null) {
        openedPopinElt.classList.remove("opened");
        document.body.classList.remove("popin-opened");
    }

    giveTabulation(tabableElements);
}

let popinOpenersElts = document.getElementsByClassName("popin-opener");
let popinCloseButtonElts = document.getElementsByClassName("popin-close");
let blurElt = document.getElementById("blur");
let contentElt = document.getElementById("content");

let tabableElements = getTabElements(contentElt);

for (let i = 0 ; i < popinOpenersElts.length ; i++) {
    popinOpenersElts[i].addEventListener("click", function(e) {
        let popinElt = document.getElementById(e.currentTarget.dataset.popinTarget);
        openPopin(popinElt);
    });
}

for (let i = 0 ; i < popinCloseButtonElts.length ; i++) {
    popinCloseButtonElts[i].addEventListener("click", function(e) {
        closePopin();
    });
}

window.addEventListener("keyup", function(e) {
    if (e.key === "Escape" && document.body.classList.contains("popin-opened")) {
        closePopin();
    }
})

blurElt.addEventListener("click", function(e) {
    closePopin();
})
