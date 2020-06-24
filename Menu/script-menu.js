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



    let hamburgerButtonElt = document.getElementById("hamburger-menu-button");
    let hamburgerMenuElt = document.getElementById("hamburger-menu-wrapper");

    initializeWrapper(hamburgerMenuElt);
    initializeHamburgerButton(hamburgerButtonElt);

    hamburgerButtonElt.classList.add("modal-trigger");
    hamburgerMenuElt.classList.add("modal-target");
    hamburgerButtonElt.dataset.modalTarget = hamburgerMenuElt.id;

})();
