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

    console.log("------------------------------------------------");
    console.log("Brekapoints images: " + newElementNumber);
    console.log("Nombre d'images à afficher: " + this.visibleImageNumber);
    console.log("Nombre d'éléments acutelles: " + this.currentElementNumber);
    console.log("Nombre d'images possibles: " + this.imageUrlArray.length);

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

Carousel.prototype.addElement = function () {
    let newCarouselElement = new CarouselImage();
    this.carouselWrapper.appendChild(newCarouselElement.getDomNode());

    if (this.currentElementNumber % 2 === 0) {
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

    this.currentElementNumber = (this.imageUrlArray.length <= this.visibleImageNumber) ? this.imageUrlArray.length : this.visibleImageNumber + 1;

    for (let i = 0 ; i < this.currentElementNumber ; i++) {
        let newImageElement = new CarouselImage();
        this.carouselWrapper.appendChild(newImageElement.getDomNode());
        if (imgUrlArrayId !== null) {
            newImageElement.changeImage(this.imageUrlArray[imgUrlArrayId], imgUrlArrayId);
            imgUrlArrayId++;
            if (imgUrlArrayId >= this.imageUrlArray.length) {
                imgUrlArrayId = 0;
            }
        }
        this.displayedImages.push(newImageElement);
    }
    this.calculateIndexes();
    this.draw();
}

Carousel.prototype.calculateIndexes = function() {
    for (let i = 0 ; i < this.displayedImages.length ; i++) {
        this.displayedImages[i].setIndex(i - (Math.floor(this.currentElementNumber / 2)));
    }
}

Carousel.prototype.setAutoRotation = function() {
    //this.animationId = setInterval(this.rotate.bind(this), 4000);
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
