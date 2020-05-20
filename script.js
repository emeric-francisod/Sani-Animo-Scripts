let popinOpenersElts = document.getElementsByClassName("popin-opener");

for (let i = 0 ; i < popinOpenersElts.length ; i++) {
    popinOpenersElts[i].addEventListener("click", function(e) {
        let popinElt = document.getElementById(e.currentTarget.dataset.popinTarget);
        popinElt.classList.add("opened");
        document.body.classList.add("popin-opened");
    });
}
