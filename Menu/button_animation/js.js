let executeScript = (function () {
    let hamburgerWrapperElts = document.getElementsByClassName("hamburger-wrapper");
    for (let i = 0 ; i < hamburgerWrapperElts.length ; i++) {
        hamburgerWrapperElts[i].addEventListener("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (!e.currentTarget.classList.contains("closed") && !e.currentTarget.classList.contains("opened")) {
                e.currentTarget.classList.add("opened");
            } else {
                e.currentTarget.classList.toggle("closed");
                e.currentTarget.classList.toggle("opened");
            }
        }, true);
    }
})();
