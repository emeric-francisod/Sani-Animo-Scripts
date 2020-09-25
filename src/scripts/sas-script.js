(function() {
    function mapInterval (value, start1, stop1, start2, stop2) {
        if (stop1 - start1 === 0) {
            return false;
        }
        return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    }





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





    function CarouselImage(linkNode) {
        this.domNode = null;
        this.imageNode = null;
        this.index = null;
        this.imageid = null;


        if (linkNode instanceof HTMLAnchorElement) {
            this.domNode = linkNode;
            this.imageNode = this.domNode.getElementsByTagName("img")[0];
            if (this.imageNode === undefined) {
                this.imageNode = document.createElement("img");
                this.domNode.appendChild(this.imageNode);
            }
        } else {
            this.domNode = document.createElement("a");
            this.imageNode = document.createElement("img");
            this.domNode.appendChild(this.imageNode);
        }

        this.domNode.classList.add("sas-carousel-image-link");
    }

    CarouselImage.prototype.setIndex = function (id) {
        this.index = id;
        this.domNode.dataset.sasCarouselIndex = this.index;
    }

    CarouselImage.prototype.getIndex = function () {
        return this.index;
    }

    CarouselImage.prototype.getImageIndex = function () {
        return this.imageid;
    }

    CarouselImage.prototype.incrementImageIndex = function() {
        this.imageid++;
    }

    CarouselImage.prototype.changeImage = function (imgObj, imgObjId) {
        this.imageNode.src = imgObj.url;
        this.imageNode.alt = imgObj.alt;
        if (imgObj.hasOwnProperty("redirection")) {
            this.domNode.href = imgObj.redirection;
        } else {
            this.domNode.href = "";
        }
        this.imageid = imgObjId;
    }

    CarouselImage.prototype.getDomNode = function () {
        return this.domNode;
    }

    CarouselImage.prototype.draw = function (minId, maxId, nbElements, containerWidth) {
        let elementLevel = 0;
        let absoluteIndex = 0;
        let focusAbsoluteIndex = 0
        let virtualCircleAngle = 0;
        let focusVirtualCircleAngle = 0;
        let focusCos = 1;
        let minDepth = -1000;
        let absoluteMaxTranslation = containerWidth * 0.6 / 2;
        let zIndexValue = 5;
        let zTranslation = 0;
        let xTranslation = 0;
        let opacityLevel = 1;

        if (nbElements > 1) {
            elementLevel = Math.abs(this.index);
            if (Math.abs(minId) === maxId && this.index > 0) {
                elementLevel--;
            }

            zIndexValue = Math.abs(minId) - elementLevel + zIndexValue;


            absoluteIndex = mapInterval(this.index, minId, maxId, 0, nbElements - 1);
            focusAbsoluteIndex = mapInterval(0, minId, maxId, 0, nbElements - 1);
            virtualCircleAngle = (Math.PI * 2 / (nbElements) * absoluteIndex + Math.PI) % (2 * Math.PI);
            focusVirtualCircleAngle = (Math.PI * 2 / (nbElements) * focusAbsoluteIndex + Math.PI) % (2 * Math.PI);
            focusCos = Math.cos(focusVirtualCircleAngle);

            minDepth = - Math.max(Math.ceil(nbElements * 100), minDepth);
            zTranslation = Math.round((mapInterval(Math.cos(virtualCircleAngle), -1, focusCos, minDepth, 0) + Number.EPSILON) * 100) / 100;
            xTranslation = Math.round((mapInterval(Math.sin(virtualCircleAngle), -1, 1, -absoluteMaxTranslation, absoluteMaxTranslation) + Number.EPSILON) * 100) / 100;

            if (elementLevel === 0 && Math.abs(minId) === maxId) {
                xTranslation = xTranslation / Math.abs(xTranslation) * Math.max(Math.abs(xTranslation), this.imageNode.clientWidth / 2 + 16);
            }

            opacityLevel = mapInterval(Math.cos(virtualCircleAngle), -1, focusCos, 0, 1);
        }

        this.domNode.style.zIndex = zIndexValue;
        this.domNode.style.opacity = opacityLevel;
        this.domNode.style.transform = "translate3d(calc(-50% + " + xTranslation + "px), -50%, " + zTranslation + "px)";
    }





    /*
    * Structure de l'objet contenant les urls: tableau d'objets:
    *  url
    *  texte alternatif
    *  lien vers lequel pointer
    */

    function Carousel(carouselElt, imgUrlList = null, breakpoints = [
        {
            min: 0,
            max: 990,
            imgNumber: 1
        },
        {
            min: 991,
            max: 1199,
            imgNumber: 3
        },
        {
            min: 1200,
            max: 1920,
            imgNumber: 5
        },
        {
            min: 1921,
            max: null,
            imgNumber: 7,
        }
    ]) {
        this.carouselWrapper = carouselElt;
        this.imageUrlArray = imgUrlList;
        this.displayedImages = [];
        this.animationid = null;
        this.rotating = false;
        this.visibleImageNumber = null;
        this.currentElementNumber = 0;
        this.breakpoints = breakpoints;

        this.setup();
        this.setAutoRotation();
        this.createNavigation();
    }

    Carousel.prototype.toString = function(extended = true) {
        console.log("Brekapoints images: " + newElementNumber);
        console.log("Nombre d'éléments à afficher: " + this.visibleImageNumber);
        console.log("Nombre d'éléments actuels: " + this.currentElementNumber);
        console.log("Nombre d'images disponibles: " + this.imageUrlArray.length);
        console.log("");
        console.log("Images affichées: ");
        if (extended) {
            for (let i = 0 ; i < this.displayedImages.length ; i++) {
                console.log("Image " + this.displayedImages[i].getIndex());
                console.log("Elément du DOM:");
                console.log(this.displayedImages[i].domNode);
                console.log("Elément image (n°" + this.displayedImages[i].getImageIndex() + "):");
                console.log(this.imageUrlArray[this.displayedImages[i].getImageIndex()]);
            }
        } else {
            for (let i = 0 ; i < this.displayedImages.length ; i++) {
                let str = "Image carousel n°" + this.displayedImages[i].getIndex() + " : ";
                str += "image d'id " + this.displayedImages[i].getImageIndex() + ".";
                console.log(str);
            }
        }
        console.log("");
        console.log("---------------------------------");
    }

    Carousel.prototype.rotate = function(forward = true) {
        this.rotating = true;

        if (this.currentElementNumber > 1) {
            if (forward) {
                let lastIndex = this.displayedImages.length - 1;
                this.displayedImages.push(this.displayedImages.shift());
                this.displayedImages.map(function (obj) {
                    obj.setIndex(obj.getIndex() - 1);
                });
                this.displayedImages[lastIndex].setIndex(this.displayedImages[lastIndex - 1].getIndex() + 1);
                let newImageIndex = this.displayedImages[lastIndex - 1].getImageIndex() + 1;
                if (newImageIndex >= this.imageUrlArray.length) {
                    newImageIndex = 0;
                }
                this.displayedImages[lastIndex].changeImage(this.imageUrlArray[newImageIndex], newImageIndex);
            } else {
                this.displayedImages.unshift(this.displayedImages.pop());
                this.displayedImages.map(function(obj) {
                    obj.setIndex(obj.getIndex() + 1);
                });
                this.displayedImages[0].setIndex(this.displayedImages[1].getIndex() - 1);
                let newImageIndex = this.displayedImages[1].getImageIndex() - 1;
                if (newImageIndex < 0) {
                    newImageIndex = this.imageUrlArray.length - 1;
                }
                this.displayedImages[0].changeImage(this.imageUrlArray[newImageIndex], newImageIndex);
            }
        }

        this.draw();

        setTimeout((function() {
            this.rotating = false;
        }).bind(this), 350);
    }

    Carousel.prototype.getBreakpointImageNumber = function() {
        let newElementNumber = this.visibleImageNumber;

        for (let i = 0 ; i < this.breakpoints.length ; i++) {
            if (window.innerWidth >= this.breakpoints[i].min && window.innerWidth <= this.breakpoints[i].max) {
                newElementNumber = this.breakpoints[i].imgNumber;
                break;
            }
        }

        return newElementNumber;
    }

    Carousel.prototype.resize = function() {
        let newElementNumber = this.getBreakpointImageNumber();

        while (newElementNumber !== this.visibleImageNumber) {
            if (newElementNumber > this.visibleImageNumber) {
                this.visibleImageNumber++;
                this.addImage();
            } else if (newElementNumber < this.visibleImageNumber ) {
                this.visibleImageNumber--;
                this.removeElement();
            }
        }

        this.draw();
    }

    Carousel.prototype.draw = function () {
        this.displayedImages.map(function (obj) {
            obj.draw(this.displayedImages[0].getIndex(), this.displayedImages[this.displayedImages.length - 1].getIndex(), this.currentElementNumber, this.carouselWrapper.clientWidth);
        }.bind(this));
    }

    Carousel.prototype.removeElement = function(arrayStart = true) {
        if (this.currentElementNumber > this.visibleImageNumber + 1) {
            let removedElement = null;

            if (this.currentElementNumber % 2 === 0) {
                removedElement = this.displayedImages.shift();
            } else {
                removedElement = this.displayedImages.pop();
            }
            this.carouselWrapper.removeChild(removedElement.getDomNode());

            this.currentElementNumber--;
            this.calculateIndexes();
        }
    }

    Carousel.prototype.addElement = function (pushElt = false) {
        let newCarouselElement = new CarouselImage();
        this.carouselWrapper.appendChild(newCarouselElement.getDomNode());

        if (this.currentElementNumber % 2 === 0 || pushElt) {
            this.displayedImages.push(newCarouselElement);
        } else {
            this.displayedImages.unshift(newCarouselElement);
        }

        this.currentElementNumber++;
        this.calculateIndexes();

        return newCarouselElement;
    }

    Carousel.prototype.addImage = function(imgObj = null) {
        let firstImageIndex = (this.currentElementNumber !== 0) ? this.displayedImages[0].getImageIndex() : 0;
        let lastImageIndex = (this.currentElementNumber !== 0) ? this.displayedImages[this.displayedImages.length - 1].getImageIndex() : 0;

        if (imgObj === null) {
            if (this.imageUrlArray.length > this.currentElementNumber) {
                let newIndex = 0;
                if (this.currentElementNumber % 2 === 0) {
                    newIndex = (lastImageIndex + 1 >= this.imageUrlArray.length) ? 0 : lastImageIndex + 1;
                } else {
                    newIndex = (firstImageIndex - 1 < 0) ? this.imageUrlArray.length - 1 : firstImageIndex - 1;
                }
                let newCarouselElement = this.addElement();
                newCarouselElement.changeImage(this.imageUrlArray[newIndex], newIndex);
            }
        } else if (this.testImageObject(imgObj)) {
            if (this.currentElementNumber < this.visibleImageNumber + 1) {
                let newIndex = 0;
                if (this.currentElementNumber === 0) {
                    this.imageUrlArray.push(imgObj);
                    newIndex = 0;
                } else if (this.currentElementNumber % 2 === 0) {
                    this.imageUrlArray.splice(lastImageIndex + 1, 0, imgObj);
                    newIndex = lastImageIndex + 1;
                } else {
                    this.imageUrlArray.splice(firstImageIndex, 0, imgObj);
                    for (let i = 0 ; i < this.displayedImages.length ; i++) {
                        if (this.displayedImages[i].getImageIndex() >= firstImageIndex) {
                            this.displayedImages[i].incrementImageIndex();
                        }
                    }
                    newIndex = firstImageIndex;
                }
                let newCarouselElement = this.addElement();
                newCarouselElement.changeImage(imgObj, newIndex);
            } else if (firstImageIndex > lastImageIndex) {
                this.imageUrlArray.splice(lastImageIndex + 1, 0, imgObj);
            } else {
                this.imageUrlArray.push(imgObj);
            }

            this.draw();

        } else {
            console.error("L'objet image à ajouter ne possède pas la bonne structure.");
            return false;
        }
    }

    Carousel.prototype.testImageObject = function (imgObj) {
        if (
            imgObj !== undefined
            && imgObj.hasOwnProperty("url") && imgObj.url != "" && imgObj.url != null
            && imgObj.hasOwnProperty("alt")
        ) {
            return true;
        } else {
            return false;
        }
    }

    Carousel.prototype.testImageUrlObject = function() {
        for (let i = 0 ; i < this.imageUrlArray.length ; i++) {
            if (!this.testImageObject(this.imageUrlArray[i])) {
                this.imageUrlArray.splice(i, 1);
                i--;
            }
        }
        if (this.imageUrlArray.length === 0) {
            console.error("L'array des objets image ne contient aucun objet valide.")
            return false;
        } else {
            return true;
        }
    }

    Carousel.prototype.setup = function() {
        this.visibleImageNumber = this.getBreakpointImageNumber();

        let imgUrlArrayId = (this.testImageUrlObject()) ? 0 : null;

        if (imgUrlArrayId !== null) {
            let EltNumberDisplay = (this.imageUrlArray.length <= this.visibleImageNumber) ? this.imageUrlArray.length : this.visibleImageNumber + 1;

            for (let i = 0 ; i < EltNumberDisplay ; i++) {
                let newImageElement = this.addElement(true);
                newImageElement.changeImage(this.imageUrlArray[imgUrlArrayId], imgUrlArrayId);
                imgUrlArrayId++;
                if (imgUrlArrayId >= this.imageUrlArray.length) {
                    imgUrlArrayId = 0;
                }
            }
        }
        this.draw();
    }

    Carousel.prototype.calculateIndexes = function() {
        for (let i = 0 ; i < this.displayedImages.length ; i++) {
            this.displayedImages[i].setIndex(i - (Math.floor(this.currentElementNumber / 2)));
        }
    }

    Carousel.prototype.setAutoRotation = function() {
        this.animationId = setInterval(this.rotate.bind(this), 4000);
    }

    Carousel.prototype.createNavigation = function() {
        let createCarouselLink = function (role = "prev") {
            let linkElt = document.createElement("a");
            let forward = (role === "next");
            linkElt.href = "";
            linkElt.title = (role === "next") ? "Image suivante" : "Image précédente";
            linkElt.classList.add("sas-carousel-" + role + "-button");

            linkElt.addEventListener("click", (function(e) {
                e.preventDefault();
                if (!this.rotating) {
                    clearInterval(this.animationId);
                    this.rotate(forward);
                    this.setAutoRotation();
                }
            }).bind(this));

            return linkElt;
        };

        this.carouselWrapper.appendChild(createCarouselLink.bind(this, "next")());
        this.carouselWrapper.appendChild(createCarouselLink.bind(this)());
    }




    let carouselElts = document.getElementsByClassName("sas-carousel-wrapper");
    let carouselObjs = [];

    for (let i = 0 ; i < carouselElts.length ; i++) {
        carouselObjs.push(carouselElts[i]);
    }

    window.addEventListener("resize", function(e) {
        for (let i = 0 ; i < carouselObjs.length ; i++) {
            carouselObjs[i].resize();
            carouselObj
        }
    });

})();
