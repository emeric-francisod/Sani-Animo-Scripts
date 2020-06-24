(function () {
    function initializeWrapper(wrapperElt) {
        let menuId = wrapperElt.dataset.linkedMenu;
        if (menuId !== undefined) {
            let linkedMenuElt = document.getElementById(menuId).cloneNode(true);
            linkedMenuElt.classList.remove("hamburger-compatible");
            wrapperElt.appendChild(linkedMenuElt);
        }
    }

    function initializeHamburgerButton(buttonElt) {
        let svgElt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElt.setAttribute("viewBox", "0 0 64 64");
        svgElt.setAttribute("width", "48");
        svgElt.setAttribute("height", "48");
        svgElt.classList.add("hamburger-svg");

        let yRectCoord = 12;

        for (let i = 1 ; i <= 3 ; i++) {
            let rectangleElt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectangleElt.setAttribute("x", "8");
            rectangleElt.setAttribute("y", yRectCoord);
            rectangleElt.setAttribute("width", "48");
            rectangleElt.setAttribute("height", "10");
            rectangleElt.setAttribute("ry", "5px");
            rectangleElt.classList.add("hamburger-svg-layer" + i);
            svgElt.appendChild(rectangleElt);
            yRectCoord += 15;
        }
        buttonElt.appendChild(svgElt);
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
            removeTabNavigation(hamburgerMenuTabableElements);
        }
    }

    function hamburgerMenuOpen () {
        hamburgerMenuElt.classList.remove("closed");
        hamburgerMenuElt.classList.add("opened");
        hamburgerButtonElt.classList.remove("hamburger");
        hamburgerButtonElt.classList.add("close");
        document.body.classList.add("menu-opened");
        removeTabNavigation(tabableElements);
        giveTabNavigation(hamburgerMenuTabableElements);
    }

    let hamburgerButtonElt = document.getElementById("hamburger-menu-button");
    let hamburgerMenuElt = document.getElementById("hamburger-menu-wrapper");
    let blurElt = document.getElementById("blur");
    let contentElt = document.getElementById("content");

    initializeWrapper(hamburgerMenuElt);
    initializeHamburgerButton(hamburgerButtonElt);

    let tabableElements = getTabElements(contentElt);
    let hamburgerMenuTabableElements = getTabElements(hamburgerMenuElt);

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
