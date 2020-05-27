(function () {
    function resetPage() {
        hamburgerMenuClose();
        hamburgerMenuElt.classList.remove("closed");
        hamburgerButtonElt.classList.remove("hamburger");
    }

    function hamburgerMenuToggle () {
        if (hamburgerMenuElt.classList.contains("opened")) {
            hamburgerMenuClose();
        } else {
            hamburgerMenuOpen();
        }
    }

    function hamburgerMenuClose () {
        if (hamburgerMenuElt.classList.contains("opened")) {
            hamburgerMenuElt.classList.add("closed");
            hamburgerMenuElt.classList.remove("opened");
            hamburgerButtonElt.classList.add("hamburger");
            hamburgerButtonElt.classList.remove("close");
            document.body.classList.remove("menu-opened");
            giveTabulation(tabableElements);
        }
    }

    function hamburgerMenuOpen () {
        hamburgerMenuElt.classList.remove("closed");
        hamburgerMenuElt.classList.add("opened");
        hamburgerButtonElt.classList.remove("hamburger");
        hamburgerButtonElt.classList.add("close");
        document.body.classList.add("menu-opened");
        removeTabulation(tabableElements);
    }

    let hamburgerButtonElt = document.getElementById("hamburger-menu-button");
    let hamburgerMenuElt = document.getElementById("hamburger-menu-wrapper");
    let blurElt = document.getElementById("blur");
    let contentElt = document.getElementById("content");

    let tabableElements = getTabElements(contentElt);

    hamburgerButtonElt.addEventListener("click", function(e) {
        hamburgerMenuToggle();
    });

    window.addEventListener("keyup", function(e) {
        if (e.key === "Escape") {
            hamburgerMenuClose();
        }
    });

    window.addEventListener("resize", function(e) {
        resetPage();
    });

    blurElt.addEventListener("click", function(e) {
        hamburgerMenuClose();
    })

})();
