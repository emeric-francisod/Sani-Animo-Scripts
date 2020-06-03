(function () {
    function initializeWrapper(wrapperElt) {
        let menuId = wrapperElt.dataset.linkedMenu;
        if (menuId !== undefined) {
            let linkedMenuElt = document.getElementById(menuId).cloneNode(true);
            linkedMenuElt.classList.remove("hamburger-compatible");
            wrapperElt.appendChild(linkedMenuElt);
        }
    }

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
            giveTabNavigation(tabableElements);
        }
    }

    function hamburgerMenuOpen () {
        hamburgerMenuElt.classList.remove("closed");
        hamburgerMenuElt.classList.add("opened");
        hamburgerButtonElt.classList.remove("hamburger");
        hamburgerButtonElt.classList.add("close");
        document.body.classList.add("menu-opened");
        removeTabNavigation(tabableElements);
    }

    let hamburgerButtonElt = document.getElementById("hamburger-menu-button");
    let hamburgerMenuElt = document.getElementById("hamburger-menu-wrapper");
    let blurElt = document.getElementById("blur");
    let contentElt = document.getElementById("content");

    initializeWrapper(hamburgerMenuElt);

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
