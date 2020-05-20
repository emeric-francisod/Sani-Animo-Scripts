let popinOpenersElts = document.getElementsByClassName("popin-opener");

for (let i = 0 ; i < popinOpenersElts.length ; i++) {
    popinOpenersElts[i].addEventListener("click", function(e) {
        console.log(e.currentTarget.dataset.popinTarget);
    });
}
