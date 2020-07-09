(function() {
    const FOCUS_ELT = ["a", "area", "audio", "button", "embed", "form", "iframe", "img", "input", "keygen", "label", "object", "select", "svg", "textarea", "video"];
    const FOCUS_ATTR = ["contenteditable", "focusable", "tabindex"];

    function getTabElements(parentElt) {
        let query = "";
        let tabableElements = [];

        for (let i = 0 ; i < FOCUS_ELT.length ; i++) {
            query += FOCUS_ELT[i] + ", ";
        }
        for (let i = 0 ; i < FOCUS_ATTR.length ; i++) {
            query += "[" + FOCUS_ATTR[i] + "]";
            if (i < FOCUS_ATTR.length - 1) {
                query += ", ";
            }
        }

        let tabElts = parentElt.querySelectorAll(query);
        for (let i = 0 ; i < tabElts.length ; i++) {
            let elementTabIndex = tabElts[i].getAttribute("tabindex");
            if (elementTabIndex !== "-1") {
                tabableElements.push([tabElts[i], elementTabIndex]);
            }
        }

        return tabableElements;
    }

    function giveTabNavigation(eltsArray) {
        for (let i = 0 ; i < eltsArray.length ; i++) {
            if (eltsArray[i][1] === null) {
                eltsArray[i][0].removeAttribute("tabindex");
            } else {
                eltsArray[i][0].setAttribute("tabindex", eltsArray[i][1]);
            }
        }
    }

    function removeTabNavigation(eltsArray) {
        for (let i = 0 ; i < eltsArray.length ; i++) {
            eltsArray[i][0].setAttribute("tabindex", "-1");
        }
    }





    function ajaxGet(url, callback) {
        let request = new XMLHttpRequest();
        request.open("GET", url);

        request.addEventListener("load", function() {
            if (request.status >= 200 && request.status < 400) {
                callback(request.responseText);
            } else {
                console.error(request.status + " " + request.statusText + " " + url);
            }
        });

        request.addEventListener("error", function() {
            console.error("Erreur de réseau avec l'URL " + url);
        });

        request.send(null);
    }



    function ajaxPost(url, data, callback, isJson) {
        let request = new XMLHttpRequest();
        request.open("POST", url);

        request.addEventListener("load", function() {
            if (request.status >= 200 && request.status < 400) {
                callback(request.responseText);
            } else {
                console.error(request.status + " " + request.statusText + " " + url);
            }
        });

        request.addEventListener("error", function() {
            console.error("Erreur réseau avec l'URL " + url);
        });

        if (isJson) {
            request.setRequestHeader("Content-Type", "application/json");
            data = JSON.stringify(data);
        }
        request.send(data);
    }





    function initializeWrapper(wrapperElt) {
        let menuId = wrapperElt.dataset.sasLinkedMenu;
        if (menuId !== undefined) {
            let linkedMenuElt = document.getElementById(menuId).cloneNode(true);
            linkedMenuElt.classList.remove("sas-hamburger-compatible");
            wrapperElt.appendChild(linkedMenuElt);
        }
    }

    function initializeHamburgerButton(buttonElt) {
        let svgElt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElt.setAttribute("viewBox", "0 0 64 64");
        svgElt.setAttribute("width", "48");
        svgElt.setAttribute("height", "48");
        svgElt.classList.add("sas-hamburger-svg");

        let yRectCoord = 12;

        for (let i = 1 ; i <= 3 ; i++) {
            let rectangleElt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectangleElt.setAttribute("x", "8");
            rectangleElt.setAttribute("y", yRectCoord);
            rectangleElt.setAttribute("width", "48");
            rectangleElt.setAttribute("height", "10");
            rectangleElt.setAttribute("ry", "5px");
            rectangleElt.classList.add("sas-hamburger-svg-layer" + i);
            svgElt.appendChild(rectangleElt);
            yRectCoord += 15;
        }
        buttonElt.appendChild(svgElt);
    }



    let hamburgerButtonElt = document.getElementById("sas-hamburger-menu-button");
    let hamburgerMenuElt = document.getElementById("sas-hamburger-menu-wrapper");

    initializeWrapper(hamburgerMenuElt);
    initializeHamburgerButton(hamburgerButtonElt);

    hamburgerButtonElt.classList.add("sas-modal-trigger");
    hamburgerMenuElt.classList.add("sas-modal-target");
    hamburgerButtonElt.dataset.sasModalTarget = hamburgerMenuElt.id;






    function Modal(targetElt, triggerElt, backgroundElt, contentTabElts) {
        this.targetElt = targetElt;
        this.triggerElt = triggerElt;
        this.backgroundElt = backgroundElt;
        this.contentTabElts = contentTabElts;
        this.modalTabElts = getTabElements(this.targetElt);
        this.opened = false;
    }

    Modal.prototype.open = function() {
        if (!this.opened) {
            this.targetElt.classList.add("sas-opened");
            this.targetElt.classList.remove("sas-closed");
            this.triggerElt.classList.add("sas-target-opened");
            this.triggerElt.classList.remove("sas-target-closed");
            document.body.classList.add("sas-modal-opened");
            removeTabNavigation(this.contentTabElts);
            giveTabNavigation(this.modalTabElts);
            this.opened = true;
        }
    }

    Modal.prototype.close = function() {
        if (this.opened) {
            this.targetElt.classList.remove("sas-opened");
            this.targetElt.classList.add("sas-closed");
            this.triggerElt.classList.remove("sas-target-opened");
            this.triggerElt.classList.add("sas-target-closed");
            document.body.classList.remove("sas-modal-opened");
            giveTabNavigation(this.contentTabElts);
            removeTabNavigation(this.modalTabElts);
            this.opened = false;
        }
    }

    Modal.prototype.toggle = function() {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    Modal.prototype.reset = function() {
        this.close();
        this.targetElt.classList.remove("sas-closed");
        this.triggerElt.classList.remove("sas-target-closed");
    }





    function Modals() {
        this.modals = [];
    }

    Modals.prototype.push = function(modal, id) {
        this.modals[id] = modal;
    }

    Modals.prototype.reset = function() {
        for (id in this.modals) {
            this.modals[id].reset();
        }
    }

    Modals.prototype.close = function() {
        for (id in this.modals) {
            this.modals[id].close();
        }
    }

    Modals.prototype.open = function(id) {
        this.close();
        this.modals[id].open();
    }

    Modals.prototype.toggle = function(id) {
        if (this.modals[id].opened) {
            this.close();
        } else {
            this.close();
            this.modals[id].open();
        }
    }





    let modalObjects = new Modals();
    let backgroundElt = document.createElement("div");
    let modalTriggerElts = document.getElementsByClassName("sas-modal-trigger");
    let modalCloseButtonElt = document.getElementsByClassName("sas-modal-close-button");
    let contentTabElts = getTabElements(document.getElementById("sas-content"));

    backgroundElt.id = "sas-background";
    document.body.appendChild(backgroundElt);

    for (let i = 0 ; i < modalTriggerElts.length ; i++) {
        let targetElt = document.getElementById(modalTriggerElts[i].dataset.sasModalTarget);
        let newModal = new Modal(targetElt, modalTriggerElts[i], backgroundElt, contentTabElts);
        let triggerId = modalTriggerElts[i].id;
        modalObjects.push(newModal, triggerId);
        modalTriggerElts[i].addEventListener("click", (function(id, e) {
            this.toggle(triggerId);
        }).bind(modalObjects, triggerId));
    }

    window.addEventListener("keyup", function(e) {
        if (e.key === "Escape") {
            modalObjects.close();
        }
    });

    window.addEventListener("resize", function(e) {
        modalObjects.reset();
    });

    backgroundElt.addEventListener("click", function() {
        modalObjects.close();
    });

    for (let i = 0 ; i < modalCloseButtonElt.length ; i++) {
        modalCloseButtonElt[i].addEventListener("click", function(e) {
            modalObjects.close();
        });
    }
})();
