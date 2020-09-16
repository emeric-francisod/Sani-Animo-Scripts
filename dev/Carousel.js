/*
 * Structure de l'objet contenant les urls: tableau d'objets:
 *  url
 *  texte alternatif
 *  lien vers lequel pointer
 */

function Carousel(carouselElt, imgUrlList = null) {
    this.carouselWrapper = carouselElt;
    this.imageUrlArray = imgUrlList;
    this.displayedImages = [];
    this.animationid = null;
    this.rotating = false;
    this.visibleImageNumber = 8;
    this.currentElementNumber = 0;

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

Carousel.prototype.resize = function() {
    this.draw();
}

Carousel.prototype.draw = function () {
    this.displayedImages.map(function (obj) {
        obj.draw(this.displayedImages[0].getIndex(), this.displayedImages[this.displayedImages.length - 1].getIndex(), this.currentElementNumber, this.carouselWrapper.clientWidth);
    }.bind(this));
}

Carousel.prototype.addElement = function (arrayStart = false) {
    let newCarouselElement = new CarouselImage();
    this.carouselWrapper.appendChild(newCarouselElement.getDomNode());

    if (arrayStart) {
        this.displayedImages.unshift(newCarouselElement);
    } else {
        this.displayedImages.push(newCarouselElement);
    }

    this.currentElementNumber++;
    this.calculateIndexes();

    return newCarouselElement;
}

Carousel.prototype.addImage = function(imgObj) {
    if (this.testImageObject(imgObj)) {
        let firstImageIndex = (this.currentElementNumber !== 0) ? this.displayedImages[0].getImageIndex() : 0;
        let lastImageIndex = (this.currentElementNumber !== 0) ? this.displayedImages[this.displayedImages.length - 1].getImageIndex() : 0;

        if (this.currentElementNumber < this.visibleImageNumber + 1) {
            let newCarouselElement = null;
            let newIndex = 0;
            if (this.currentElementNumber === 0) {
                this.imageUrlArray.push(imgObj);
                newCarouselElement = this.addElement();
                newIndex = 0;
            } else if (this.currentElementNumber % 2 === 0) {
                this.imageUrlArray.splice(lastImageIndex + 1, 0, imgObj);
                newCarouselElement = this.addElement();
                newIndex = lastImageIndex + 1;
            } else {
                this.imageUrlArray.splice(firstImageIndex, 0, imgObj);
                for (let i = 0 ; i < this.displayedImages.length ; i++) {
                    if (this.displayedImages[i].getImageIndex() >= firstImageIndex) {
                        this.displayedImages[i].incrementImageIndex();
                    }
                }
                newCarouselElement = this.addElement(true);
                newIndex = firstImageIndex;
            }
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
    let imgUrlArrayId = (this.testImageUrlObject()) ? 0 : null;

    this.currentElementNumber = (this.imageUrlArray.length < this.visibleImageNumber) ? this.imageUrlArray.length : this.visibleImageNumber + 1;

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
